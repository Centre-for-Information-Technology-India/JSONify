import { JsonTool } from '@/components/json/JsonTool';
import { JsonConverter } from '@/components/json/JsonConverter';
import { JsonSecurityTool } from '@/components/json/JsonSecurityTool';
import { JsonPerformanceAnalyzer } from '@/components/json/JsonPerformanceAnalyzer';
import { AppLayout } from '@/components/layout/AppLayout';
import { AppLayoutSidebar } from "@/components/layout/AppLayoutSidebar";
import { AppLayoutMain } from "@/components/layout/AppLayoutMain";
import { FileJson, Shield, Gauge } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/layout/Header';

export default function Home() {
  return (
    <AppLayout>
      <AppLayoutSidebar>
        <div className="flex flex-col h-full p-4 gap-6">
          <div className="flex items-center gap-2">
            <FileJson className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">JSON Tools</h2>
          </div>
          <JsonConverter />
          <Separator />
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          <JsonSecurityTool />
           <Separator />
           <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Performance</h2>
          </div>
          <JsonPerformanceAnalyzer />
        </div>
      </AppLayoutSidebar>
      <AppLayoutMain>
        <div data-layout="header">
          <Header />
        </div>
        <JsonTool />
      </AppLayoutMain>
    </AppLayout>
  );
}
