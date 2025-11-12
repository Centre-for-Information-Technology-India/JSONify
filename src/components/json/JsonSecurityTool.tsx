"use client";

import { useState, useContext } from "react";
import { ShieldAlert, ShieldCheck, Wand2, Eye, EyeOff, Check, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { JsonContext } from "./JsonTool";
import { secureJson } from "@/ai/flows/secure-json-flow";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export function JsonSecurityTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<{ redactedJson: string; redactedKeys: string[] } | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  
  const jsonContext = useContext(JsonContext);
  const { toast } = useToast();

  const handleScan = async () => {
    if (!jsonContext || jsonContext.validationStatus !== 'success' || !jsonContext.jsonString) {
        toast({
            variant: "destructive",
            title: "Invalid JSON",
            description: "Please provide valid JSON to scan for secrets.",
        });
      return;
    }
    
    setIsLoading(true);
    setScanResult(null);
    try {
      const result = await secureJson({ jsonString: jsonContext.jsonString });
      const formattedResult = {
        redactedJson: JSON.stringify(JSON.parse(result.redactedJsonString), null, 2),
        redactedKeys: result.redactedKeys,
      }
      setScanResult(formattedResult);

    } catch (error) {
      console.error("Failed to scan for secrets:", error);
      toast({
        variant: "destructive",
        title: "Scan Failed",
        description: "Could not scan for secrets. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyRedaction = () => {
    if (scanResult && jsonContext) {
        jsonContext.setJsonString(scanResult.redactedJson);
        toast({
            title: "Redaction Applied",
            description: "Sensitive data has been redacted from the JSON input.",
        });
        setScanResult(null);
    }
  };

  const renderScanResult = () => {
    if (!scanResult) return null;

    if (scanResult.redactedKeys.length === 0) {
        return (
            <Alert variant="default" className="border-green-500/50 text-green-500" role="status" aria-live="polite">
                <ShieldCheck className="h-4 w-4 !text-green-500" aria-hidden="true" />
                <AlertTitle>No Secrets Found</AlertTitle>
                <AlertDescription>
                    The AI scanner did not find any obvious sensitive data.
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="space-y-4">
            <Alert variant="destructive" role="alert" aria-live="assertive">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                <AlertTitle>Potential Secrets Found!</AlertTitle>
                <AlertDescription>
                    Found {scanResult.redactedKeys.length} item(s) that might be sensitive.
                </AlertDescription>
            </Alert>

            <div className="flex flex-wrap gap-2" role="list" aria-label="Detected sensitive keys">
                {scanResult.redactedKeys.map(key => (
                    <Badge key={key} variant="destructive" role="listitem">{key}</Badge>
                ))}
            </div>

            <div className="relative rounded-md bg-muted/30 border p-4 font-code text-sm max-h-48 overflow-y-auto scrollbar-thin">
                <pre><code>{showOriginal ? jsonContext?.jsonString : scanResult.redactedJson}</code></pre>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 min-h-[44px] min-w-[44px] md:h-7 md:w-7" 
                  onClick={() => setShowOriginal(!showOriginal)}
                  aria-label={showOriginal ? "Hide original JSON" : "Show original JSON"}
                >
                    {showOriginal ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                </Button>
            </div>

            <Button 
              onClick={handleApplyRedaction} 
              size="sm"
              className="min-h-[44px] md:min-h-[32px]"
              aria-label="Apply redaction to remove sensitive data from JSON"
            >
                <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                Apply Redaction
            </Button>
        </div>
    );
  }

  return (
    <Card className="flex flex-col h-full border-border/40" role="region" aria-labelledby="security-title">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded" aria-hidden="true">
            <Shield className="h-3.5 w-3.5 text-primary" />
          </div>
          <CardTitle id="security-title" className="text-sm font-semibold">Security</CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground">Detect sensitive data with AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pb-3 flex-grow overflow-auto scrollbar-thin">
        <Button 
          onClick={handleScan} 
          disabled={isLoading || jsonContext?.validationStatus !== 'success'} 
          className="w-full min-h-[44px] md:h-8" 
          size="sm"
          aria-label="Scan JSON for sensitive data using AI"
        >
            <Wand2 className={`mr-1.5 h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span className="text-xs">{isLoading ? "Scanning..." : "Scan with AI"}</span>
        </Button>
        {isLoading && (
            <div className="space-y-2" role="status" aria-label="Scanning in progress">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-8 w-1/4" />
            </div>
        )}

        {scanResult && !isLoading && renderScanResult()}
      </CardContent>
    </Card>
  );
}
