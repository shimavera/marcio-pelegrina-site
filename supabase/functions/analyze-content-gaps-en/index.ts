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

    console.log('Fetching published posts for English gap analysis...');

    // Fetch all published posts
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('title, excerpt, tags, content')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (postsError) throw postsError;

    console.log(`Analyzing ${posts?.length || 0} posts for English content gaps...`);

    // Prepare content summary for AI analysis
    const contentSummary = posts?.map(p => ({
      title: p.title,
      excerpt: p.excerpt,
      tags: p.tags || [],
    })) || [];

    // Call Lovable AI to analyze gaps - ENGLISH VERSION for dental tourism
    const systemPrompt = `You are a dental content marketing expert and content gap analyst specialized in dental tourism for international patients.

Analyze the existing blog content from **Dr. Márcio Pelegrina's** dental clinic in São Paulo, Brazil and identify frequently asked questions that international patients (especially from the US, Europe, and other countries) ask but are NOT adequately covered.

## About Dr. Márcio Pelegrina
- Dental Surgeon specialized in Cosmetic Dentistry and Endodontics
- CROSP License: [CROSP]
- Over 2,000 patients treated
- Location: [BAIRRO], São Paulo - SP, Brazil
- WhatsApp: +55 11 91185-2982

## Dr. Márcio Pelegrina's Specialties:
1. **Porcelain Dental Veneers (Lentes de Contato)** - Ultra-thin laminates for smile transformation
2. **Composite Resin Veneers** - More affordable alternative with excellent results
3. **Dental Facets** - Aesthetic restorations for shape and color correction
4. **Root Canal Treatment (Endodontics)** - Specialized treatment with microscopy
5. **Teeth Whitening** - Professional laser and at-home whitening
6. **Aesthetic Restorations** - High-quality composite resin restorations
7. **Complete Smile Makeover** - Digital smile design and planning
8. **Smile Harmonization** - Correction of asymmetries and dental proportions

Focus on DENTAL TOURISM aspects for COSMETIC DENTISTRY and identify content gaps related to:
- Cost comparison: Brazilian prices vs US/European prices for veneers
- Why São Paulo is a top destination for dental veneers
- Travel planning for smile makeover procedures
- Recovery time and when to fly back home
- English-speaking dental care with Dr. Márcio Pelegrina
- Payment options for international patients (USD, EUR accepted)
- Before and after transformations
- International patient testimonials
- Brazilian dental credentials recognition
- Combining multiple cosmetic procedures in one trip
- Post-operative care for patients returning abroad
- Virtual consultations and digital smile preview
- Accommodation near [BAIRRO] clinic

For each gap identified, provide:
1. The specific unanswered question
2. Why this is important for international patients seeking cosmetic dentistry
3. Suggested post title (include "Dr. Márcio Pelegrina" or "São Paulo" when appropriate)
4. Priority (high/medium/low)
5. Suggested category (use treatment name when applicable)

Return ONLY a valid JSON array with objects in the format:
{
  "question": "string",
  "reason": "string", 
  "suggestedTitle": "string",
  "priority": "high" | "medium" | "low",
  "category": "string"
}

IMPORTANT: Identify EXACTLY 3 MOST RELEVANT and high-priority content gaps focused on dental tourism for cosmetic dentistry treatments with Dr. Márcio Pelegrina.`;

    const userPrompt = `Current blog content:

${JSON.stringify(contentSummary, null, 2)}

Identify the 3 MOST IMPORTANT content gaps and unanswered questions that would be valuable for international patients considering dental tourism in Brazil.`;

    console.log('Calling Lovable AI for English gap analysis...');

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

    console.log(`Successfully identified ${gaps.length} English content gaps`);

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
    console.error('Error in analyze-content-gaps-en:', error);
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
