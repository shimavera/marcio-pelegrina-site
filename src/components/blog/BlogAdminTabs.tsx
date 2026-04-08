import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";

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

interface BlogAdminTabsProps {
  formData: any;
  setFormData: (data: any) => void;
  categories: any[];
  locations: any[];
  uploadingImage: boolean;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'thumbnail') => void;
}

const BlogAdminTabs = ({
  formData,
  setFormData,
  categories,
  locations,
  uploadingImage,
  handleImageUpload,
}: BlogAdminTabsProps) => {
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((tag: string) => tag !== tagToRemove) || [],
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  const handleContentChange = (content: string) => {
    setFormData({
      ...formData,
      content,
      read_time: calculateReadTime(content),
    });
  };

  const addFAQ = () => {
    setFormData({
      ...formData,
      faqs: [...(formData.faqs || []), { question: '', answer: '' }],
    });
  };

  const removeFAQ = (index: number) => {
    setFormData({
      ...formData,
      faqs: formData.faqs?.filter((_: any, i: number) => i !== index) || [],
    });
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const newFAQs = [...(formData.faqs || [])];
    newFAQs[index] = { ...newFAQs[index], [field]: value };
    setFormData({ ...formData, faqs: newFAQs });
  };

  const addReview = () => {
    setFormData({
      ...formData,
      reviews: [
        ...(formData.reviews || []),
        { author: '', rating: 5, date: new Date().toISOString().split('T')[0], text: '' },
      ],
    });
  };

  const removeReview = (index: number) => {
    setFormData({
      ...formData,
      reviews: formData.reviews?.filter((_: any, i: number) => i !== index) || [],
    });
  };

  const updateReview = (index: number, field: string, value: any) => {
    const newReviews = [...(formData.reviews || [])];
    newReviews[index] = { ...newReviews[index], [field]: value };
    setFormData({ ...formData, reviews: newReviews });
  };

  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="content">Conteúdo</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
        <TabsTrigger value="advanced">Avançado</TabsTrigger>
        <TabsTrigger value="engagement">FAQ & Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="Digite o título do post"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="Deixe em branco para gerar automaticamente"
          />
          <p className="text-xs text-muted-foreground">
            URL amigável gerada automaticamente a partir do título
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Resumo</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={2}
            placeholder="Breve descrição do post (opcional)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Conteúdo *</Label>
          <p className="text-sm text-muted-foreground">
            Use uma linha em branco para separar parágrafos. O tempo de leitura é calculado automaticamente.
          </p>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleContentChange(e.target.value)}
            rows={12}
            required
            placeholder="Digite o conteúdo do post..."
          />
          {formData.read_time && (
            <p className="text-xs text-muted-foreground">
              Tempo de leitura estimado: {formData.read_time}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <select
              id="category"
              value={formData.category_id || ""}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value || null })}
              className="w-full px-3 py-2 rounded-md bg-background border border-input"
            >
              <option value="">Nenhuma</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <select
              id="location"
              value={formData.clinic_location_id || ""}
              onChange={(e) => setFormData({ ...formData, clinic_location_id: e.target.value || null })}
              className="w-full px-3 py-2 rounded-md bg-background border border-input"
            >
              <option value="">Nenhuma</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} - {loc.city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="main-image">Imagem Principal</Label>
          <Input
            id="main-image"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'main')}
            disabled={uploadingImage}
          />
          {uploadingImage && <p className="text-sm text-muted-foreground">Enviando...</p>}
          {formData.image_url && (
            <div className="space-y-2">
              <img src={formData.image_url} alt="Preview" className="max-w-xs rounded-lg border" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFormData({ ...formData, image_url: "" })}
              >
                Remover
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail-image">Thumbnail (para listagem)</Label>
          <Input
            id="thumbnail-image"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'thumbnail')}
            disabled={uploadingImage}
          />
          {formData.thumbnail_url && (
            <div className="space-y-2">
              <img src={formData.thumbnail_url} alt="Thumbnail" className="max-w-xs rounded-lg border" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFormData({ ...formData, thumbnail_url: "" })}
              >
                Remover
              </Button>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="seo" className="space-y-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="meta-title">Meta Title (SEO)</Label>
          <Input
            id="meta-title"
            value={formData.meta_title || ""}
            onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
            maxLength={60}
            placeholder="Título otimizado para SEO (máx. 60 caracteres)"
          />
          <p className="text-xs text-muted-foreground">
            {(formData.meta_title || "").length}/60 caracteres
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta-description">Meta Description (SEO)</Label>
          <Textarea
            id="meta-description"
            value={formData.meta_description || ""}
            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
            maxLength={155}
            rows={3}
            placeholder="Descrição otimizada para SEO (máx. 155 caracteres)"
          />
          <p className="text-xs text-muted-foreground">
            {(formData.meta_description || "").length}/155 caracteres
          </p>
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Digite uma tag e pressione Enter"
            />
            <Button type="button" onClick={addTag} variant="outline">
              Adicionar
            </Button>
          </div>
          {formData.tags && formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="advanced" className="space-y-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="geo-lat">Latitude (GEO)</Label>
            <Input
              id="geo-lat"
              type="number"
              step="any"
              value={formData.geo_lat || ""}
              onChange={(e) => setFormData({ ...formData, geo_lat: e.target.value })}
              placeholder="-23.577643"
            />
            <p className="text-xs text-muted-foreground">
              Padrão da clínica: -23.577643
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="geo-lng">Longitude (GEO)</Label>
            <Input
              id="geo-lng"
              type="number"
              step="any"
              value={formData.geo_lng || ""}
              onChange={(e) => setFormData({ ...formData, geo_lng: e.target.value })}
              placeholder="-46.677572"
            />
            <p className="text-xs text-muted-foreground">
              Padrão da clínica: -46.677572
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cta-text">Texto do CTA</Label>
          <Input
            id="cta-text"
            value={formData.cta_text || ""}
            onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
            placeholder="Agende sua avaliação com o Dr. Luan Maciel"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cta-url">URL do CTA</Label>
          <Input
            id="cta-url"
            value={formData.cta_url || ""}
            onChange={(e) => setFormData({ ...formData, cta_url: e.target.value })}
            placeholder="https://api.whatsapp.com/send?phone=5511983385832&text=Ol%C3%A1%20vim%20do%20site.%20Quero%20mais%20informa%C3%A7%C3%B5es."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="read-time">Tempo de Leitura</Label>
          <Input
            id="read-time"
            value={formData.read_time || ""}
            onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
            placeholder="Ex: 5 min (calculado automaticamente)"
          />
          <p className="text-xs text-muted-foreground">
            Calculado automaticamente, mas pode ser editado manualmente
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured || false}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4"
          />
          <Label htmlFor="featured" className="cursor-pointer">
            Post em Destaque (aparece primeiro na listagem)
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 rounded-md bg-background border border-input"
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="internal-notes">Notas Internas</Label>
          <Textarea
            id="internal-notes"
            value={formData.internal_notes || ""}
            onChange={(e) => setFormData({ ...formData, internal_notes: e.target.value })}
            rows={4}
            placeholder="Notas internas (não visíveis publicamente)"
          />
        </div>
      </TabsContent>

      <TabsContent value="engagement" className="space-y-4 mt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-lg font-semibold">Perguntas Frequentes (FAQ)</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Adicione FAQs para melhorar SEO e aparecer nos rich snippets
              </p>
            </div>
            <Button type="button" onClick={addFAQ} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar FAQ
            </Button>
          </div>

          {formData.faqs && formData.faqs.length > 0 ? (
            <div className="space-y-4">
              {formData.faqs.map((faq: any, index: number) => (
                <Card key={index} className="p-4 relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeFAQ(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  <div className="space-y-3 pr-8">
                    <div className="space-y-2">
                      <Label>Pergunta {index + 1}</Label>
                      <Input
                        value={faq.question}
                        onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                        placeholder="Ex: Quanto tempo dura o procedimento?"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Resposta</Label>
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
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
              Nenhuma FAQ adicionada
            </p>
          )}
        </div>

        <div className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-lg font-semibold">Avaliações de Pacientes</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Adicione avaliações reais para social proof
              </p>
            </div>
            <Button type="button" onClick={addReview} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Avaliação
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label>Nota Média</Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.aggregate_rating_value || ''}
                onChange={(e) => setFormData({ ...formData, aggregate_rating_value: e.target.value })}
                placeholder="Ex: 4.9"
              />
            </div>
            <div className="space-y-2">
              <Label>Total de Avaliações</Label>
              <Input
                type="number"
                value={formData.aggregate_rating_count || ''}
                onChange={(e) => setFormData({ ...formData, aggregate_rating_count: e.target.value })}
                placeholder="Ex: 127"
              />
            </div>
          </div>

          {formData.reviews && formData.reviews.length > 0 ? (
            <div className="space-y-4">
              {formData.reviews.map((review: any, index: number) => (
                <Card key={index} className="p-4 relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeReview(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                    <div className="space-y-2">
                      <Label>Nome</Label>
                      <Input
                        value={review.author}
                        onChange={(e) => updateReview(index, 'author', e.target.value)}
                        placeholder="Maria Silva"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Nota (1-5)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={review.rating}
                        onChange={(e) => updateReview(index, 'rating', parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Input
                        type="date"
                        value={review.date}
                        onChange={(e) => updateReview(index, 'date', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label>Depoimento</Label>
                      <Textarea
                        value={review.text}
                        onChange={(e) => updateReview(index, 'text', e.target.value)}
                        rows={3}
                        placeholder="Depoimento do paciente..."
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-lg">
              Nenhuma avaliação adicionada
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default BlogAdminTabs;
