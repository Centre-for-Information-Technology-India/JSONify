import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const SITE_URL = 'https://jsonify.cit.org.in';
const SITE_NAME = 'JSONify';
const SITE_DESCRIPTION = 'Free online JSON formatter, validator, and converter. Format, validate, minify JSON with AI-powered error detection. Convert JSON to YAML, XML, TOML. Professional developer tool with security scanning and performance analysis.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'JSONify - Free Online JSON Formatter, Validator & Converter Tool',
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'JSON formatter',
    'JSON validator',
    'JSON beautifier',
    'JSON minifier',
    'JSON to YAML',
    'JSON to XML',
    'JSON to TOML',
    'JSON converter',
    'JSON parser',
    'JSON editor online',
    'JSON lint',
    'format JSON',
    'validate JSON',
    'JSON tool',
    'JSON viewer',
    'JSON tree view',
    'JSON security scanner',
    'JSON performance analyzer',
    'free JSON tool',
    'online JSON editor',
    'JSON syntax checker',
    'JSON error finder',
    'AI JSON validator',
    'developer tools',
    'web developer tools',
    'API testing tool',
    'JSON schema validator'
  ],
  authors: [
    { name: 'Centre for Information Technology India', url: 'https://cit.org.in' },
    { name: 'JSONify Team', url: SITE_URL }
  ],
  creator: 'Centre for Information Technology India',
  publisher: 'Centre for Information Technology India',
  category: 'Technology',
  classification: 'Developer Tools',
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'JSONify - Free Online JSON Formatter, Validator & Converter',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JSONify - Professional JSON Editor and Validator',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSONify - Free Online JSON Formatter & Validator',
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
    creator: '@CIT_India',
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  other: {
    'application-name': SITE_NAME,
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SITE_NAME,
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  themeColor: '#121212',
};

// Enhanced structured data for better SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": SITE_NAME,
      "description": SITE_DESCRIPTION,
      "publisher": {
        "@id": `${SITE_URL}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_URL}?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Centre for Information Technology India",
      "url": "https://cit.org.in",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`,
        "width": 512,
        "height": 512
      },
      "sameAs": [
        "https://github.com/Centre-for-Information-Technology-India"
      ]
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#webapp`,
      "name": SITE_NAME,
      "url": SITE_URL,
      "description": SITE_DESCRIPTION,
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "JSON Formatting and Beautification",
        "JSON Validation and Error Detection",
        "JSON Minification",
        "Convert JSON to YAML, XML, TOML",
        "AI-Powered Error Explanation",
        "Security Scanner for Sensitive Data",
        "Performance Analysis",
        "Tree View Visualization",
        "File Upload Support",
        "Offline PWA Support"
      ],
      "screenshot": `${SITE_URL}/screenshot.png`,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1250",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": SITE_NAME,
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1250"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": SITE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "JSON Tools",
          "item": `${SITE_URL}/#tools`
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body antialiased bg-background h-full overflow-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
