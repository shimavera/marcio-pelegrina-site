import { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

interface ReviewSchemaProps {
  reviews: Review[];
  aggregateRating: {
    value: number;
    count: number;
  };
  itemName: string;
}

const REVIEWS_PER_PAGE = 4;

const ReviewSchema = ({ reviews, aggregateRating, itemName }: ReviewSchemaProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  const currentReviews = reviews.slice(startIndex, endIndex);

  useEffect(() => {
    if (!reviews || reviews.length === 0) return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: itemName,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.value.toString(),
        reviewCount: aggregateRating.count.toString(),
      },
      review: reviews.map(review => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author,
        },
        datePublished: review.date,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating.toString(),
        },
        reviewBody: review.text,
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'review-schema';

    const existingScript = document.getElementById('review-schema');
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('review-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [reviews, aggregateRating, itemName]);

  if (!reviews || reviews.length === 0) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-foreground font-kiona">Avaliações de Pacientes</h2>
        <div className="flex items-center gap-3">
          <div className="flex">{renderStars(Math.round(aggregateRating.value))}</div>
          <span className="text-lg font-semibold text-foreground">
            {aggregateRating.value.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">
            ({aggregateRating.count} avaliações)
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {currentReviews.map((review, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-foreground">{review.author}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex">{renderStars(review.rating)}</div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="gap-2"
          >
            <span className="hidden sm:inline">Próxima</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  );
};

export default ReviewSchema;
