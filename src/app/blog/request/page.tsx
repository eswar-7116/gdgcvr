import { Metadata } from "next";
import BlogRequestClient from "@/components/BlogRequestClient";

export const metadata: Metadata = {
  title: "GDG CVR - Submit a Blog Post",
  description:
    "Submit a blog post request to GDG on Campus CVR College of Engineering. Write your blog in markdown and preview it live.",
};

export default function BlogRequestPage() {
  return <BlogRequestClient />;
}
