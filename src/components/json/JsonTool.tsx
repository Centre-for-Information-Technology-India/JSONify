"use client";

import { useState, createContext, useRef } from "react";
import type { ChangeEvent } from "react";
import { WrapText, Minimize, ShieldCheck, Wand2, CheckCircle, XCircle, Wrench, ListTree, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { explainJsonError, type ExplainJsonErrorOutput } from "@/ai/flows/explain-json-error";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JsonTreeView } from "./JsonTreeView";

type ValidationStatus = "idle" | "success" | "error";
type JsonView = "raw" | "tree";

const initialJson = `{
  "name": "JSONify",
  "version": "1.0.0",
  "description": "A tool to format, validate, and minify JSON.",
  "features": [
    "Format",
    "Validate",
    "Minify",
    "AI Error Explanation"
  ],
  "isAwesome": true,
  "bugs": null,
  "userProfile": {
    "login": "testuser",
    "email": "test@example.com",
    "password": "supersecretpassword123",
    "apiKey": "q9a8s7d6f5g4h3j2k1l0",
    "session_token": "asdasd987a9s8d7a9s8d79a8sd7"
  }
}`;

export const JsonContext = createContext<{
  jsonString: string;
  parsedJson: any;
  validationStatus: ValidationStatus;
  setJsonString: (json: string, skipValidation?: boolean) => void;
} | null>(null);


export function JsonTool() {
  const [jsonString, setJsonStringState] = useState<string>(initialJson);
  const [parsedJson, setParsedJson] = useState<any>(JSON.parse(initialJson));
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>("success");
  const [validationMessage, setValidationMessage] = useState<string>("JSON is valid!");
  const [aiExplanation, setAiExplanation] = useState<ExplainJsonErrorOutput | null>(null);
  const [isAIExplanationLoading, setIsAIExplanationLoading] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<JsonView>("raw");
  const { toast } = useToast();

  const setJsonString = (newJsonString: string, skipValidation = false) => {
    setJsonStringState(newJsonString);
    if (skipValidation) return;

    if (validationStatus !== "idle") {
      setValidationStatus("idle");
      setAiExplanation(null);
    }
    try {
        const parsed = JSON.parse(newJsonString);
        setParsedJson(parsed);
        setValidationStatus("success");
        setValidationMessage("JSON is valid!");
    } catch (error) {
        if (error instanceof Error) {
            setValidationStatus("error");
            setValidationMessage(error.message);
            setParsedJson(null);
        }
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleJsonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJsonString(e.target.value);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload a .json file.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonString(content);
      toast({
        title: "File Loaded",
        description: `${file.name} has been loaded successfully.`,
      });
    };
    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Could not read the file. Please try again.",
      });
    };
    reader.readAsText(file);
    
    // Reset input so same file can be uploaded again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFormat = () => {
    if (!jsonString.trim()) {
        setValidationStatus("error");
        setValidationMessage("JSON input is empty.");
        return;
    }
    try {
      const parsed = JSON.parse(jsonString);
      const formattedJson = JSON.stringify(parsed, null, 2);
      setJsonString(formattedJson);
    } catch (error) {
      if (error instanceof Error) {
        setValidationStatus("error");
        setValidationMessage(error.message);
        setAiExplanation(null);
      }
    }
  };

  const handleMinify = () => {
    if (!jsonString.trim()) {
        setValidationStatus("error");
        setValidationMessage("JSON input is empty.");
        return;
    }
    try {
      const parsed = JSON.parse(jsonString);
      const minifiedJson = JSON.stringify(parsed);
      setJsonString(minifiedJson);
    } catch (error) {
      if (error instanceof Error) {
        setValidationStatus("error");
        setValidationMessage(error.message);
        setAiExplanation(null);
      }
    }
  };

  const handleValidate = () => {
    if (!jsonString.trim()) {
        setValidationStatus("error");
        setValidationMessage("JSON input is empty.");
        return;
    }
    try {
      JSON.parse(jsonString);
      // setJsonString will trigger re-validation, so we just call it.
      setJsonString(jsonString);
    } catch (error) {
        if (error instanceof Error) {
          setValidationStatus("error");
          setValidationMessage(error.message);
          setParsedJson(null);
          setAiExplanation(null);
        }
    }
  };

  const handleExplainError = async () => {
    if (validationStatus !== 'error' || !validationMessage) return;

    setIsAIExplanationLoading(true);
    setAiExplanation(null);
    try {
      const result = await explainJsonError({
        jsonString,
        errorMessage: validationMessage,
      });
      setAiExplanation(result);
    } catch (error) {
      console.error("AI explanation failed:", error);
      setAiExplanation({
        explanation: "Failed to get an explanation from the AI.",
        suggestedFix: "Please check your connection or try again later.",
      });
    } finally {
      setIsAIExplanationLoading(false);
    }
  };

  const handleApplyFix = () => {
    if (aiExplanation?.suggestedFix) {
      const fixedJsonString = aiExplanation.suggestedFix;
      setJsonString(fixedJsonString);
      setAiExplanation(null);
      toast({
        title: "Fix Applied",
        description: "The suggested fix has been applied to the JSON input.",
      })
    }
  };

  return (
    <JsonContext.Provider value={{ jsonString, parsedJson, validationStatus, setJsonString }}>
      <div className="flex flex-col gap-4">
        {/* Toolbar */}
        <Card className="border-border/40">
          <CardContent className="p-3 md:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${validationStatus === 'success' ? 'bg-green-500' : validationStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                  <span className="text-xs md:text-sm font-medium text-muted-foreground">
                    {validationStatus === 'success' ? 'Valid JSON' : validationStatus === 'error' ? 'Invalid JSON' : 'Ready'}
                  </span>
                </div>
                <div className="h-4 w-px bg-border mx-2" />
                <span className="text-xs text-muted-foreground">
                  {jsonString.length.toLocaleString()} characters
                </span>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                  aria-label="Upload JSON file"
                />
                <Button variant="outline" size="sm" onClick={handleUploadClick} className="flex-1 sm:flex-none h-8">
                    <Upload className="mr-1.5 h-3.5 w-3.5" />
                    <span className="text-xs">Upload</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleFormat} disabled={!jsonString || activeView === 'tree'} className="flex-1 sm:flex-none h-8">
                    <WrapText className="mr-1.5 h-3.5 w-3.5" />
                    <span className="text-xs">Format</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleMinify} disabled={!jsonString || activeView === 'tree'} className="flex-1 sm:flex-none h-8">
                    <Minimize className="mr-1.5 h-3.5 w-3.5" />
                    <span className="text-xs">Minify</span>
                </Button>
                <Button size="sm" onClick={handleValidate} disabled={!jsonString} className="flex-1 sm:flex-none h-8">
                    <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                    <span className="text-xs">Validate</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Editor */}
        <Card className="flex flex-col border-border/40 shadow-lg">
          <CardContent className="p-0 flex-grow flex flex-col">
              <Tabs value={activeView} onValueChange={(value) => setActiveView(value as JsonView)} className="flex-grow flex flex-col">
                <div className="border-b border-border/40 bg-muted/30 px-4 py-2">
                  <TabsList className="h-8 bg-background/50">
                      <TabsTrigger value="raw" className="text-xs data-[state=active]:bg-background">
                        <WrapText className="mr-1.5 h-3.5 w-3.5" /> Editor
                      </TabsTrigger>
                      <TabsTrigger value="tree" disabled={validationStatus === 'error'} className="text-xs data-[state=active]:bg-background">
                        <ListTree className="mr-1.5 h-3.5 w-3.5" /> Tree View
                      </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="raw" className="mt-0 data-[state=active]:block h-[600px]">
                    <Textarea
                      value={jsonString}
                      onChange={handleJsonChange}
                      placeholder="Paste your JSON here or upload a file..."
                      className="w-full h-full font-code text-sm leading-relaxed resize-none bg-muted/20 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 p-4 md:p-6"
                      aria-label="JSON Input"
                      spellCheck={false}
                    />
                </TabsContent>
                <TabsContent value="tree" className="mt-0 overflow-auto p-4 md:p-6 bg-muted/20 h-[600px]">
                    <JsonTreeView data={parsedJson} />
                </TabsContent>
              </Tabs>
          </CardContent>
        </Card>

        {validationStatus === "success" && (
            <Alert variant="default" className="border-green-500/50 text-green-500">
                <CheckCircle className="h-4 w-4 !text-green-500" />
                <AlertTitle className="text-sm md:text-base">JSON is valid!</AlertTitle>
                <AlertDescription className="text-xs md:text-sm">No syntax errors detected.</AlertDescription>
            </Alert>
        )}

        {validationStatus === "error" && (
          <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle className="text-sm md:text-base">Validation Error</AlertTitle>
              <AlertDescription className="font-code break-words text-xs md:text-sm">{validationMessage}</AlertDescription>
              <div className="mt-3">
                <Button onClick={handleExplainError} disabled={isAIExplanationLoading} size="sm">
                    <Wand2 className="mr-1.5 h-4 w-4" />
                    <span className="text-xs md:text-sm">{isAIExplanationLoading ? "Thinking..." : "Explain with AI"}</span>
                </Button>
              </div>
          </Alert>
        )}

        {isAIExplanationLoading && (
          <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">AI Explanation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="pt-4 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
          </Card>
        )}

        {aiExplanation && !isAIExplanationLoading && (
          <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary text-base md:text-lg">
                    <Wand2 className="h-4 w-4 md:h-5 md:w-5" />
                    AI-Powered Explanation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">The Problem</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{aiExplanation.explanation}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Suggested Fix</h3>
                    <div className="font-code bg-muted p-3 rounded-md break-words text-xs md:text-sm text-muted-foreground overflow-x-auto">
                      <pre><code>{aiExplanation.suggestedFix}</code></pre>
                    </div>
                </div>
                <div className="pt-2">
                    <Button onClick={handleApplyFix} size="sm">
                      <Wrench className="mr-1.5 h-4 w-4" />
                      <span className="text-xs md:text-sm">Apply Fix</span>
                    </Button>
                </div>
              </CardContent>
          </Card>
        )}
    </div>
  </JsonContext.Provider>
  );
}
