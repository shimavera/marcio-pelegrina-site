# Sistema de Otimização Automática de Imagens 🖼️

## Visão Geral

Sistema completo de otimização automática de imagens com conversão para WebP/AVIF, compressão inteligente e geração de responsive srcset otimizado para diferentes dispositivos.

---

## Arquitetura do Sistema

### 1. Edge Function: `optimize-image`

**Localização**: `supabase/functions/optimize-image/index.ts`

**Funcionalidades**:
- Upload de imagem original para Supabase Storage
- Geração automática de URLs com transformações on-the-fly
- Suporte a múltiplos tamanhos (480px, 768px, 1200px)
- Conversão automática para WebP e AVIF
- Compressão inteligente baseada no tamanho
- Segurança: requer autenticação

**Como funciona**:
1. Recebe arquivo via FormData
2. Faz upload da imagem original para o bucket
3. Gera URLs de transformação usando Supabase Storage Image Transformation API
4. Retorna JSON com todas as URLs otimizadas e metadata

**Exemplo de requisição**:
```typescript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('bucket', 'blog-images');
formData.append('path', 'articles/2024');

const { data } = await supabase.functions.invoke('optimize-image', {
  body: formData
});
```

**Exemplo de resposta**:
```json
{
  "success": true,
  "images": {
    "original": {
      "url": "https://...storage.../image-123-original.jpg",
      "path": "articles/2024/image-123-original.jpg"
    },
    "webp": {
      "mobile": {
        "url": "https://...?width=480&quality=80&format=webp",
        "width": 480,
        "quality": 80
      },
      "tablet": { ... },
      "desktop": { ... }
    },
    "avif": { ... }
  },
  "srcset": {
    "webp": "https://...?width=480&quality=80&format=webp 480w, ...",
    "avif": "https://...?width=480&quality=75&format=avif 480w, ..."
  },
  "metadata": {
    "originalSize": 2048000,
    "originalName": "photo.jpg",
    "sizeCategory": "hero",
    "recommendation": "80-100kb compressed",
    "bucket": "blog-images"
  }
}
```

---

### 2. Biblioteca: `imageOptimization.ts`

**Localização**: `src/lib/imageOptimization.ts`

**Funções Exportadas**:

#### `uploadAndOptimizeImage(file, bucket?, path?)`
Upload e otimização automática de imagem.

```typescript
const result = await uploadAndOptimizeImage(
  file,
  'blog-images', // opcional
  'articles/2024' // opcional
);

// result.images.original.url -> URL da imagem original
// result.srcset.webp -> srcset completo para WebP
// result.metadata.sizeCategory -> 'hero' | 'content' | 'thumbnail'
```

#### `generateSrcSet(baseUrl, format?)`
Gera string srcset para imagens responsivas.

```typescript
const srcset = generateSrcSet(
  'https://...storage.../image.jpg',
  'webp' // ou 'avif'
);
// Retorna: "url?width=480&quality=80&format=webp 480w, ..."
```

#### `getOptimizedImageUrl(baseUrl, width?, format?, quality?)`
Obtém URL otimizada com parâmetros específicos.

```typescript
const url = getOptimizedImageUrl(
  'https://...storage.../image.jpg',
  768,
  'webp',
  85
);
// Retorna: "url?width=768&quality=85&format=webp"
```

#### `estimateCompressedSize(originalSize, format?)`
Estima tamanho comprimido da imagem.

```typescript
const estimate = estimateCompressedSize(2048000, 'webp');
// { bytes: 614400, readable: "600.00KB" }
```

---

### 3. Componente: `OptimizedImage`

**Localização**: `src/components/OptimizedImage.tsx`

**Props**:
```typescript
interface OptimizedImageProps {
  src: string;           // URL da imagem
  alt: string;           // Texto alternativo (SEO)
  width: number;         // Largura original
  height: number;        // Altura original
  priority?: boolean;    // Se true, carrega imediatamente (hero images)
  className?: string;    // Classes CSS customizadas
  sizes?: string;        // Tamanhos responsivos
  format?: 'webp' | 'avif' | 'auto'; // Formato preferido
  quality?: number;      // Qualidade (1-100)
}
```

**Uso Básico**:
```tsx
import OptimizedImage from '@/components/OptimizedImage';

// Hero image (prioridade alta)
<OptimizedImage
  src="https://...storage.../hero.jpg"
  alt="Dr. Yuri Julio realizando cirurgia"
  width={1920}
  height={1080}
  priority={true}
  format="auto"
  sizes="100vw"
/>

// Content image (lazy loading)
<OptimizedImage
  src="https://...storage.../content.jpg"
  alt="Equipamento moderno de tomografia"
  width={800}
  height={600}
  format="webp"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Recursos**:
- ✅ Picture element com fallbacks automáticos (AVIF → WebP → Original)
- ✅ Lazy loading inteligente (exceto priority)
- ✅ Skeleton loading durante carregamento
- ✅ Aspect ratio preservado (previne CLS)
- ✅ Tratamento de erros com fallback visual
- ✅ Responsive srcset automático
- ✅ Integração com Supabase Storage Transformations

---

### 4. Componente: `ImageUploadWithOptimization`

**Localização**: `src/components/ImageUploadWithOptimization.tsx`

**Props**:
```typescript
interface ImageUploadWithOptimizationProps {
  bucket?: string;           // Bucket do Supabase Storage
  path?: string;             // Caminho dentro do bucket
  onUploadComplete?: (result: ImageOptimizationResult) => void;
  acceptedFormats?: string[]; // Formatos aceitos
  maxSizeMB?: number;        // Tamanho máximo em MB
}
```

**Uso no BlogAdmin**:
```tsx
import ImageUploadWithOptimization from '@/components/ImageUploadWithOptimization';

<ImageUploadWithOptimization
  bucket="blog-images"
  path="posts/2024"
  onUploadComplete={(result) => {
    // Usar result.images.original.url no formulário
    setFormData(prev => ({
      ...prev,
      image_url: result.images.original.url
    }));
  }}
  maxSizeMB={10}
/>
```

**Recursos**:
- ✅ Preview de imagem antes do upload
- ✅ Validação de tipo e tamanho
- ✅ Barra de progresso (simulada)
- ✅ Estimativa de tamanho comprimido
- ✅ Exibição de todas as URLs geradas
- ✅ Instruções de uso para o admin
- ✅ Interface amigável com feedback visual

---

## Fluxo Completo de Uso

### 1. Admin faz upload no BlogAdmin

```tsx
// No BlogAdmin.tsx
<ImageUploadWithOptimization
  bucket="blog-images"
  onUploadComplete={(result) => {
    setFormData(prev => ({
      ...prev,
      image_url: result.images.original.url,
      thumbnail_url: result.images.webp.mobile.url // opcional
    }));
  }}
/>
```

### 2. Sistema salva URL original no banco

```typescript
// Salvo no posts table
{
  image_url: "https://...storage.../post-123-original.jpg",
  thumbnail_url: "https://...storage.../post-123-original.jpg?width=480&quality=80&format=webp"
}
```

### 3. Frontend renderiza com OptimizedImage

```tsx
// No BlogPost.tsx ou Blog.tsx
<OptimizedImage
  src={post.image_url}
  alt={post.title}
  width={1200}
  height={800}
  priority={false}
  format="auto"
/>
```

### 4. Navegador escolhe melhor formato

```html
<!-- HTML gerado automaticamente -->
<picture>
  <source
    type="image/avif"
    srcset="...?width=480&quality=75&format=avif 480w,
            ...?width=768&quality=80&format=avif 768w,
            ...?width=1200&quality=85&format=avif 1200w"
    sizes="100vw"
  />
  <source
    type="image/webp"
    srcset="...?width=480&quality=80&format=webp 480w,
            ...?width=768&quality=85&format=webp 768w,
            ...?width=1200&quality=90&format=webp 1200w"
    sizes="100vw"
  />
  <img
    src="...?width=1200&quality=85&format=webp"
    alt="Descrição da imagem"
    width="1200"
    height="800"
    loading="lazy"
    decoding="async"
  />
</picture>
```

---

## Benchmarks de Compressão

| Tipo | Original (JPEG) | WebP | AVIF | Economia |
|------|----------------|------|------|----------|
| **Hero** (1920x1080) | ~800KB | ~240KB | ~200KB | **75%** |
| **Content** (1200x800) | ~350KB | ~105KB | ~88KB | **75%** |
| **Thumbnail** (480x320) | ~80KB | ~24KB | ~20KB | **75%** |

---

## Qualidade por Tamanho

| Tamanho | WebP Quality | AVIF Quality | Uso Recomendado |
|---------|-------------|-------------|-----------------|
| **480px** (mobile) | 80 | 75 | Smartphones |
| **768px** (tablet) | 85 | 80 | Tablets, pequenos laptops |
| **1200px** (desktop) | 90 | 85 | Desktops, monitores grandes |

---

## Suporte de Navegadores

| Formato | Chrome | Firefox | Safari | Edge | iOS Safari |
|---------|--------|---------|--------|------|------------|
| **WebP** | ✅ 23+ | ✅ 65+ | ✅ 14+ | ✅ 18+ | ✅ 14+ |
| **AVIF** | ✅ 85+ | ✅ 93+ | ✅ 16.4+ | ✅ 121+ | ✅ 16+ |

**Fallback automático**: O componente `OptimizedImage` usa `<picture>` element que automaticamente faz fallback para formatos suportados.

---

## Integração com Supabase Storage

### Transformações On-the-Fly

Supabase Storage suporta transformações de imagem via query parameters:

```
https://[PROJECT].supabase.co/storage/v1/object/public/bucket/image.jpg
  ?width=800
  &height=600
  &quality=85
  &format=webp
  &resize=cover
```

**Parâmetros disponíveis**:
- `width`: Largura em pixels
- `height`: Altura em pixels
- `quality`: Qualidade 1-100
- `format`: `webp`, `avif`, `jpeg`, `png`
- `resize`: `cover`, `contain`, `fill`

### Bucket Configuration

```sql
-- Criar bucket público para blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- RLS Policy para upload (apenas admins)
CREATE POLICY "Admins can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog-images' AND
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- RLS Policy para visualização (público)
CREATE POLICY "Anyone can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');
```

---

## Troubleshooting

### Problema: Imagens não otimizam

**Solução**: Verificar se a URL contém `supabase` no caminho. O sistema só aplica otimizações em imagens do Supabase Storage.

```typescript
// ✅ Otimiza
src="https://qqpzmogjakvbkygudxtp.supabase.co/storage/.../image.jpg"

// ❌ Não otimiza (URL externa)
src="https://example.com/image.jpg"
```

### Problema: Edge function retorna erro 401

**Solução**: Verificar se o usuário está autenticado antes de chamar a função.

```typescript
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  throw new Error('Usuário não autenticado');
}
```

### Problema: Upload falha com erro de permissão

**Solução**: Verificar RLS policies no bucket e role do usuário.

```sql
-- Verificar policies
SELECT * FROM pg_policies WHERE tablename = 'objects';

-- Verificar role do usuário
SELECT * FROM user_roles WHERE user_id = auth.uid();
```

---

## Próximos Passos

### Melhorias Futuras

1. **Background Processing**:
   - Processar imagens em segundo plano
   - Gerar thumbnails pré-calculados
   - Cache de transformações frequentes

2. **CDN Integration**:
   - Integrar com Cloudflare/AWS CloudFront
   - Edge caching de imagens otimizadas
   - Distribuição geográfica

3. **Smart Cropping**:
   - Detecção de faces e objetos importantes
   - Crop inteligente para thumbnails
   - Focal point detection

4. **Analytics**:
   - Rastrear qual formato é mais usado
   - Monitorar savings de bandwidth
   - Performance metrics por dispositivo

---

## Recursos Adicionais

- [Supabase Storage Transformations](https://supabase.com/docs/guides/storage/image-transformations)
- [WebP vs AVIF Comparison](https://developer.chrome.com/blog/avif-has-landed/)
- [Responsive Images MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Picture Element Guide](https://web.dev/learn/design/picture-element/)
