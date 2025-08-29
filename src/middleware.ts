import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';

// Regex to match locale in pathname
const localeRegex = new RegExp(`^/(${locales.join('|')})(/.*)?$`);

// Paths that should not be processed by i18n middleware
const excludedPaths = [
  '/api',
  '/sitemap.xml',
  '/robots.txt',
  '/manifest.json',
  '/sw.js',
  '/favicon.ico',
  '/_next',
  '/images',
  '/icons',
  '/videos'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for excluded paths
  if (excludedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Check if pathname has a locale
  const localeMatch = pathname.match(localeRegex);
  const hasLocale = !!localeMatch;
  const currentLocale = localeMatch?.[1];
  
  // If pathname has a valid locale, continue
  if (hasLocale && locales.includes(currentLocale as any)) {
    return NextResponse.next();
  }
  
  // If pathname has invalid locale, redirect to default
  if (hasLocale && !locales.includes(currentLocale as any)) {
    const newPathname = pathname.replace(/^\/[^/]+/, `/${defaultLocale}`);
    return NextResponse.redirect(new URL(newPathname, request.url));
  }
  
  // If no locale in pathname, detect and redirect
  const detectedLocale = detectLocale(request);
  
  // For default locale, don't add prefix to URL
  if (detectedLocale === defaultLocale) {
    return NextResponse.next();
  }
  
  // For non-default locales, add prefix
  const newPathname = `/${detectedLocale}${pathname}`;
  return NextResponse.redirect(new URL(newPathname, request.url));
}

function detectLocale(request: NextRequest): string {
  // 1. Check URL parameters
  const urlLocale = request.nextUrl.searchParams.get('locale');
  if (urlLocale && locales.includes(urlLocale as any)) {
    return urlLocale;
  }
  
  // 2. Check cookies
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }
  
  // 3. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [locale, q = '1'] = lang.trim().split(';q=');
        return { locale: locale.trim(), quality: parseFloat(q) };
      })
      .sort((a, b) => b.quality - a.quality);
    
    // Find best matching locale
    for (const { locale } of languages) {
      // Exact match
      if (locales.includes(locale as any)) {
        return locale;
      }
      
      // Language match (e.g., 'en' matches 'en-US')
      const languageCode = locale.split('-')[0];
      const matchedLocale = locales.find(l => l.startsWith(languageCode));
      if (matchedLocale) {
        return matchedLocale;
      }
    }
  }
  
  // 4. Check geolocation (if available)
  const country = request.headers.get('cf-ipcountry') || 
                 request.headers.get('x-vercel-ip-country');
  
  if (country) {
    const countryLocaleMap: Record<string, string> = {
      'BR': 'pt-BR',
      'PT': 'pt-BR',
      'US': 'en-US',
      'GB': 'en-US',
      'CA': 'en-US',
      'AU': 'en-US',
      'ES': 'es-ES',
      'MX': 'es-ES',
      'AR': 'es-ES',
      'CO': 'es-ES',
      'CL': 'es-ES',
      'PE': 'es-ES'
    };
    
    const geoLocale = countryLocaleMap[country.toUpperCase()];
    if (geoLocale && locales.includes(geoLocale as any)) {
      return geoLocale;
    }
  }
  
  // 5. Default fallback
  return defaultLocale;
}

// Configure which paths should be processed by middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml, robots.txt, manifest.json (SEO and PWA files)
     * - sw.js (service worker)
     * - images, icons, videos (static assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|sw.js|images|icons|videos).*)',
  ],
};