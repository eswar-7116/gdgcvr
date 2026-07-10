"use client";

import Link from "next/link";
import { ArrowLeft, PenLine } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { BlogPost } from "@/data/blogData";

interface BlogPostClientProps {
  post: BlogPost;
  content: string;
}

const BlogPostClient = ({ post, content }: BlogPostClientProps) => {
  return (
    <>
      <section className="section-padding relative min-h-screen">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 md:mb-12"
              >
                <ArrowLeft size={16} />
                Back to Blogs
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="mb-10 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground border-b border-border/40 pb-8">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full bg-${post.color}`} />
                    <span className="font-semibold text-foreground uppercase tracking-wider text-xs">
                      {post.topic}
                    </span>
                  </div>
                  <span className="text-border">•</span>
                  <span className="font-medium text-foreground">{post.author}</span>
                  <span className="text-border">•</span>
                  <time>{post.date}</time>
                  <span className="text-border">•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </AnimatedSection>

            <article>
              <AnimatedSection delay={0.2}>
                <MarkdownRenderer content={content} />
              </AnimatedSection>
            </article>

            <AnimatedSection delay={0.3}>
              <div className="mt-16 pt-10 border-t border-border/40 flex items-center justify-between">
                <p className="text-muted-foreground text-sm">
                  Want to share your knowledge?
                </p>
                <Link
                  href="/blog/request"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-all shadow-lift hover:shadow-lift-lg"
                >
                  <PenLine size={14} />
                  Request a Blog
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPostClient;
