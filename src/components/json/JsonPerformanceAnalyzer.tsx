"use client";

import { useContext, useMemo } from "react";
import { Zap, GaugeCircle, FileText } from "lucide-react";
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
                <p>Provide some JSON to analyze its performance.</p>
            </div>
        );
    }
    if (jsonContext.validationStatus !== 'success') {
        return (
            <div className="flex items-center justify-center h-24 text-muted-foreground p-4 text-center">
                <p>Performance analysis requires valid JSON.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <div className="flex items-start gap-4">
                <GaugeCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                    <p className="text-2xl font-bold">{(stats.sizeKB).toFixed(2)} KB</p>
                    <p className="text-sm text-muted-foreground">File Size</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                    <p className="text-2xl font-bold">{stats.tokenCount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Est. Tokens</p>
                </div>
            </div>
            {potentialSaving > 0.01 && (
                 <div className="sm:col-span-2 mt-2 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                    <h4 className="font-semibold text-primary flex items-center gap-2"><Zap className="h-4 w-4" />Optimization Tip</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                        You could save ~<span className="font-bold text-foreground">{potentialSaving.toFixed(2)} KB</span> by minifying this JSON. Less whitespace means faster downloads and lower costs.
                    </p>
                 </div>
            )}
        </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Analyzer</CardTitle>
        <CardDescription>Benchmark your JSON and get optimization tips.</CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
