"use client";

import { useState } from "react";

import { Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden bg-[#1E1E1E]">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-2 rounded-lg bg-background/20 hover:bg-background/40 text-muted-foreground hover:text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/10 z-10"
        aria-label="Copy code"
      >
        {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        PreTag="div"
        customStyle={{ margin: 0, padding: "1.5rem 1rem", background: "transparent", fontSize: "0.875rem" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({ content, className = "" }: MarkdownRendererProps) => {
  const firstImageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  const firstImageUrl = firstImageMatch ? firstImageMatch[1] : null;

  return (
    <div className={`prose prose-lg md:prose-xl dark:prose-invert max-w-none text-muted-foreground ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        urlTransform={(url) => {
          // Allow blob: URLs (used for image preview via URL.createObjectURL)
          if (url.startsWith("blob:")) return url;
          // For everything else, use default behavior (allow http, https, mailto, tel)
          const safeProtocols = /^(https?|mailto|tel):/i;
          const colon = url.indexOf(":");
          if (colon === -1 || url.indexOf("/") < colon) return url; // relative URL
          return safeProtocols.test(url) ? url : "";
        }}
        components={{
          img: ({ src, alt }) => {
            if (!src) return null;
            const isFirst = src === firstImageUrl;
            return (
              <span className="flex justify-center w-full my-10">
                <img
                  src={src}
                  alt={alt || ""}
                  className="max-w-full h-auto rounded-xl border border-border/40"
                  {...(isFirst ? { fetchPriority: "high" } : { loading: "lazy" })}
                />
              </span>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-4xl md:text-5xl font-bold mt-14 mb-8 text-foreground tracking-tight leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold mt-10 mb-4 text-foreground tracking-tight">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-8 leading-relaxed text-[1.125rem] md:text-[1.25rem] text-foreground/90 font-serif">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-6 mb-8 space-y-3 text-[1.125rem] md:text-[1.25rem] text-foreground/90 font-serif">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 mb-8 space-y-3 text-[1.125rem] md:text-[1.25rem] text-foreground/90 font-serif">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-foreground underline decoration-border hover:decoration-foreground underline-offset-4 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          code: ({ className, children, node, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const codeContent = String(children).replace(/\n$/, "");
            const hasNewline = String(children).includes("\n");

            if (match || hasNewline) {
              return (
                <CodeBlock
                  code={codeContent}
                  language={match?.[1] || "text"}
                />
              );
            }

            return (
              <code
                className="font-bold bg-muted/50 px-1.5 py-0.5 rounded-md text-[0.9em]"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
