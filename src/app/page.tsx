import { Header } from '@/components/layout/Header';
import { JsonTool } from '@/components/json/JsonTool';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-hidden">
        <JsonTool />
      </main>
    </div>
  );
}
