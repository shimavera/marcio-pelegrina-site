import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContentGap {
  question: string;
  reason: string;
  suggestedTitle: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Fetching published posts for gap analysis...');

    // Fetch all published posts
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('title, excerpt, tags, content')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (postsError) throw postsError;

    console.log(`Analyzing ${posts?.length || 0} posts...`);

    // Prepare content summary for AI analysis
    const contentSummary = posts?.map(p => ({
      title: p.title,
      excerpt: p.excerpt,
      tags: p.tags || [],
    })) || [];

    // Call Lovable AI to analyze gaps
const systemPrompt = `Você é um especialista em marketing de conteúdo odontológico e análise de gaps de conteúdo.

Analise o conteúdo existente do blog do **Dr. Márcio Pelegrina** (CRO [CROSP]), cirurgião-dentista especializado em Estética Dental e Endodontia, e identifique perguntas frequentes que os pacientes fazem mas que NÃO estão cobertas adequadamente.

## Sobre o Dr. Márcio Pelegrina
- Cirurgião-Dentista especializado em Estética Dental e Endodontia
- CRO: [CROSP]
- Mais de 2.000 pacientes atendidos
- Localização: [BAIRRO], São Paulo - SP
- WhatsApp: [TELEFONE]

## Especialidades e Tratamentos PRINCIPAIS:
1. **Lentes de Contato Dental em Porcelana** - Laminados ultrafinos para transformação do sorriso
2. **Lentes de Contato Dental em Resina** - Alternativa mais acessível com excelentes resultados
3. **Facetas Dentais** - Restaurações estéticas para correção de forma e cor
4. **Tratamento de Canal (Endodontia)** - Tratamento especializado com microscopia
5. **Clareamento Dental** - Clareamento profissional a laser e caseiro
6. **Restaurações Estéticas** - Restaurações em resina composta de alta qualidade
7. **Reabilitação Estética Completa** - Planejamento digital do sorriso
8. **Harmonização do Sorriso** - Correção de assimetrias e proporções dentais

FOQUE EXCLUSIVAMENTE nestes tratamentos do Dr. Márcio Pelegrina. Identifique gaps de conteúdo relacionados a:
- Dúvidas sobre lentes de porcelana vs resina (diferenças, durabilidade, preço)
- Processo de colocação de lentes de contato dental
- Tratamento de canal: dói? quanto tempo leva?
- Clareamento dental: tipos, duração dos resultados
- Cuidados pós-procedimento para cada tratamento
- Mitos e verdades sobre estética dental
- Indicações e contra-indicações de cada tratamento
- Quanto custa cada procedimento (faixas de preço)
- Tempo de duração e manutenção
- Comparações entre técnicas (ex: lente vs faceta)
- Antes e depois: expectativas realistas
- Como escolher o melhor tratamento para cada caso

Para cada gap identificado, forneça:
1. A pergunta específica não respondida
2. Por que isso é importante para os pacientes
3. Sugestão de título para o post (mencionando Dr. Márcio Pelegrina quando apropriado)
4. Prioridade (high/medium/low)
5. Categoria sugerida (use o nome do tratamento quando aplicável)

Retorne APENAS um array JSON válido com objetos no formato:
{
  "question": "string",
  "reason": "string", 
  "suggestedTitle": "string",
  "priority": "high" | "medium" | "low",
  "category": "string"
}

IMPORTANTE: Identifique EXATAMENTE os 3 gaps de conteúdo MAIS RELEVANTES e prioritários focados nos tratamentos de Estética Dental e Endodontia do Dr. Márcio Pelegrina.`;

    const userPrompt = `Conteúdo atual do blog:

${JSON.stringify(contentSummary, null, 2)}

Identifique os 3 gaps de conteúdo MAIS IMPORTANTES e perguntas não respondidas que seriam valiosas para pacientes odontológicos.`;

    console.log('Calling Lovable AI for gap analysis...');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Lovable AI error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your Lovable AI workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI request failed: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content;

    if (!aiContent) {
      throw new Error('No content returned from AI');
    }

    console.log('AI Response received, parsing...');

    // Parse AI response - it should be a JSON array
    let gaps: ContentGap[];
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = aiContent.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/) || 
                        aiContent.match(/(\[[\s\S]*?\])/);
      
      if (jsonMatch) {
        gaps = JSON.parse(jsonMatch[1]);
      } else {
        gaps = JSON.parse(aiContent);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiContent);
      throw new Error('Failed to parse AI response as JSON');
    }

    console.log(`Successfully identified ${gaps.length} content gaps`);

    return new Response(
      JSON.stringify({ 
        gaps,
        totalPosts: posts?.length || 0,
        analyzedAt: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in analyze-content-gaps:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
