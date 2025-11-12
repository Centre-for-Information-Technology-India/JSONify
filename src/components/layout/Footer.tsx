"use client";

import { Sparkles, Github, AlertCircle, GitPullRequest, Building2, FileText, Shield } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold">JSONify</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A versatile, open-source JSON toolkit for developers and security professionals.
            </p>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://github.com/Centre-for-Information-Technology-India/JSONify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Centre-for-Information-Technology-India/JSONify/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4" />
                  Report Issues
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Centre-for-Information-Technology-India/JSONify/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <GitPullRequest className="h-4 w-4" />
                  Contribute
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="https://github.com/Centre-for-Information-Technology-India/JSONify/blob/main/CODE_OF_CONDUCT.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Centre-for-Information-Technology-India/JSONify/blob/main/SECURITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Organization */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Organization</h3>
            <div className="space-y-3">
              <a
                href="https://cit.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Building2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium group-hover:text-primary">
                    Centre for Information Technology (India)
                  </div>
                  <div className="text-xs mt-1">Building tools for a secure digital future</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © {currentYear} Centre for Information Technology (India). All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
