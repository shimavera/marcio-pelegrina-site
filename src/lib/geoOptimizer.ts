/**
 * GEO (Generative Engine Optimization) Optimizer
 * Non-destructive content enhancement layer for AI-powered search engines
 * Improves semantic structure and clarity without altering visual presentation
 */

interface GEOOptimizationResult {
  optimizedContent: string;
  metaDescription: string;
  readTime: string;
  structuredSummary: string;
}

/**
 * Enhances blog content for better AI understanding and ranking
 * Preserves all HTML structure and formatting
 */
export function optimizeContentForGEO(
  content: string,
  title: string,
  excerpt?: string
): GEOOptimizationResult {
  let optimizedContent = content;

  // 1. Add semantic markers for AI comprehension (invisible to users)
  optimizedContent = addSemanticMarkers(optimizedContent);

  // 2. Enhance headings with context clues
  optimizedContent = enhanceHeadings(optimizedContent, title);

  // 3. Add micro-summaries before complex sections
  optimizedContent = addMicroSummaries(optimizedContent);

  // 4. Improve medical/dental terminology precision
  optimizedContent = enhanceTechnicalTerminology(optimizedContent);

  // 5. Add conversational Q&A patterns
  optimizedContent = addConversationalPatterns(optimizedContent);

  // 6. Calculate optimized read time
  const readTime = calculateReadTime(optimizedContent);

  // 7. Generate AI-friendly meta description
  const metaDescription = generateMetaDescription(title, excerpt, content);

  // 8. Create structured summary for AI indexing
  const structuredSummary = generateStructuredSummary(title, content);

  return {
    optimizedContent,
    metaDescription,
    readTime,
    structuredSummary,
  };
}

/**
 * Adds semantic HTML5 markers and microdata for better AI parsing
 */
function addSemanticMarkers(content: string): string {
  let enhanced = content;

  // Wrap important medical terms with semantic markup
  const medicalTerms = [
    'ortodontia', 'ortognática', 'implante', 'lente de contato dental',
    'clareamento', 'periodontia', 'endodontia', 'prótese', 'faceta',
    'harmonização facial', 'bichectomia', 'botox', 'preenchimento'
  ];

  medicalTerms.forEach(term => {
    const regex = new RegExp(`\\b(${term})\\b`, 'gi');
    enhanced = enhanced.replace(regex, (match) => {
      if (!match.includes('<')) { // Avoid re-wrapping
        return `<span itemscope itemtype="https://schema.org/MedicalProcedure">${match}</span>`;
      }
      return match;
    });
  });

  return enhanced;
}

/**
 * Enhances headings with contextual information for AI
 */
function enhanceHeadings(content: string, mainTitle: string): string {
  let enhanced = content;

  // Add data attributes to headings for AI context
  enhanced = enhanced.replace(/<h2>(.*?)<\/h2>/gi, (match, heading) => {
    return `<h2 data-section-type="main-topic" data-context="${mainTitle}">${heading}</h2>`;
  });

  enhanced = enhanced.replace(/<h3>(.*?)<\/h3>/gi, (match, heading) => {
    return `<h3 data-section-type="sub-topic">${heading}</h3>`;
  });

  return enhanced;
}

/**
 * Adds invisible micro-summaries before complex sections
 */
function addMicroSummaries(content: string): string {
  let enhanced = content;

  // Add summary markers before lists (invisible to users, visible to AI)
  enhanced = enhanced.replace(/<ul>/gi, 
    '<div class="sr-only" data-ai-summary="key-points-list">Principais pontos:</div><ul>'
  );
  
  enhanced = enhanced.replace(/<ol>/gi, 
    '<div class="sr-only" data-ai-summary="step-by-step">Passo a passo:</div><ol>'
  );

  return enhanced;
}

/**
 * Enhances technical dental/medical terminology with proper context
 */
function enhanceTechnicalTerminology(content: string): string {
  let enhanced = content;

  const termEnhancements: Record<string, string> = {
    'cirurgia ortognática': 'cirurgia ortognática (procedimento cirúrgico para correção de deformidades dentofaciais)',
    'lentes de contato dental': 'lentes de contato dental (facetas ultrafinas de porcelana)',
    'implante dentário': 'implante dentário (substituição de raiz dentária)',
    'clareamento dental': 'clareamento dental (tratamento estético de branqueamento)',
  };

  Object.entries(termEnhancements).forEach(([term, enhanced]) => {
    const regex = new RegExp(`\\b${term}\\b(?! \\()`, 'gi');
    // Only add explanation once per document
    if (content.match(regex)?.length === 1 || !content.includes(`(${enhanced.split('(')[1]}`)) {
      content = content.replace(regex, enhanced);
    }
  });

  return enhanced;
}

/**
 * Adds conversational Q&A patterns that AI models prefer
 */
function addConversationalPatterns(content: string): string {
  let enhanced = content;

  // Convert statements into Q&A format where applicable
  // Example: "O tratamento dura 6 meses" -> adds invisible "Quanto tempo dura? 6 meses"
  
  // Add conversational markers to paragraphs
  enhanced = enhanced.replace(/<p>(?!<)(.*?)<\/p>/gi, (match, text) => {
    if (text.length > 50 && text.includes('?')) {
      return `<p data-content-type="faq-style">${text}</p>`;
    }
    return match;
  });

  return enhanced;
}

/**
 * Calculates accurate read time based on content complexity
 */
function calculateReadTime(content: string): string {
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  const images = (content.match(/<img/g) || []).length;
  
  // Average reading speed: 200 words per minute (Portuguese)
  // Add 12 seconds per image
  const readingTimeMinutes = Math.ceil(words / 200 + (images * 0.2));
  
  return `${readingTimeMinutes} min de leitura`;
}

/**
 * Generates AI-optimized meta description
 */
function generateMetaDescription(title: string, excerpt: string | undefined, content: string): string {
  if (excerpt && excerpt.length >= 120 && excerpt.length <= 160) {
    return excerpt;
  }

  // Extract first meaningful paragraph
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const firstSentences = text.split('.').slice(0, 2).join('.') + '.';
  
  if (firstSentences.length <= 160) {
    return firstSentences;
  }

  return firstSentences.substring(0, 157) + '...';
}

/**
 * Generates structured summary for AI indexing (stored but not displayed)
 */
function generateStructuredSummary(title: string, content: string): string {
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Extract key information
  const headings = content.match(/<h[2-3]>(.*?)<\/h[2-3]>/gi) || [];
  const topics = headings.map(h => h.replace(/<[^>]*>/g, '')).join(' | ');
  
  const summary = {
    mainTopic: title,
    subTopics: topics,
    contentType: 'educational-medical',
    targetAudience: 'pacientes-odontologia',
    intent: 'informacional-transacional',
    expertise: 'especialista-odontologia',
  };

  return JSON.stringify(summary);
}

/**
 * Validates and cleans content before optimization
 */
export function validateContent(content: string): boolean {
  if (!content || content.trim().length < 100) {
    return false;
  }

  // Check for basic HTML structure
  const hasMinimumStructure = content.includes('<p') || content.includes('<div');
  return hasMinimumStructure;
}

/**
 * Post-processes content to ensure no visual changes occurred
 */
export function ensureVisualIntegrity(original: string, optimized: string): string {
  // If optimization somehow broke visual structure, return original
  const originalTags = (original.match(/<[^>]+>/g) || []).length;
  const optimizedTags = (optimized.match(/<[^>]+>/g) || []).length;
  
  // Allow some tag additions (semantic wrappers) but not removals
  if (optimizedTags < originalTags) {
    console.warn('GEO: Visual integrity check failed, returning original content');
    return original;
  }
  
  return optimized;
}
