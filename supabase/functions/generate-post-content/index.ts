import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, category, question, reason } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Generating complete post content for:', title);

    const systemPrompt = `Você é um especialista em criação de conteúdo odontológico para o **Dr. Márcio Pelegrina**, cirurgião-dentista especializado em Estética Dental e Endodontia.

## Sobre o Dr. Márcio Pelegrina
- **Doutor**: Dr. Márcio Pelegrina - Cirurgião-Dentista especializado em Estética Dental e Endodontia
- **CROSP**: [CROSP]
- **Experiência**: Mais de 2.000 pacientes atendidos com atendimento personalizado
- **Localização**: [BAIRRO], São Paulo - SP
- **Endereço**: [ENDEREÇO] - [BAIRRO], São Paulo - SP, CEP: [CEP]
- **WhatsApp**: [TELEFONE]
- **Horário**: Segunda a Sexta, das 9h às 18h

## Especialidades do Dr. Márcio Pelegrina
1. **Lentes de Contato Dental em Porcelana** - Laminados ultrafinos para transformação do sorriso
2. **Lentes de Contato Dental em Resina** - Alternativa mais acessível com excelentes resultados
3. **Facetas Dentais** - Restaurações estéticas para correção de forma e cor
4. **Tratamento de Canal (Endodontia)** - Tratamento especializado com microscopia
5. **Clareamento Dental** - Clareamento profissional a laser e caseiro
6. **Restaurações Estéticas** - Restaurações em resina composta de alta qualidade
7. **Reabilitação Estética Completa** - Planejamento digital do sorriso
8. **Harmonização do Sorriso** - Correção de assimetrias e proporções dentais

Crie um artigo completo e detalhado para blog odontológico que seja:
- Informativo e educativo para pacientes
- Otimizado para SEO com palavras-chave naturais
- Rico em informações práticas e relevantes
- Estruturado com subtítulos (use ##, ###)
- Com linguagem acessível mas profissional
- Focado em resolver dúvidas reais dos pacientes
- Mencione o Dr. Márcio Pelegrina naturalmente no conteúdo

O artigo deve incluir:
1. Introdução engajante (2-3 parágrafos)
2. Seções bem estruturadas com subtítulos
3. Informações sobre o procedimento/tratamento
4. Benefícios e indicações
5. Por que escolher o Dr. Márcio Pelegrina (expertise, tecnologia, atendimento personalizado)
6. Cuidados e precauções
7. Conclusão com call-to-action

CRÍTICO - FORMATO DO CONTEÚDO:
- Use APENAS Markdown puro (##, ###, -, *, etc)
- NUNCA use tags HTML como <p>, <span>, <br>, <strong>, etc
- Use ** para negrito, * para itálico
- Use - ou * para listas
- Use ## para títulos principais, ### para subtítulos
- Para quebras de linha, use apenas Enter (não use <br>)

CRÍTICO - INFORMAÇÕES DE CONTATO:
Ao final do artigo, SEMPRE inclua esta seção exata com as informações reais:

---

## Agende Sua Consulta com o Dr. Márcio Pelegrina

Está pronto para transformar seu sorriso com um dos especialistas em estética dental mais experientes de São Paulo? Entre em contato conosco:

**Endereço:** [ENDEREÇO] - [BAIRRO], São Paulo - SP, CEP: [CEP]

**WhatsApp:** [TELEFONE]

**Horário de Atendimento:** Segunda a Sexta, das 9h às 18h

O Dr. Márcio Pelegrina e sua equipe estão prontos para avaliar seu caso e criar um plano de tratamento personalizado para o seu sorriso perfeito!

IMPORTANTE: 
- O conteúdo deve ter entre 600-800 palavras (não muito longo)
- Tags devem ser palavras-chave relevantes do tratamento
- Meta title e description devem incluir palavras-chave principais e "Dr. Márcio Pelegrina" quando apropriado
- Gere FAQs realistas e relevantes sobre estética dental e endodontia
- Gere avaliações autênticas de pacientes com nomes brasileiros
- NUNCA use placeholders como [Endereço], [Telefone], [Nome]
- SEMPRE use as informações reais fornecidas acima
- Mencione "Dr. Márcio Pelegrina" naturalmente ao longo do conteúdo`;


    const userPrompt = `Crie um artigo completo sobre:

Título: ${title}
Categoria: ${category}
Pergunta do paciente: ${question}
Por que é importante: ${reason}

Gere um artigo completo, detalhado e otimizado para esse tema.`;

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
        tools: [{
          type: 'function',
          function: {
            name: 'create_blog_post',
            description: 'Create a complete blog post with all metadata, FAQs and patient reviews',
            parameters: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                  description: 'Complete article content in markdown format with ## for titles'
                },
                excerpt: {
                  type: 'string',
                  description: 'Summary of 150-160 characters'
                },
                meta_title: {
                  type: 'string',
                  description: 'SEO title up to 60 characters'
                },
                meta_description: {
                  type: 'string',
                  description: 'SEO description of 150-160 characters'
                },
                category: {
                  type: 'string',
                  description: 'MUST be one of these EXACT categories: "Estética Dental", "Lentes de Contato Dental", "Endodontia", "Clareamento Dental", "Restaurações", "Dicas e Cuidados"'
                },
                tags: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Array of 5 relevant keywords'
                },
                read_time: {
                  type: 'string',
                  description: 'Estimated reading time (e.g., "5 min de leitura")'
                },
                faqs: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      question: { type: 'string' },
                      answer: { type: 'string' }
                    }
                  },
                  description: 'Array of 5 frequently asked questions with answers'
                },
                reviews: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      author: { type: 'string', description: 'Brazilian patient name' },
                      rating: { type: 'number', description: 'Rating from 4.5 to 5.0' },
                      date: { type: 'string', description: 'Date in YYYY-MM-DD format within last 6 months' },
                      text: { type: 'string', description: 'Authentic review text in Portuguese' }
                    }
                  },
                  description: 'Array of 5 authentic patient reviews'
                }
              },
              required: ['content', 'excerpt', 'meta_title', 'meta_description', 'category', 'tags', 'read_time', 'faqs', 'reviews']
            }
          }
        }],
        tool_choice: { type: 'function', function: { name: 'create_blog_post' } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Limite de requisições excedido. Tente novamente em alguns minutos.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Créditos insuficientes. Adicione créditos ao seu workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    
    console.log('AI Response:', JSON.stringify(aiData).substring(0, 500));

    // Extract structured data from tool call
    let postContent;
    try {
      if (aiData.choices[0].message.tool_calls && aiData.choices[0].message.tool_calls.length > 0) {
        const toolCall = aiData.choices[0].message.tool_calls[0];
        postContent = JSON.parse(toolCall.function.arguments);
        console.log('Successfully parsed tool call arguments');
      } else {
        throw new Error('No tool call in AI response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.log('AI Data:', JSON.stringify(aiData).substring(0, 1000));
      throw new Error('Failed to parse AI response');
    }

    return new Response(
      JSON.stringify(postContent),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error generating post content:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error generating post content' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
