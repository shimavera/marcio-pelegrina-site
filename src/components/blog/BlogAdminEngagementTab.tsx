import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Plus } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

interface EngagementTabProps {
  faqs: FAQ[];
  reviews: Review[];
  aggregateRatingValue: string;
  aggregateRatingCount: string;
  onAddFAQ: () => void;
  onRemoveFAQ: (index: number) => void;
  onUpdateFAQ: (index: number, field: 'question' | 'answer', value: string) => void;
  onAddReview: () => void;
  onRemoveReview: (index: number) => void;
  onUpdateReview: (index: number, field: string, value: any) => void;
  onUpdateAggregateRating: (field: 'value' | 'count', value: string) => void;
}

const EngagementTab = ({
  faqs,
  reviews,
  aggregateRatingValue,
  aggregateRatingCount,
  onAddFAQ,
  onRemoveFAQ,
  onUpdateFAQ,
  onAddReview,
  onRemoveReview,
  onUpdateReview,
  onUpdateAggregateRating,
}: EngagementTabProps) => {
  return (
    <div className="space-y-8 mt-6">
      {/* FAQs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-lg font-semibold">Perguntas Frequentes (FAQ)</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Adicione FAQs para melhorar SEO e aparecer nos rich snippets do Google
            </p>
          </div>
          <Button type="button" onClick={onAddFAQ} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar FAQ
          </Button>
        </div>

        {faqs && faqs.length > 0 ? (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-4 relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => onRemoveFAQ(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <div className="space-y-3 pr-8">
                  <div className="space-y-2">
                    <Label>Pergunta {index + 1}</Label>
                    <Input
                      value={faq.question}
                      onChange={(e) => onUpdateFAQ(index, 'question', e.target.value)}
                      placeholder="Ex: Quanto tempo dura o procedimento?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Resposta</Label>
                    <Textarea
                      value={faq.answer}
                      onChange={(e) => onUpdateFAQ(index, 'answer', e.target.value)}
                      rows={3}
                      placeholder="Resposta detalhada..."
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-lg">
            Nenhuma FAQ adicionada. Clique em "Adicionar FAQ" para começar.
          </p>
        )}
      </div>

      {/* Reviews Section */}
      <div className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-lg font-semibold">Avaliações de Pacientes</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Adicione avaliações reais para social proof e rich snippets
            </p>
          </div>
          <Button type="button" onClick={onAddReview} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Avaliação
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label>Nota Média (Aggregate Rating)</Label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={aggregateRatingValue}
              onChange={(e) => onUpdateAggregateRating('value', e.target.value)}
              placeholder="Ex: 4.9"
            />
          </div>
          <div className="space-y-2">
            <Label>Total de Avaliações</Label>
            <Input
              type="number"
              value={aggregateRatingCount}
              onChange={(e) => onUpdateAggregateRating('count', e.target.value)}
              placeholder="Ex: 127"
            />
          </div>
        </div>

        {reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <Card key={index} className="p-4 relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => onRemoveReview(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                  <div className="space-y-2">
                    <Label>Nome do Paciente</Label>
                    <Input
                      value={review.author}
                      onChange={(e) => onUpdateReview(index, 'author', e.target.value)}
                      placeholder="Ex: Maria Silva"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Nota (1-5 estrelas)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={review.rating}
                      onChange={(e) => onUpdateReview(index, 'rating', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Data da Avaliação</Label>
                    <Input
                      type="date"
                      value={review.date}
                      onChange={(e) => onUpdateReview(index, 'date', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Depoimento</Label>
                    <Textarea
                      value={review.text}
                      onChange={(e) => onUpdateReview(index, 'text', e.target.value)}
                      rows={3}
                      placeholder="Depoimento do paciente sobre o atendimento..."
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-lg">
            Nenhuma avaliação adicionada. Clique em "Adicionar Avaliação" para começar.
          </p>
        )}
      </div>
    </div>
  );
};

export default EngagementTab;
