"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { WrapText, Minimize, ShieldCheck, Wand2, CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { explainJsonError, type ExplainJsonErrorOutput } from "@/ai/flows/explain-json-error";

type ValidationStatus = "idle" | "success" | "error";

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
  "bugs": null
}`;

export function JsonTool() {
  const [jsonString, setJsonString] = useState<string>(initialJson);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>("idle");
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [aiExplanation, setAiExplanation] = useState<ExplainJsonErrorOutput | null>(null);
  const [isAIExplanationLoading, setIsAIExplanationLoading] = useState<boolean>(false);

  const handleJsonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJsonString(e.target.value);
    if (validationStatus !== "idle") {
      setValidationStatus("idle");
      setAiExplanation(null);
    }
  };

  const handleFormat = () => {
    if (!jsonString.trim()) {
        setValidationStatus("error");
        setValidationMessage("JSON input is empty.");
        return;
    }
    try {
      const parsed = JSON.parse(jsonString);
      setJsonString(JSON.stringify(parsed, null, 2));
      setValidationStatus("success");
      setValidationMessage("JSON formatted successfully.");
      setAiExplanation(null);
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
      setJsonString(JSON.stringify(parsed));
      setValidationStatus("success");
      setValidationMessage("JSON minified successfully.");
      setAiExplanation(null);
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
      setValidationStatus("success");
      setValidationMessage("JSON is valid!");
      setAiExplanation(null);
    } catch (error) {
      if (error instanceof Error) {
        setValidationStatus("error");
        setValidationMessage(error.message);
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
      <Card className="lg:col-span-1 h-full flex flex-col">
        <CardHeader className="flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>JSON Input</CardTitle>
            <CardDescription>Paste your JSON code below.</CardDescription>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleFormat} disabled={!jsonString}>
              <WrapText className="mr-2 h-4 w-4" />
              Format
            </Button>
            <Button variant="outline" size="sm" onClick={handleMinify} disabled={!jsonString}>
              <Minimize className="mr-2 h-4 w-4" />
              Minify
            </Button>
            <Button size="sm" onClick={handleValidate} disabled={!jsonString}>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Validate
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <Textarea
            value={jsonString}
            onChange={handleJsonChange}
            placeholder="Enter your JSON here..."
            className="w-full h-[60vh] font-code text-sm resize-none bg-background"
            aria-label="JSON Input"
          />
        </CardContent>
      </Card>

      <div className="lg:col-span-1 space-y-6">
        {validationStatus === "idle" && (
          <Card className="flex items-center justify-center h-full min-h-[200px] border-dashed">
            <div className="text-center text-muted-foreground p-8">
              <ShieldCheck className="mx-auto h-12 w-12" />
              <p className="mt-4 font-medium">Ready to Validate</p>
              <p className="mt-1 text-sm">Results of your JSON operations will appear here.</p>
            </div>
          </Card>
        )}
        {validationStatus === "success" && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>{validationMessage}</AlertDescription>
          </Alert>
        )}
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
                <p className="text-sm text-muted-foreground font-code bg-muted p-3 rounded-md break-words">{aiExplanation.suggestedFix}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
