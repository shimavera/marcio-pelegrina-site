import { supabase } from "@/integrations/supabase/client";

export interface OptimizedImageUrls {
  original: {
    url: string;
    path: string;
  };
  webp: {
    mobile: { url: string; width: number; quality: number };
    tablet: { url: string; width: number; quality: number };
    desktop: { url: string; width: number; quality: number };
  };
  avif: {
    mobile: { url: string; width: number; quality: number };
    tablet: { url: string; width: number; quality: number };
    desktop: { url: string; width: number; quality: number };
  };
}

export interface ImageOptimizationResult {
  success: boolean;
  images: OptimizedImageUrls;
  metadata: {
    originalSize: number;
    originalName: string;
    sizeCategory: 'hero' | 'content' | 'thumbnail';
    recommendation: string;
    bucket: string;
  };
  srcset: {
    webp: string;
    avif: string;
  };
  error?: string;
}

/**
 * Upload and automatically optimize image to WebP/AVIF with responsive srcset
 * 
 * @param file - The image file to upload
 * @param bucket - The storage bucket name (default: 'blog-images')
 * @param path - Optional path within the bucket
 * @returns Promise with optimized image URLs and metadata
 */
export async function uploadAndOptimizeImage(
  file: File,
  bucket: string = 'blog-images',
  path: string = ''
): Promise<ImageOptimizationResult> {
  try {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Tipo de arquivo inválido. Use JPG, PNG ou WebP.');
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('Arquivo muito grande. Tamanho máximo: 10MB.');
    }

    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Usuário não autenticado');
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);
    formData.append('path', path);

    // Call edge function
    const { data, error } = await supabase.functions.invoke('optimize-image', {
      body: formData,
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Erro ao processar imagem');
    }

    if (!data.success) {
      throw new Error(data.error || 'Erro ao otimizar imagem');
    }

    return data as ImageOptimizationResult;

  } catch (error) {
    console.error('Error uploading and optimizing image:', error);
    throw error;
  }
}

/**
 * Generate srcset string for responsive images
 * 
 * @param baseUrl - Base URL of the image
 * @param format - Image format (webp or avif)
 * @returns Srcset string for use in img or picture tags
 */
export function generateSrcSet(baseUrl: string, format: 'webp' | 'avif' = 'webp'): string {
  const widths = [480, 768, 1200];
  const qualities = format === 'avif' ? [75, 80, 85] : [80, 85, 90];

  return widths
    .map((width, index) => {
      return `${baseUrl}?width=${width}&quality=${qualities[index]}&format=${format} ${width}w`;
    })
    .join(', ');
}

/**
 * Get optimized image URL with specific size and format
 * 
 * @param baseUrl - Base URL of the image
 * @param width - Desired width
 * @param format - Image format (webp, avif, or original)
 * @param quality - Quality (1-100)
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  baseUrl: string,
  width?: number,
  format: 'webp' | 'avif' | 'original' = 'webp',
  quality: number = 85
): string {
  if (format === 'original' || !width) {
    return baseUrl;
  }

  const params = new URLSearchParams({
    width: width.toString(),
    quality: quality.toString(),
    format: format,
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Estimate compressed file size based on original size
 * 
 * @param originalSize - Original file size in bytes
 * @param format - Target format (webp or avif)
 * @returns Estimated compressed size in bytes
 */
export function estimateCompressedSize(
  originalSize: number,
  format: 'webp' | 'avif' = 'webp'
): { bytes: number; readable: string } {
  // WebP: approximately 25-35% of original JPEG
  // AVIF: approximately 20-30% of original JPEG
  const compressionRatio = format === 'avif' ? 0.25 : 0.30;
  const estimatedBytes = Math.round(originalSize * compressionRatio);
  
  const readable = estimatedBytes > 1024 * 1024
    ? `${(estimatedBytes / (1024 * 1024)).toFixed(2)}MB`
    : `${(estimatedBytes / 1024).toFixed(2)}KB`;

  return { bytes: estimatedBytes, readable };
}
