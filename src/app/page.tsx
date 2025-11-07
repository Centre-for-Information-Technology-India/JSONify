import { Header } from '@/components/layout/Header';
import { JsonTool } from '@/components/json/JsonTool';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <JsonTool />
      </main>
    </div>
  );
}
