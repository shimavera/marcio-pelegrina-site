import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Loader2, AlertCircle, TrendingUp, FileText, Globe } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentGap {
  question: string;
  reason: string;
  suggestedTitle: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface AnalysisResult {
  gaps: ContentGap[];
  totalPosts: number;
  analyzedAt: string;
}

interface ContentGapAnalysisProps {
  onCreatePost: (postData: {
    title: string;
    category: string;
    content: string;
    excerpt: string;
    meta_title: string;
    meta_description: string;
    tags: string[];
    read_time: string;
    faqs: Array<{ question: string; answer: string }>;
    reviews: Array<{ author: string; rating: number; date: string; text: string }>;
  }) => void;
}

type Language = 'pt' | 'en';

const ContentGapAnalysis = ({ onCreatePost }: ContentGapAnalysisProps) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('pt');
  const { toast } = useToast();

  const priorityColors = {
    high: 'destructive',
    medium: 'default',
    low: 'secondary',
  } as const;

  const priorityLabels = {
    high: selectedLanguage === 'en' ? 'High Priority' : 'Alta Prioridade',
    medium: selectedLanguage === 'en' ? 'Medium Priority' : 'Média Prioridade',
    low: selectedLanguage === 'en' ? 'Low Priority' : 'Baixa Prioridade',
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const isEnglish = selectedLanguage === 'en';
      const functionName = isEnglish ? 'analyze-content-gaps-en' : 'analyze-content-gaps';
      
      const { data, error } = await supabase.functions.invoke(functionName);

      if (error) {
        if (error.message?.includes('429')) {
          throw new Error(isEnglish 
            ? 'Rate limit exceeded. Please try again in a few minutes.'
            : 'Limite de requisições excedido. Tente novamente em alguns minutos.');
        }
        if (error.message?.includes('402')) {
          throw new Error(isEnglish 
            ? 'Insufficient credits. Please add credits to your workspace.'
            : 'Créditos insuficientes. Adicione créditos ao seu workspace Lovable AI.');
        }
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      toast({
        title: isEnglish ? "Analysis completed!" : "Análise concluída!",
        description: isEnglish 
          ? `Identified ${data.gaps.length} content gaps`
          : `Identificados ${data.gaps.length} gaps de conteúdo`,
      });
    } catch (error) {
      console.error('Error analyzing gaps:', error);
      toast({
        title: selectedLanguage === 'en' ? "Analysis error" : "Erro na análise",
        description: error instanceof Error ? error.message : 'Error analyzing content gaps',
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCreateFromGap = async (gap: ContentGap) => {
    setGenerating(gap.suggestedTitle);
    try {
      const isEnglish = selectedLanguage === 'en';
      const functionName = isEnglish ? 'generate-post-content-en' : 'generate-post-content';
      
      toast({
        title: isEnglish ? "Generating content..." : "Gerando conteúdo...",
        description: isEnglish 
          ? "AI is creating the complete post. This may take a few seconds."
          : "A IA está criando o post completo. Isso pode levar alguns segundos.",
      });

      const { data, error } = await supabase.functions.invoke(functionName, {
        body: {
          title: gap.suggestedTitle,
          category: gap.category,
          question: gap.question,
          reason: gap.reason,
        }
      });

      if (error) {
        if (error.message?.includes('429')) {
          throw new Error(isEnglish 
            ? 'Rate limit exceeded. Please try again in a few minutes.'
            : 'Limite de requisições excedido. Tente novamente em alguns minutos.');
        }
        if (error.message?.includes('402')) {
          throw new Error(isEnglish 
            ? 'Insufficient credits. Please add credits to your workspace.'
            : 'Créditos insuficientes. Adicione créditos ao seu workspace.');
        }
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Pass all generated data to the form (use AI-generated category if available)
      onCreatePost({
        title: gap.suggestedTitle,
        category: data.category || gap.category,
        content: data.content,
        excerpt: data.excerpt,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        tags: data.tags,
        read_time: data.read_time,
        faqs: data.faqs,
        reviews: data.reviews,
      });

      toast({
        title: isEnglish ? "Post generated successfully!" : "Post gerado com sucesso!",
        description: isEnglish 
          ? "All fields have been filled automatically"
          : "Todos os campos foram preenchidos automaticamente",
      });
    } catch (error) {
      console.error('Error generating post:', error);
      toast({
        title: selectedLanguage === 'en' ? "Error generating post" : "Erro ao gerar post",
        description: error instanceof Error ? error.message : 'Error generating post content',
        variant: "destructive",
      });
    } finally {
      setGenerating(null);
    }
  };

  const handleClearResults = () => {
    setResult(null);
    toast({
      title: "Sugestões removidas",
      description: "As sugestões foram limpas",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="break-words">Análise de Gaps de Conteúdo</span>
              </CardTitle>
              <CardDescription className="mt-2 text-sm">
                Identifique perguntas não respondidas e oportunidades de novos posts usando IA
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Select value={selectedLanguage} onValueChange={(value: Language) => setSelectedLanguage(value)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">Português (BR)</SelectItem>
                    <SelectItem value="en">English (EN)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 flex-1 sm:flex-initial">
                {result && (
                  <Button 
                    onClick={handleClearResults} 
                    variant="outline"
                    className="gap-2 flex-1 sm:flex-initial"
                    size="sm"
                  >
                    Limpar Sugestões
                  </Button>
                )}
                <Button 
                  onClick={handleAnalyze} 
                  disabled={analyzing}
                  className="gap-2 flex-1 sm:flex-initial"
                  size="sm"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="hidden sm:inline">Analisando...</span>
                      <span className="sm:hidden">...</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-4 w-4" />
                      <span className="hidden sm:inline">Analisar Blog</span>
                      <span className="sm:hidden">Analisar</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        {result && (
          <CardContent className="space-y-4 p-4 sm:p-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="text-sm sm:text-base">Análise Baseada em IA</AlertTitle>
              <AlertDescription className="text-xs sm:text-sm">
                Analisados {result.totalPosts} posts publicados em {new Date(result.analyzedAt).toLocaleString('pt-BR')}
              </AlertDescription>
            </Alert>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                Oportunidades Identificadas ({result.gaps.length})
              </h3>

              {result.gaps.map((gap, index) => (
                <Card key={index} className="border-l-4 overflow-hidden" style={{
                  borderLeftColor: gap.priority === 'high' ? 'hsl(var(--destructive))' : 
                                   gap.priority === 'medium' ? 'hsl(var(--primary))' : 
                                   'hsl(var(--muted-foreground))'
                }}>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={priorityColors[gap.priority]}>
                            {priorityLabels[gap.priority]}
                          </Badge>
                          <Badge variant="outline">{gap.category}</Badge>
                        </div>
                        <CardTitle className="text-base sm:text-lg break-words">{gap.question}</CardTitle>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleCreateFromGap(gap)}
                        disabled={generating === gap.suggestedTitle}
                        className="w-full sm:w-auto"
                      >
                        {generating === gap.suggestedTitle ? (
                          <>
                            <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                            Gerando...
                          </>
                        ) : (
                          'Criar Post'
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4 sm:p-6 pt-0">
                    <div className="text-sm text-muted-foreground break-words">
                      <strong className="text-foreground">Por quê:</strong> {gap.reason}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Título Sugerido:</div>
                      <div className="text-sm text-muted-foreground break-words">{gap.suggestedTitle}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ContentGapAnalysis;
