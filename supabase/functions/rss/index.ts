import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/rss+xml; charset=UTF-8',
  'Cache-Control': 'public, max-age=3600',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const baseUrl = Deno.env.get('VITE_SUPABASE_URL')?.includes('localhost') 
      ? 'http://localhost:5173' 
      : 'https://drluanmaciel.com.br';

    // Fetch last 50 published posts
    const { data: posts, error } = await supabase
      .from('posts')
      .select('title, slug, excerpt, content, author, created_at, published_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    // Helper to strip HTML and truncate
    const stripHtml = (html: string) => {
      return html.replace(/<[^>]*>/g, '').trim();
    };

    const truncate = (text: string, maxLength: number = 200) => {
      const stripped = stripHtml(text);
      return stripped.length > maxLength 
        ? stripped.substring(0, maxLength) + '...' 
        : stripped;
    };

    const escapeXml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    // Build RSS XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
    xml += '  <channel>\n';
    xml += `    <title>Dr. Luan Maciel - Odontologia Avançada</title>\n`;
    xml += `    <link>${baseUrl}/blog</link>\n`;
    xml += `    <description>Blog do Dr. Luan Maciel (CROSP 158810), especialista em Estética Dental e Endodontia. Conteúdos sobre lentes de contato dental, facetas, clareamento, tratamento de canal e tecnologias odontológicas de ponta.</description>\n`;
    xml += `    <language>pt-BR</language>\n`;
    xml += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
    xml += `    <atom:link href="${baseUrl}/functions/v1/rss" rel="self" type="application/rss+xml" />\n`;
    xml += `    <webMaster>contato@drluanmaciel.com.br (Dr. Luan Maciel)</webMaster>\n`;
    xml += `    <managingEditor>contato@drluanmaciel.com.br (Dr. Luan Maciel)</managingEditor>\n`;
    xml += `    <copyright>Copyright ${new Date().getFullYear()} Dr. Luan Maciel - Todos os direitos reservados</copyright>\n`;
    xml += `    <category>Odontologia</category>\n`;
    xml += `    <category>Estética Dental</category>\n`;
    xml += `    <category>Endodontia</category>\n`;

    posts?.forEach(post => {
      const pubDate = new Date(post.published_at || post.created_at).toUTCString();
      const link = `${baseUrl}/blog/${post.slug}`;
      const description = post.excerpt ? truncate(post.excerpt, 300) : truncate(post.content, 300);
      
      xml += '    <item>\n';
      xml += `      <title><![CDATA[${escapeXml(post.title)}]]></title>\n`;
      xml += `      <link>${link}</link>\n`;
      xml += `      <description><![CDATA[${escapeXml(description)}]]></description>\n`;
      xml += `      <author>${escapeXml(post.author || 'Dr. Luan Maciel')}</author>\n`;
      xml += `      <pubDate>${pubDate}</pubDate>\n`;
      xml += `      <guid isPermaLink="true">${link}</guid>\n`;
      xml += '    </item>\n';
    });

    xml += '  </channel>\n';
    xml += '</rss>';

    return new Response(xml, { headers: corsHeaders });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
