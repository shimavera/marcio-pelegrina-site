import { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { generateSrcSet, getOptimizedImageUrl } from '@/lib/imageOptimization';
import { supabase } from '@/integrations/supabase/client';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  format?: 'webp' | 'avif' | 'auto';
  quality?: number;
  trackAnalytics?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '100vw',
  format = 'auto',
  quality = 85,
  trackAnalytics = true,
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const loadStartTime = useRef<number>(0);
  const hasTracked = useRef(false);

  // Determine if we should use modern formats
  const useModernFormats = format === 'auto' || format === 'webp' || format === 'avif';
  
  // Generate optimized URLs
  const webpSrcSet = useModernFormats && src.includes('supabase') 
    ? generateSrcSet(src, 'webp') 
    : undefined;
  
  const avifSrcSet = useModernFormats && format === 'avif' && src.includes('supabase')
    ? generateSrcSet(src, 'avif')
    : undefined;

  const fallbackSrc = src.includes('supabase') 
    ? getOptimizedImageUrl(src, width, 'webp', quality)
    : src;

  // Get device info
  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const getConnectionType = () => {
    const nav = navigator as any;
    return nav.connection?.effectiveType || 'unknown';
  };

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  };

  const trackImageLoad = async (loadTimeMs: number, actualFormat: string) => {
    if (!trackAnalytics || hasTracked.current) return;
    hasTracked.current = true;

    try {
      // Estimate file size based on format and dimensions
      const estimatedOriginalSize = width * height * 3; // RGB
      const compressionRatio = actualFormat === 'avif' ? 0.25 : actualFormat === 'webp' ? 0.30 : 1;
      const estimatedSize = Math.round(estimatedOriginalSize * compressionRatio);
      const bandwidthSaved = estimatedOriginalSize - estimatedSize;

      await (supabase as any).from('image_analytics').insert({
        image_url: src,
        format: actualFormat,
        width,
        height,
        load_time_ms: loadTimeMs,
        file_size_bytes: estimatedSize,
        original_size_bytes: estimatedOriginalSize,
        bandwidth_saved_bytes: bandwidthSaved,
        device_type: getDeviceType(),
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        connection_type: getConnectionType(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        session_id: getSessionId(),
      });
    } catch (error) {
      console.error('Failed to track image analytics:', error);
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const loadTime = performance.now() - loadStartTime.current;
    const img = e.currentTarget;
    
    // Detect actual format loaded
    const actualFormat = img.currentSrc.includes('format=avif') ? 'avif' :
                        img.currentSrc.includes('format=webp') ? 'webp' : 'jpeg';
    
    trackImageLoad(Math.round(loadTime), actualFormat);
    setIsLoading(false);
  };

  useEffect(() => {
    loadStartTime.current = performance.now();
  }, [src]);

  return (
    <div className="relative" style={{ aspectRatio: `${width}/${height}` }}>
      {isLoading && !error && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {useModernFormats && (avifSrcSet || webpSrcSet) ? (
        <picture>
          {avifSrcSet && (
            <source
              type="image/avif"
              srcSet={avifSrcSet}
              sizes={sizes}
            />
          )}
          {webpSrcSet && (
            <source
              type="image/webp"
              srcSet={webpSrcSet}
              sizes={sizes}
            />
          )}
          <img
            src={fallbackSrc}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onLoad={handleImageLoad}
            onError={() => {
              setIsLoading(false);
              setError(true);
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </picture>
      ) : (
        <img
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleImageLoad}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
          Imagem não disponível
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
