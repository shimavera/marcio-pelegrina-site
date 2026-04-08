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

    console.log('Generating English post content for:', title);

    const systemPrompt = `You are an expert dental content writer for **Dr. Márcio Pelegrina's** dental clinic in São Paulo, Brazil. You create informative, engaging, and SEO-optimized content in English targeting international patients interested in dental tourism for cosmetic dentistry.

## About Dr. Márcio Pelegrina
- **Doctor**: Dr. Márcio Pelegrina - Dental Surgeon specialized in Cosmetic Dentistry and Endodontics
- **CROSP License**: [CROSP]
- **Experience**: Over 2,000 patients treated with personalized care
- **Location**: [BAIRRO], São Paulo, SP, Brazil
- **Address**: [ENDEREÇO] - [BAIRRO], São Paulo - SP, CEP: [CEP]
- **WhatsApp**: +55 11 98338-5832
- **Hours**: Monday to Friday, 9am to 6pm (Brasília Time)
- **Target Audience**: International patients from US, Europe, and other countries seeking high-quality, affordable cosmetic dental procedures in Brazil

## Dr. Márcio Pelegrina's Specialties
1. **Porcelain Dental Veneers (Lentes de Contato)** - Ultra-thin laminates for complete smile transformation
2. **Composite Resin Veneers** - More affordable alternative with excellent aesthetic results
3. **Dental Facets** - Aesthetic restorations for shape and color correction
4. **Root Canal Treatment (Endodontics)** - Specialized treatment with modern microscopy techniques
5. **Professional Teeth Whitening** - Laser and at-home whitening systems
6. **Aesthetic Restorations** - High-quality composite resin restorations
7. **Complete Smile Makeover** - Digital smile design and comprehensive planning
8. **Smile Harmonization** - Correction of asymmetries and dental proportions

CHARACTER LIMITS (CRITICAL - MUST RESPECT):
- title: maximum 60 characters
- meta_title: maximum 60 characters  
- meta_description: maximum 155 characters
- excerpt: between 150-160 characters
- content: between 1200-1800 words
- Each FAQ question: maximum 100 characters
- Each FAQ answer: between 200-400 characters
- Review name: maximum 30 characters
- Review comment: between 150-300 characters

CONTENT STRUCTURE:
1. Engaging introduction (2-3 paragraphs) highlighting why Brazil is a great choice for cosmetic dentistry
2. Sections with appropriate H2 and H3 headings (use ## and ###)
3. Lists and bullet points when relevant
4. Information about the procedure/treatment
5. Benefits and indications
6. Care and precautions
7. Why choose Dr. Márcio Pelegrina section (highlight expertise, technology, personalized care)
8. Conclusion with CTA

CRITICAL - CONTENT FORMAT:
- Use ONLY pure Markdown (##, ###, -, *, etc)
- NEVER use HTML tags like <p>, <span>, <br>, <strong>, etc
- Use ** for bold, * for italic
- Use - or * for lists
- Use ## for main titles, ### for subtitles
- For line breaks, just use Enter (do not use <br>)

CRITICAL - CONTACT INFORMATION:
At the end of the article, ALWAYS include this exact section with real information:

---

## Schedule Your Consultation with Dr. Márcio Pelegrina

Ready to transform your smile with one of São Paulo's leading cosmetic dentists? Contact us:

**Address:** [ENDEREÇO] - [BAIRRO], São Paulo - SP, Brazil, CEP: [CEP]

**WhatsApp:** +55 11 98338-5832

**Business Hours:** Monday to Friday, 9am to 6pm (Brasília Time)

Dr. Márcio Pelegrina and his team are ready to evaluate your case and create a personalized treatment plan for your perfect smile!

IMPORTANT: 
- Content should be between 1200-1800 words
- Tags should be relevant English keywords for dental tourism and cosmetic dentistry
- Meta title and description must include main keywords and "Dr. Márcio Pelegrina" when possible
- Generate realistic and relevant FAQs about cosmetic dentistry
- Generate authentic patient reviews with INTERNATIONAL names (patients who visited Brazil for dental tourism - mix of American, European, Australian names)
- NEVER use placeholders like [Address], [Phone], [Name]
- ALWAYS use the real information provided above
- Mention "Dr. Márcio Pelegrina" naturally throughout the content`;

    const userPrompt = `Create a complete article about:

Title: ${title}
Category: ${category}
Patient question: ${question}
Why it's important: ${reason}

Generate a complete, detailed and optimized article for this topic, targeting international patients considering dental tourism in Brazil.`;

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
            description: 'Create a complete blog post in English with all metadata, FAQs and patient reviews',
            parameters: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                  description: 'Complete article content in markdown format with ## for titles (1200-1800 words)'
                },
                excerpt: {
                  type: 'string',
                  description: 'Summary of 150-160 characters in English'
                },
                meta_title: {
                  type: 'string',
                  description: 'SEO title up to 60 characters in English'
                },
                meta_description: {
                  type: 'string',
                  description: 'SEO description of 150-160 characters in English'
                },
                category: {
                  type: 'string',
                  description: 'MUST be one of these EXACT categories: "Estética Dental", "Lentes de Contato Dental", "Endodontia", "Clareamento Dental", "Restaurações", "Dicas e Cuidados"'
                },
                tags: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Array of 5 relevant English keywords for dental tourism'
                },
                read_time: {
                  type: 'string',
                  description: 'Estimated reading time (e.g., "5 min read")'
                },
                faqs: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      question: { type: 'string', description: 'FAQ question in English (max 100 chars)' },
                      answer: { type: 'string', description: 'FAQ answer in English (200-400 chars)' }
                    }
                  },
                  description: 'Array of 5 frequently asked questions with answers in English'
                },
                reviews: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      author: { type: 'string', description: 'International patient name (American, European, Australian - max 30 chars)' },
                      rating: { type: 'number', description: 'Rating from 4.5 to 5.0' },
                      date: { type: 'string', description: 'Date in YYYY-MM-DD format within last 6 months' },
                      text: { type: 'string', description: 'Authentic review text in English (150-300 chars)' }
                    }
                  },
                  description: 'Array of 5 authentic international patient reviews in English'
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
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a few minutes.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Insufficient credits. Please add credits to your workspace.' }),
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
    console.error('Error generating English post content:', error);
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
