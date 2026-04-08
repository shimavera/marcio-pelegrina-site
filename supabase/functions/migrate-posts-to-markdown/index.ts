import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function convertHTMLToMarkdown(html: string): string {
  let markdown = html;
  
  // Remove data attributes
  markdown = markdown.replace(/\s*data-[a-z-]+="[^"]*"/gi, '');
  
  // Convert itemscope/itemtype attributes
  markdown = markdown.replace(/\s*itemscope\s*itemtype="[^"]*"/gi, '');
  
  // Convert headings
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n');
  
  // Convert strong/bold
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  
  // Convert emphasis/italic
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  
  // Convert links
  markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Convert lists
  markdown = markdown.replace(/<ul[^>]*>/gi, '\n');
  markdown = markdown.replace(/<\/ul>/gi, '\n');
  markdown = markdown.replace(/<ol[^>]*>/gi, '\n');
  markdown = markdown.replace(/<\/ol>/gi, '\n');
  markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
  
  // Convert line breaks
  markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
  
  // Convert paragraphs
  markdown = markdown.replace(/<p[^>]*>/gi, '\n');
  markdown = markdown.replace(/<\/p>/gi, '\n');
  
  // Remove remaining HTML tags (including span)
  markdown = markdown.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Clean up excessive newlines
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  
  // Trim whitespace
  markdown = markdown.trim();
  
  // Add contact section if not present
  const contactSection = `---

## Agende Sua Consulta com o Dr. Yuri Julio

Está pronto para transformar seu sorriso? Entre em contato conosco:

**Endereço:** Av. Nove de Julho, 5124 - Jardim Paulista, São Paulo - SP, CEP: 01406-200

**Telefone:** (11) 99433-7415

**WhatsApp:** (11) 91185-2982

**Horário de Atendimento:** Segunda a Sexta, das 9h às 18h

Nossos profissionais estão prontos para avaliar seu caso e apresentar o melhor plano de tratamento para você!`;

  // Remove placeholder contact info
  markdown = markdown.replace(/\*\*Onde nos encontrar:\*\*.*?\[Website da Clínica\]/gs, '');
  markdown = markdown.replace(/\[Endereço da Clínica\]/gi, '');
  markdown = markdown.replace(/\[Número de Telefone\]/gi, '');
  markdown = markdown.replace(/\[Número do WhatsApp\]/gi, '');
  markdown = markdown.replace(/\[Website da Clínica\]/gi, '');
  
  // Add contact section if not already present
  if (!markdown.includes('Agende Sua Consulta com o Dr. Yuri Julio')) {
    markdown += '\n\n' + contactSection;
  }
  
  return markdown;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all posts
    const { data: posts, error: fetchError } = await supabase
      .from('posts')
      .select('id, title, content')
      .order('created_at', { ascending: false });

    if (fetchError) {
      throw fetchError;
    }

    if (!posts || posts.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Nenhum post encontrado para migrar' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results = [];
    let successCount = 0;
    let errorCount = 0;

    // Convert each post
    for (const post of posts) {
      try {
        // Check if content looks like HTML
        const isHTML = post.content.includes('<p') || post.content.includes('<br') || post.content.includes('<span');
        
        if (!isHTML) {
          results.push({
            id: post.id,
            title: post.title,
            status: 'skipped',
            message: 'Já está em Markdown'
          });
          continue;
        }

        const markdownContent = convertHTMLToMarkdown(post.content);

        // Update the post
        const { error: updateError } = await supabase
          .from('posts')
          .update({ content: markdownContent })
          .eq('id', post.id);

        if (updateError) {
          throw updateError;
        }

        results.push({
          id: post.id,
          title: post.title,
          status: 'success',
          message: 'Convertido com sucesso'
        });
        successCount++;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        results.push({
          id: post.id,
          title: post.title,
          status: 'error',
          message: errorMessage
        });
        errorCount++;
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Migração concluída',
        total: posts.length,
        success: successCount,
        errors: errorCount,
        skipped: posts.length - successCount - errorCount,
        results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Migration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
