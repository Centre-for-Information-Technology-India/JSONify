"use client";

import { useState, useContext, useEffect } from "react";
import { Copy, RefreshCw, FileJson } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { JsonContext } from "./JsonTool";
import { convertFormat, type ConvertFormatInput } from "@/ai/flows/convert-format-flow";

type Format = "yaml" | "xml" | "toml";

export function JsonConverter() {
  const [activeTab, setActiveTab] = useState<Format>("yaml");
  const [convertedCode, setConvertedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const jsonContext = useContext(JsonContext);
  const { toast } = useToast();

  const handleConversion = async (format: Format) => {
    if (!jsonContext || jsonContext.validationStatus !== 'success' || !jsonContext.jsonString) {
      setConvertedCode("");
      return;
    }
    
    setIsLoading(true);
    setConvertedCode("");
    try {
      const result = await convertFormat({
        jsonString: jsonContext.jsonString,
        targetFormat: format,
      });
      setConvertedCode(result.convertedString);
    } catch (error) {
      console.error(`Failed to convert to ${format}:`, error);
      setConvertedCode(`Error converting to ${format}. Please try again.`);
      toast({
        variant: "destructive",
        title: "Conversion Failed",
        description: `Could not convert JSON to ${format}.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleConversion(activeTab);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonContext?.jsonString, jsonContext?.validationStatus, activeTab]);

  const handleCopyToClipboard = () => {
    if (convertedCode) {
      navigator.clipboard.writeText(convertedCode);
      toast({
        title: "Copied to Clipboard",
        description: `${activeTab.toUpperCase()} code has been copied.`,
      });
    }
  };

  const renderContent = () => {
    if (jsonContext?.validationStatus !== 'success') {
      return (
          <div className="flex items-center justify-center h-full text-muted-foreground p-4 text-center">
              <p>Valid JSON required.</p>
          </div>
      );
    }

    if (isLoading) {
      return (
        <div className="p-4 space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
        </div>
      );
    }

    return (
      <Textarea
        readOnly
        value={convertedCode}
        className="w-full h-full font-code text-xs md:text-sm resize-none bg-muted/20 border-0 focus-visible:ring-0 scrollbar-thin"
        placeholder={`Converted ${activeTab.toUpperCase()} will appear here...`}
        aria-label={`Converted ${activeTab.toUpperCase()} code`}
      />
    );
  };
  
  return (
    <Card className="flex flex-col h-full border-border/40" role="region" aria-labelledby="converter-title">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded" aria-hidden="true">
                <FileJson className="h-3.5 w-3.5 text-primary" />
              </div>
              <CardTitle id="converter-title" className="text-sm font-semibold">Converter</CardTitle>
            </div>
            <div className="flex gap-1" role="toolbar" aria-label="Converter actions">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="min-h-[44px] min-w-[44px] md:h-7 md:w-7" 
                  onClick={() => handleConversion(activeTab)} 
                  disabled={isLoading || jsonContext?.validationStatus !== 'success'} 
                  aria-label="Refresh conversion"
                >
                    <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="min-h-[44px] min-w-[44px] md:h-7 md:w-7" 
                  onClick={handleCopyToClipboard} 
                  disabled={!convertedCode || isLoading} 
                  aria-label="Copy converted code to clipboard"
                >
                    <Copy className="h-3 w-3" aria-hidden="true" />
                </Button>
            </div>
        </div>
        <CardDescription className="text-xs text-muted-foreground">Convert to YAML, XML, or TOML</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col pb-3 min-h-0">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as Format)}
          className="flex-grow flex flex-col min-h-0"
        >
          <TabsList className="grid w-full grid-cols-3 h-9 mb-2" aria-label="Output format selection">
            <TabsTrigger value="yaml" className="text-xs min-h-[44px] md:min-h-0">YAML</TabsTrigger>
            <TabsTrigger value="xml" className="text-xs min-h-[44px] md:min-h-0">XML</TabsTrigger>
            <TabsTrigger value="toml" className="text-xs min-h-[44px] md:min-h-0">TOML</TabsTrigger>
          </TabsList>
          <div 
            className="flex-grow rounded-md bg-muted/30 border border-border/40 data-[status=invalid]:flex data-[status=invalid]:items-center data-[status=invalid]:justify-center min-h-[200px] overflow-auto scrollbar-thin" 
            data-status={jsonContext?.validationStatus !== 'success' ? 'invalid' : 'valid'}
            role="region"
            aria-label={`Converted ${activeTab.toUpperCase()} output`}
          >
            {renderContent()}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
