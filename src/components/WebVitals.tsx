import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

const WebVitals = () => {
  useEffect(() => {
    // Only run in production and if PerformanceObserver is supported
    if (import.meta.env.MODE !== 'production' || !('PerformanceObserver' in window)) {
      return;
    }

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

    const getPageType = () => {
      const path = window.location.pathname;
      if (path === '/') return 'home';
      if (path.startsWith('/blog/') && path !== '/blog') return 'blog-post';
      if (path === '/blog') return 'blog';
      if (path.startsWith('/servicos') || path.startsWith('/tratamentos')) return 'services';
      return 'other';
    };

    const getSessionId = () => {
      let sessionId = sessionStorage.getItem('analytics_session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('analytics_session_id', sessionId);
      }
      return sessionId;
    };

    const reportMetric = async (metric: WebVitalsMetric) => {
      // Log to console in development
      if (import.meta.env.DEV) {
        console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric.rating);
      }

      // Send to analytics (Google Analytics example)
      if (window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_rating: metric.rating,
          metric_value: metric.value,
        });
      }

      // Send to GTM dataLayer
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'web_vitals',
          metric_name: metric.name,
          metric_value: metric.value,
          metric_rating: metric.rating,
        });
      }

      // Send to Supabase for dashboard analytics
      try {
        await (supabase as any).from('web_vitals_analytics').insert({
          metric_name: metric.name,
          metric_value: metric.value,
          metric_rating: metric.rating,
          device_type: getDeviceType(),
          viewport_width: window.innerWidth,
          viewport_height: window.innerHeight,
          connection_type: getConnectionType(),
          page_url: window.location.href,
          page_type: getPageType(),
          user_agent: navigator.userAgent,
          session_id: getSessionId(),
        });
      } catch (error) {
        console.error('Failed to save web vitals to database:', error);
      }
    };

    const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
      const thresholds: Record<string, [number, number]> = {
        LCP: [2500, 4000],
        INP: [200, 500],
        CLS: [0.1, 0.25],
        FCP: [1800, 3000],
        TTFB: [800, 1800],
      };

      const [good, poor] = thresholds[name] || [0, 0];
      if (value <= good) return 'good';
      if (value <= poor) return 'needs-improvement';
      return 'poor';
    };

    // LCP - Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      reportMetric({
        name: 'LCP',
        value: lastEntry.renderTime || lastEntry.loadTime,
        rating: getRating('LCP', lastEntry.renderTime || lastEntry.loadTime),
      });
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // INP - Interaction to Next Paint (simplified approach)
    let maxInteractionDelay = 0;
    const inpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries() as any[];
      entries.forEach((entry) => {
        const delay = entry.processingEnd - entry.processingStart;
        if (delay > maxInteractionDelay) {
          maxInteractionDelay = delay;
        }
      });
    });
    
    try {
      inpObserver.observe({ type: 'event', buffered: true });
    } catch {
      // Fallback if 'event' type is not supported
      inpObserver.observe({ type: 'first-input', buffered: true });
    }

    // Report INP on page unload
    const reportINP = () => {
      if (maxInteractionDelay > 0) {
        reportMetric({
          name: 'INP',
          value: maxInteractionDelay,
          rating: getRating('INP', maxInteractionDelay),
        });
      }
    };

    // CLS - Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // Report CLS and INP on page unload
    const reportCLS = () => {
      reportMetric({
        name: 'CLS',
        value: clsValue,
        rating: getRating('CLS', clsValue),
      });
    };

    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportCLS();
        reportINP();
      }
    });

    return () => {
      lcpObserver.disconnect();
      inpObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return null;
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default WebVitals;
