import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const SITE_URL = 'https://jsonify.cit.org.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'JSONify | Advanced JSON Formatter, Validator, and Minifier',
    template: `%s | JSONify`,
  },
  description: 'The ultimate free developer utility to format, validate, minify, convert, and secure your JSON data. Supports YAML, XML, TOML conversion and AI-powered error analysis.',
  keywords: ['JSON', 'formatter', 'validator', 'beautifier', 'minifier', 'lint', 'JSON tool', 'developer tool', 'YAML', 'XML', 'TOML', 'converter', 'JSON schema'],
  authors: [{ name: 'JSONify Team', url: SITE_URL }],
  creator: 'JSONify Team',
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'JSONify | Advanced JSON Toolkit',
    description: 'The ultimate free developer utility for all your JSON needs.',
    url: SITE_URL,
    siteName: 'JSONify',
    images: [
      {
        url: '/og-image.png', // It's good practice to have an OG image
        width: 1200,
        height: 630,
        alt: 'JSONify Logo and Title',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSONify | Advanced JSON Toolkit',
    description: 'The ultimate free developer utility for all your JSON needs.',
    // creator: '@yourtwitterhandle', // Add your twitter handle here if you have one
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: '#121212',
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": SITE_URL,
  "name": "JSONify",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body antialiased bg-background overflow-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
