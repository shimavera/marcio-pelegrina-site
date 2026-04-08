import { useEffect } from 'react';

interface ArticleStructuredDataProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  author: string;
  url: string;
}

export const ArticleStructuredData = ({
  headline,
  description,
  image,
  datePublished,
  author,
  url,
}: ArticleStructuredDataProps) => {
  useEffect(() => {
    const wordCount = description.split(/\s+/).length;
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline,
      description,
      image: {
        '@type': 'ImageObject',
        url: image,
        width: 1200,
        height: 630,
      },
      datePublished,
      dateModified: datePublished,
      inLanguage: 'pt-BR',
      wordCount,
      author: {
        '@type': 'Person',
        name: author,
        url: `${window.location.origin}/doutores`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Dr. Márcio Pelegrina - Odontologia Avançada',
        logo: {
          '@type': 'ImageObject',
          url: `${window.location.origin}/logo.webp`,
          width: 600,
          height: 60,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    });
    
    script.id = 'article-schema';
    const existingScript = document.getElementById('article-schema');
    if (existingScript) existingScript.remove();
    
    document.head.appendChild(script);
    return () => {
      const scriptToRemove = document.getElementById('article-schema');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [headline, description, image, datePublished, author, url]);

  return null;
};

interface BreadcrumbStructuredDataProps {
  items: Array<{ name: string; url: string }>;
}

export const BreadcrumbStructuredData = ({ items }: BreadcrumbStructuredDataProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
    
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [items]);

  return null;
};
