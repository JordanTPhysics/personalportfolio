import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getAllBlogPosts } from "../blog-data";
import { renderInlineMarkdown } from "@/lib/blog-inline";
import { Metadata } from "next";
import React from "react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Data Driven Outcomes Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Simple markdown-like content rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let currentParagraph: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let currentListItems: string[] = [];
    let isUnorderedList = false;
    let isOrderedList = false;

    const flushList = () => {
      if (currentListItems.length > 0) {
        if (isUnorderedList) {
          elements.push(
            <ul key={`ul-${elements.length}`} className="list-disc ml-6 mb-4 space-y-2">
              {currentListItems.map((item, idx) => (
                <li key={idx} className="text-body">
                  {renderInlineMarkdown(item, `ul-${elements.length}-li-${idx}`)}
                </li>
              ))}
            </ul>
          );
        } else if (isOrderedList) {
          elements.push(
            <ol key={`ol-${elements.length}`} className="list-decimal ml-6 mb-4 space-y-2">
              {currentListItems.map((item, idx) => (
                <li key={idx} className="text-body">
                  {renderInlineMarkdown(item, `ol-${elements.length}-li-${idx}`)}
                </li>
              ))}
            </ol>
          );
        }
        currentListItems = [];
        isUnorderedList = false;
        isOrderedList = false;
      }
    };

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.trimStart().startsWith('```')) {
        flushList();
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${index}`} className="bg-gray-100 p-4 rounded border border-black overflow-x-auto my-4">
              <code>{codeBlockContent.join('\n')}</code>
            </pre>
          );
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          if (currentParagraph.length > 0) {
            const paragraphText = currentParagraph.join(" ");
            elements.push(
              <p key={`p-${index}`} className="text-body mb-4">
                {renderInlineMarkdown(paragraphText, `p-${index}`)}
              </p>
            );
            currentParagraph = [];
          }
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Handle headings
      if (line.trimStart().startsWith('# ')) {
        flushList();
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join(" ");
          elements.push(
            <p key={`p-${index}`} className="text-body mb-4">
              {renderInlineMarkdown(paragraphText, `p-${index}`)}
            </p>
          );
          currentParagraph = [];
        }
        const h2Text = line.trim().replace(/^#\s+/, "");
        elements.push(
          <h2 key={`h2-${index}`} className="text-h3 font-semibold font-space-mono mt-6 mb-4">
            {renderInlineMarkdown(h2Text, `h2-${index}`)}
          </h2>
        );
        return;
      }

      if (line.trimStart().startsWith('## ')) {
        flushList();
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join(" ");
          elements.push(
            <p key={`p-${index}`} className="text-body mb-4">
              {renderInlineMarkdown(paragraphText, `p-${index}`)}
            </p>
          );
          currentParagraph = [];
        }
        const h3Text = line.trim().replace(/^##\s+/, "");
        elements.push(
          <h3 key={`h3-${index}`} className="text-h4 font-semibold font-space-mono mt-4 mb-2">
            {renderInlineMarkdown(h3Text, `h3-${index}`)}
          </h3>
        );
        return;
      }

      // Handle unordered lists
      if (line.trimStart().startsWith('- ') || line.trimStart().startsWith('* ')) {
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join(" ");
          elements.push(
            <p key={`p-${index}`} className="text-body mb-4">
              {renderInlineMarkdown(paragraphText, `p-${index}`)}
            </p>
          );
          currentParagraph = [];
        }
        if (isOrderedList) {
          flushList();
        }
        isUnorderedList = true;
        currentListItems.push(line.trimStart().replace(/^[-*]\s+/, "").trim());
        return;
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(line.trimStart())) {
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join(" ");
          elements.push(
            <p key={`p-${index}`} className="text-body mb-4">
              {renderInlineMarkdown(paragraphText, `p-${index}`)}
            </p>
          );
          currentParagraph = [];
        }
        if (isUnorderedList) {
          flushList();
        }
        isOrderedList = true;
        const content = line.trimStart().replace(/^\d+\.\s/, "").trim();
        currentListItems.push(content);
        return;
      }

      // If we hit a non-list line while in a list, flush the list
      if (currentListItems.length > 0 && line.trim() && !line.startsWith('- ') && !line.startsWith('* ') && !/^\d+\.\s/.test(line)) {
        flushList();
      }

      // Handle bold text in paragraphs
      if (line.trim() && !line.startsWith('#') && !line.startsWith('- ') && !line.startsWith('* ') && !/^\d+\.\s/.test(line)) {
        currentParagraph.push(line.trim());
      }

      // Empty line - flush paragraph
      if (!line.trim()) {
        if (currentParagraph.length > 0) {
          const paragraphText = currentParagraph.join(" ");
          elements.push(
            <p key={`p-${index}`} className="text-body mb-4">
              {renderInlineMarkdown(paragraphText, `p-${index}`)}
            </p>
          );
          currentParagraph = [];
        }
      }
    });

    // Flush any remaining content
    flushList();
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join(" ");
      elements.push(
        <p key="p-final" className="text-body mb-4">
          {renderInlineMarkdown(paragraphText, "p-final")}
        </p>
      );
    }

    return elements;
  };

  return (
    <main className="mx-auto lg:max-w-[80vw] w-[90vw] text-black">
      <section className="border-l border-r border-black bg-background">
        <div className="flex flex-col">
          <div className="px-2 border-b py-4">
            <Link
              href="/blog"
              className="text-body text-blue-600 hover:text-blue-800 font-space-mono mb-4 inline-block"
            >
              ← Back to Blog Listing
            </Link>
            <h1 className="text-h2 font-semibold font-space-mono mt-4">
              {post.title}
            </h1>
            <div className="flex flex-row gap-4 items-center mt-4">
              <span className="text-sm text-gray-600 font-space-mono">
                {new Date(post.date).toLocaleDateString('en-UK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="text-sm text-gray-600 font-space-mono">
                by {post.author}
              </span>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-row gap-2 flex-wrap">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-200 px-2 py-1 rounded font-space-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="p-6">
            <div className="prose max-w-none">
              {renderContent(post.content)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

