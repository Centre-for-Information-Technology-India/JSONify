"use client";

import { useContext, useMemo } from "react";
import { Zap, GaugeCircle, FileText, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { JsonContext } from "./JsonTool";

export function JsonPerformanceAnalyzer() {
  const jsonContext = useContext(JsonContext);

  const stats = useMemo(() => {
    if (!jsonContext || !jsonContext.jsonString || jsonContext.validationStatus !== 'success') {
      return { sizeKB: 0, tokenCount: 0 };
    }
    const sizeInBytes = new Blob([jsonContext.jsonString]).size;
    const sizeKB = sizeInBytes / 1024;
    // Rough token estimation: 1 token ~= 4 chars in English
    const tokenCount = Math.ceil(jsonContext.jsonString.length / 4);

    return { sizeKB, tokenCount };
  }, [jsonContext]);

  const minifiedSizeKB = useMemo(() => {
    if (!jsonContext || !jsonContext.parsedJson) return 0;
    const minifiedString = JSON.stringify(jsonContext.parsedJson);
    return new Blob([minifiedString]).size / 1024;
  }, [jsonContext]);

  const potentialSaving = useMemo(() => {
    const saving = stats.sizeKB - minifiedSizeKB;
    return saving > 0 ? saving : 0;
  }, [stats.sizeKB, minifiedSizeKB]);

  const renderContent = () => {
    if (!jsonContext || !jsonContext.jsonString) {
        return (
            <div className="flex items-center justify-center h-24 text-muted-foreground p-4 text-center">
                <p>Provide JSON to analyze.</p>
            </div>
        );
    }
    if (jsonContext.validationStatus !== 'success') {
        return (
            <div className="flex items-center justify-center h-24 text-muted-foreground p-4 text-center">
                <p>Valid JSON required.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            <div className="flex items-start gap-4">
                <GaugeCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                    <p className="text-xl font-bold" aria-label={`File size: ${(stats.sizeKB).toFixed(2)} kilobytes`}>{(stats.sizeKB).toFixed(2)} KB</p>
                    <p className="text-xs text-muted-foreground">File Size</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                    <p className="text-xl font-bold" aria-label={`Estimated tokens: ${stats.tokenCount.toLocaleString()}`}>{stats.tokenCount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Est. Tokens</p>
                </div>
            </div>
            {potentialSaving > 0.01 && (
                 <div className="mt-2 p-3 bg-primary/5 border border-primary/10 rounded-lg" role="note" aria-label="Optimization suggestion">
                    <h4 className="font-semibold text-primary flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4" aria-hidden="true" />
                      Optimization Tip
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                        You could save ~<span className="font-bold text-foreground">{potentialSaving.toFixed(2)} KB</span> by minifying this JSON.
                    </p>
                 </div>
            )}
        </div>
    );
  }

  return (
    <Card className="flex flex-col h-full border-border/40" role="region" aria-labelledby="performance-title">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded" aria-hidden="true">
            <Gauge className="h-3.5 w-3.5 text-primary" />
          </div>
          <CardTitle id="performance-title" className="text-sm font-semibold">Performance</CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground">Analyze size and optimization</CardDescription>
      </CardHeader>
      <CardContent className="pb-3 flex-grow overflow-auto scrollbar-thin">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
