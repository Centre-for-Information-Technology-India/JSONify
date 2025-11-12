import { JsonTool } from '@/components/json/JsonTool';
import { JsonConverter } from '@/components/json/JsonConverter';
import { JsonSecurityTool } from '@/components/json/JsonSecurityTool';
import { JsonPerformanceAnalyzer } from '@/components/json/JsonPerformanceAnalyzer';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/layout/Hero';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <Header />
      <Hero />
      <main id="main-content" className="flex-1" role="main">
        <div className="max-w-[1600px] mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
          {/* Hidden SEO content */}
          <div className="sr-only">
            <h1>JSONify - Free Online JSON Formatter, Validator, and Converter</h1>
            <p>
              Professional JSON editor and validator with AI-powered error detection. 
              Format, validate, minify, and convert JSON to YAML, XML, or TOML. 
              Free online tool for developers with security scanning and performance analysis.
            </p>
          </div>

          <section aria-labelledby="json-editor-title">
            <h2 id="json-editor-title" className="sr-only">JSON Editor</h2>
            <JsonTool />
          </section>
          
          <section aria-labelledby="json-tools-title" id="tools" className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-8">
            <h2 id="json-tools-title" className="sr-only">JSON Tools</h2>
            <JsonConverter />
            <JsonSecurityTool />
            <JsonPerformanceAnalyzer />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
