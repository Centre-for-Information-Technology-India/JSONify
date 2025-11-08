"use client";

import { useState, createContext } from "react";
import type { ChangeEvent } from "react";
import { WrapText, Minimize, ShieldCheck, Wand2, CheckCircle, XCircle, Wrench, ListTree } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { explainJsonError, type ExplainJsonErrorOutput } from "@/ai/flows/explain-json-error";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JsonTreeView } from "./JsonTreeView";
import { JsonConverter } from "./JsonConverter";
import { JsonSecurityTool } from "./JsonSecurityTool";
import { JsonPerformanceAnalyzer } from "./JsonPerformanceAnalyzer";

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

  const handleJsonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJsonString(e.target.value);
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mx-auto h-full">
        <div className="lg:col-span-1 flex flex-col gap-6">
            <Card className="h-full flex flex-col">
            <CardHeader className="flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                <CardTitle>JSON Input</CardTitle>
                <CardDescription>Paste your JSON code below.</CardDescription>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={handleFormat} disabled={!jsonString || activeView === 'tree'}>
                    <WrapText className="mr-2 h-4 w-4" />
                    Format
                </Button>
                <Button variant="outline" size="sm" onClick={handleMinify} disabled={!jsonString || activeView === 'tree'}>
                    <Minimize className="mr-2 h-4 w-4" />
                    Minify
                </Button>
                <Button size="sm" onClick={handleValidate} disabled={!jsonString}>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Validate
                </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <Tabs value={activeView} onValueChange={(value) => setActiveView(value as JsonView)} className="flex-grow flex flex-col">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="raw">
                    <WrapText className="mr-2 h-4 w-4" /> Raw
                    </TabsTrigger>
                    <TabsTrigger value="tree" disabled={validationStatus === 'error'}>
                    <ListTree className="mr-2 h-4 w-4" /> Tree View
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="raw" className="flex-grow mt-4">
                    <Textarea
                    value={jsonString}
                    onChange={handleJsonChange}
                    placeholder="Enter your JSON here..."
                    className="w-full h-full font-code text-sm resize-none bg-background"
                    aria-label="JSON Input"
                    />
                </TabsContent>
                <TabsContent value="tree" className="flex-grow mt-4 h-full">
                    <JsonTreeView data={parsedJson} />
                </TabsContent>
                </Tabs>
            </CardContent>
            </Card>

            {validationStatus === "error" && (
            <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Validation Error</AlertTitle>
                <AlertDescription className="font-code break-words">{validationMessage}</AlertDescription>
                <div className="mt-4">
                <Button onClick={handleExplainError} disabled={isAIExplanationLoading}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isAIExplanationLoading ? "Thinking..." : "Explain with AI"}
                </Button>
                </div>
            </Alert>
            )}

            {isAIExplanationLoading && (
            <Card>
                <CardHeader>
                <CardTitle>AI Explanation</CardTitle>
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
                <CardTitle className="flex items-center gap-2 text-primary">
                    <Wand2 className="h-5 w-5" />
                    AI-Powered Explanation
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-foreground mb-2">The Problem</h3>
                    <p className="text-sm text-muted-foreground">{aiExplanation.explanation}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-foreground mb-2">Suggested Fix</h3>
                    <div className="font-code bg-muted p-3 rounded-md break-words text-sm text-muted-foreground">
                    <pre><code>{aiExplanation.suggestedFix}</code></pre>
                    </div>
                </div>
                <div className="pt-2">
                    <Button onClick={handleApplyFix} size="sm">
                    <Wrench className="mr-2 h-4 w-4" />
                    Apply Fix
                    </Button>
                </div>
                </CardContent>
            </Card>
            )}
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
            <JsonConverter />
            <JsonSecurityTool />
            <JsonPerformanceAnalyzer />
        </div>
      </div>
    </JsonContext.Provider>
  );
}
