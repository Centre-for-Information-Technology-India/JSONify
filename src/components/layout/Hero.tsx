"use client";

import { Sparkles, Code, Shield, Zap, FileJson } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Hero() {
  const features = [
    {
      icon: Code,
      title: "Format & Beautify",
      description: "Instantly format and beautify your JSON with proper indentation"
    },
    {
      icon: Shield,
      title: "Validate & Secure",
      description: "Validate JSON syntax and detect sensitive data with AI"
    },
    {
      icon: Zap,
      title: "Convert & Optimize",
      description: "Convert to YAML, XML, TOML and optimize file size"
    },
    {
      icon: FileJson,
      title: "Tree View",
      description: "Visualize JSON structure with interactive tree navigation"
    }
  ];

  return (
    <div className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered JSON Tools</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              JSONify
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A versatile, open-source JSON toolkit for developers. Format, validate, convert, and secure your JSON data with AI-powered features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/40 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors">
              <CardContent className="p-6 space-y-3">
                <div className="p-2 bg-primary/10 rounded-lg w-fit">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
