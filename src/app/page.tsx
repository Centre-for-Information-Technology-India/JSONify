import { JsonTool } from '@/components/json/JsonTool';
import { JsonConverter } from '@/components/json/JsonConverter';
import { JsonSecurityTool } from '@/components/json/JsonSecurityTool';
import { JsonPerformanceAnalyzer } from '@/components/json/JsonPerformanceAnalyzer';
import { Header } from '@/components/layout/Header';

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto scrollbar-thin" role="main">
        <div className="max-w-[1600px] mx-auto p-4 md:p-6 pb-8 space-y-4 md:space-y-6">
          {/* Hidden SEO content */}
          <div className="sr-only">
            <h1>JSONify - Free Online JSON Formatter, Validator, and Converter</h1>
            <p>
              Professional JSON editor and validator with AI-powered error detection. 
              Format, validate, minify, and convert JSON to YAML, XML, or TOML. 
              Free online tool for developers with security scanning and performance analysis.
            </p>
          </div>

          <section aria-label="JSON Editor">
            <JsonTool />
          </section>
          
          <section aria-label="JSON Tools" id="tools" className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-4">
            <JsonConverter />
            <JsonSecurityTool />
            <JsonPerformanceAnalyzer />
          </section>
        </div>
      </main>
    </div>
  );
}
