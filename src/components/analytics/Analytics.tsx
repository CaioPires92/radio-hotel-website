'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  GA_TRACKING_ID, 
  GTM_ID, 
  FB_PIXEL_ID, 
  HOTJAR_ID,
  pageview,
  trackPerformance
} from '@/lib/analytics';

interface AnalyticsProps {
  children: React.ReactNode;
}

export default function Analytics({ children }: AnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    pageview(url);
  }, [pathname, searchParams]);

  useEffect(() => {
    // Track performance metrics after page load
    const timer = setTimeout(() => {
      trackPerformance();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_TRACKING_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {GTM_ID && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Facebook Pixel */}
      {FB_PIXEL_ID && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Hotjar */}
      {HOTJAR_ID && (
        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      )}

      {/* Microsoft Clarity */}
      {process.env.NEXT_PUBLIC_CLARITY_ID && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
          `}
        </Script>
      )}

      {/* Structured Data for Analytics */}
      <Script
        id="analytics-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Radio Hotel Serra Negra',
            url: 'https://radiohotel.com.br',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://radiohotel.com.br/search?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {children}
    </>
  );
}

// Hook for tracking scroll depth
export function useScrollTracking() {
  useEffect(() => {
    let ticking = false;
    const scrollDepthMarks = [25, 50, 75, 90, 100];
    const trackedMarks = new Set<number>();

    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      scrollDepthMarks.forEach(mark => {
        if (scrollPercent >= mark && !trackedMarks.has(mark)) {
          trackedMarks.add(mark);
          // Import and use trackScrollDepth from analytics
          import('@/lib/analytics').then(({ trackScrollDepth }) => {
            trackScrollDepth(mark);
          });
        }
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          trackScrollDepth();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

// Hook for tracking time on page
export function useTimeTracking() {
  useEffect(() => {
    const startTime = Date.now();
    const timeMarks = [30, 60, 120, 300]; // seconds
    const trackedTimes = new Set<number>();

    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      timeMarks.forEach(mark => {
        if (timeSpent >= mark && !trackedTimes.has(mark)) {
          trackedTimes.add(mark);
          import('@/lib/analytics').then(({ event }) => {
            event({
              action: 'time_on_page',
              category: 'engagement',
              label: `${mark}_seconds`,
              value: mark,
            });
          });
        }
      });
    }, 5000); // Check every 5 seconds

    return () => {
      clearInterval(interval);
      const totalTime = Math.floor((Date.now() - startTime) / 1000);
      if (totalTime > 10) { // Only track if user spent more than 10 seconds
        import('@/lib/analytics').then(({ event }) => {
          event({
            action: 'session_duration',
            category: 'engagement',
            value: totalTime,
          });
        });
      }
    };
  }, []);
}