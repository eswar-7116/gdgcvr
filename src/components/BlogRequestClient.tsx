"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import {
  Send,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Code,
  Link as LinkIcon,
  ImagePlus,
  List,
  ListOrdered,
  SquareCode,
  Eye,
  Pencil,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import MarkdownRenderer from "@/components/MarkdownRenderer";

type ToolbarAction = {
  icon: React.ReactNode;
  label: string;
  action: () => void;
};

type UploadedImage = {
  id: string;
  file: File;
  objectUrl: string;
};

const BlogRequestClient = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resolve upload:// URLs to object URLs for the preview
  const previewMarkdown = useMemo(() => {
    let resolved = markdown;
    for (const img of uploadedImages) {
      // Replace all occurrences of upload://id with the object URL
      resolved = resolved.split(`upload://${img.id}`).join(img.objectUrl);
    }
    return resolved;
  }, [markdown, uploadedImages]);

  const insertAtCursor = useCallback(
    (before: string, after: string = "", placeholder: string = "") => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = markdown.substring(start, end);
      const textToInsert = selectedText || placeholder;
      const newText =
        markdown.substring(0, start) +
        before +
        textToInsert +
        after +
        markdown.substring(end);

      setMarkdown(newText);

      // Restore cursor position after state update
      requestAnimationFrame(() => {
        textarea.focus();
        const cursorPos = start + before.length + textToInsert.length;
        textarea.setSelectionRange(
          selectedText ? cursorPos + after.length : start + before.length,
          selectedText ? cursorPos + after.length : start + before.length + textToInsert.length,
        );
      });
    },
    [markdown],
  );

  const handleImageUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please select an image file.");
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 3000);
        return;
      }

      // Validate file size (10MB limit per image)
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("Image must be under 10MB.");
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 3000);
        return;
      }

      // Create a unique ID for this image
      const id = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const objectUrl = URL.createObjectURL(file);

      setUploadedImages((prev) => [...prev, { id, file, objectUrl }]);

      // Insert a clean, readable reference in the markdown
      const altText = file.name.replace(/\.[^/.]+$/, "");
      insertAtCursor(`![${altText}](upload://${id})`, "\n\n");

      // Reset input so the same file can be selected again
      e.target.value = "";
    },
    [insertAtCursor],
  );

  const removeImage = useCallback(
    (id: string) => {
      setUploadedImages((prev) => {
        const img = prev.find((i) => i.id === id);
        if (img) URL.revokeObjectURL(img.objectUrl);
        return prev.filter((i) => i.id !== id);
      });
      // Remove the markdown reference
      setMarkdown((prev) => {
        // Remove ![any alt](upload://id) and surrounding whitespace
        const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return prev.replace(new RegExp(`!\\[[^\\]]*\\]\\(upload://${escapedId}\\)\\s*`, "g"), "");
      });
    },
    [],
  );

  const toolbarActions: ToolbarAction[] = [
    {
      icon: <Heading1 size={16} />,
      label: "Heading 1",
      action: () => insertAtCursor("\n# ", "\n", "Heading"),
    },
    {
      icon: <Heading2 size={16} />,
      label: "Heading 2",
      action: () => insertAtCursor("\n## ", "\n", "Heading"),
    },
    {
      icon: <Heading3 size={16} />,
      label: "Heading 3",
      action: () => insertAtCursor("\n### ", "\n", "Heading"),
    },
    {
      icon: <Bold size={16} />,
      label: "Bold",
      action: () => insertAtCursor("**", "**", "bold text"),
    },
    {
      icon: <Italic size={16} />,
      label: "Italic",
      action: () => insertAtCursor("*", "*", "italic text"),
    },
    {
      icon: <Code size={16} />,
      label: "Inline Code",
      action: () => insertAtCursor("`", "`", "code"),
    },
    {
      icon: <SquareCode size={16} />,
      label: "Code Block",
      action: () =>
        insertAtCursor("\n```javascript\n", "\n```\n", "// your code here"),
    },
    {
      icon: <LinkIcon size={16} />,
      label: "Link",
      action: () => insertAtCursor("[", "](https://)", "link text"),
    },
    {
      icon: <ImagePlus size={16} />,
      label: "Image",
      action: handleImageUpload,
    },
    {
      icon: <List size={16} />,
      label: "Bullet List",
      action: () => insertAtCursor("\n- ", "\n", "list item"),
    },
    {
      icon: <ListOrdered size={16} />,
      label: "Numbered List",
      action: () => insertAtCursor("\n1. ", "\n", "list item"),
    },
  ];

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim() || !topic.trim() || !markdown.trim()) {
      setErrorMessage("Please fill in all fields.");
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Build FormData with the markdown and image files
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("topic", topic);
      formData.append("markdown", markdown);

      // Attach all uploaded images with their IDs as keys
      for (const img of uploadedImages) {
        formData.append(`image:${img.id}`, img.file, img.file.name);
      }

      const response = await fetch("/api/blog-request", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit");
      }

      setSubmitStatus("success");

      // Cleanup object URLs
      for (const img of uploadedImages) {
        URL.revokeObjectURL(img.objectUrl);
      }

      setTitle("");
      setAuthor("");
      setTopic("");
      setMarkdown("");
      setUploadedImages([]);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-28 relative min-h-screen">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <AnimatedSection>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-google-blue mb-6">
                Submit a Blog
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Request a Blog Post
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Write your blog content below. The preview shows exactly how it
                will look when published.
              </p>
            </div>
          </AnimatedSection>

          {/* Metadata Fields */}
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="space-y-2">
                <label
                  htmlFor="blog-title"
                  className="text-sm font-medium text-foreground"
                >
                  Title
                </label>
                <input
                  id="blog-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Blog Title"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-google-blue/30 focus:border-google-blue transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="blog-author"
                  className="text-sm font-medium text-foreground"
                >
                  Author
                </label>
                <input
                  id="blog-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-google-blue/30 focus:border-google-blue transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="blog-topic"
                  className="text-sm font-medium text-foreground"
                >
                  Topic
                </label>
                <input
                  id="blog-topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Backend and Cloud"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-google-blue/30 focus:border-google-blue transition-all text-sm"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Editor */}
          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-lift">
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-2">
                <div className="flex items-center gap-0.5 py-2 overflow-x-auto">
                  {toolbarActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={action.action}
                      title={action.label}
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all duration-150 flex-shrink-0"
                    >
                      {action.icon}
                    </button>
                  ))}
                </div>

                {/* Write/Preview toggle — mobile only */}
                <div className="flex items-center gap-1 md:hidden">
                  <button
                    onClick={() => setActiveTab("write")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeTab === "write"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Pencil size={12} />
                    Write
                  </button>
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeTab === "preview"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Eye size={12} />
                    Preview
                  </button>
                </div>
              </div>

              {/* Editor / Preview Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] md:min-h-[600px]">
                {/* Textarea */}
                <div
                  className={`relative border-r border-border ${
                    activeTab !== "write" ? "hidden md:block" : ""
                  }`}
                >
                  <div className="absolute top-3 left-4 flex items-center gap-1.5 text-xs text-muted-foreground/60 pointer-events-none">
                    <Pencil size={10} />
                    <span>Markdown</span>
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Start writing your blog post in markdown...

## Getting Started

Write your content here. Use the toolbar above to format text, add headings, code blocks, images, and more.

**Bold text**, *italic text*, `inline code`

```javascript
const hello = 'world';
```

- Bullet point
- Another point"
                    className="w-full h-full min-h-[500px] md:min-h-[600px] p-4 pt-9 bg-background text-foreground font-mono text-sm leading-relaxed resize-none focus:outline-none placeholder:text-muted-foreground/30"
                    spellCheck={false}
                  />
                </div>

                {/* Preview */}
                <div
                  className={`overflow-y-auto bg-background ${
                    activeTab !== "preview" ? "hidden md:block" : ""
                  }`}
                >
                  <div className="sticky top-0 z-10 px-4 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                      <Eye size={10} />
                      <span>Preview</span>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    {markdown.trim() ? (
                      <MarkdownRenderer content={previewMarkdown} />
                    ) : (
                      <div className="flex items-center justify-center h-full min-h-[400px] text-muted-foreground/30 text-sm">
                        Your preview will appear here...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Uploaded Images Strip */}
          {uploadedImages.length > 0 && (
            <AnimatedSection delay={0}>
              <div className="mt-4 p-4 rounded-xl border border-border bg-card">
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                  Attached Images ({uploadedImages.length})
                </p>
                <div className="flex flex-wrap gap-3">
                  {uploadedImages.map((img) => (
                    <div
                      key={img.id}
                      className="group relative w-20 h-20 rounded-lg overflow-hidden border border-border bg-muted"
                    >
                      <img
                        src={img.objectUrl}
                        alt={img.file.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <X size={16} className="text-white" />
                      </button>
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 px-1 py-0.5">
                        <p className="text-[9px] text-white truncate">
                          {img.file.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Submit */}
          <AnimatedSection delay={0.3}>
            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 min-h-[2rem]">
                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 text-sm text-green-600 animate-fade-in">
                    <CheckCircle2 size={16} />
                    <span>Blog request submitted successfully!</span>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-foreground text-background font-medium text-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lift hover:shadow-lift-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    Submit Blog Request
                  </>
                )}
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </section>
  );
};

export default BlogRequestClient;
