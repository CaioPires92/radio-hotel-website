import { NextRequest, NextResponse } from 'next/server';
// import { locales, defaultLocale } from '@/lib/i18n';


// Paths that should not be processed by i18n middleware
const excludedPaths = [
  '/api',
  '/sitemap.xml',
  '/robots.txt',
  '/manifest.json',
  '/sw.js',
  '/favicon.png',
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
  
  // Temporarily disable i18n routing - just continue with default locale
  return NextResponse.next();
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
