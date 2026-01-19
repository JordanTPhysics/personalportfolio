import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getAllBlogPosts } from "../blog-data";
import { Metadata } from "next";
import React from "react";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  
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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

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
                <li key={idx} className="text-body">{item}</li>
              ))}
            </ul>
          );
        } else if (isOrderedList) {
          elements.push(
            <ol key={`ol-${elements.length}`} className="list-decimal ml-6 mb-4 space-y-2">
              {currentListItems.map((item, idx) => (
                <li key={idx} className="text-body">{item}</li>
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
      if (line.startsWith('```')) {
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
            elements.push(<p key={`p-${index}`} className="text-body mb-4">{currentParagraph.join(' ')}</p>);
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
      if (line.startsWith('# ')) {
        flushList();
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="text-body mb-4">{currentParagraph.join(' ')}</p>);
          currentParagraph = [];
        }
        elements.push(<h2 key={`h2-${index}`} className="text-h3 font-semibold font-space-mono mt-6 mb-4">{line.substring(2)}</h2>);
        return;
      }

      if (line.startsWith('## ')) {
        flushList();
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="text-body mb-4">{currentParagraph.join(' ')}</p>);
          currentParagraph = [];
        }
        elements.push(<h3 key={`h3-${index}`} className="text-h4 font-semibold font-space-mono mt-4 mb-2">{line.substring(3)}</h3>);
        return;
      }

      // Handle unordered lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="text-body mb-4">{currentParagraph.join(' ')}</p>);
          currentParagraph = [];
        }
        if (isOrderedList) {
          flushList();
        }
        isUnorderedList = true;
        currentListItems.push(line.substring(2).trim());
        return;
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(line)) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="text-body mb-4">{currentParagraph.join(' ')}</p>);
          currentParagraph = [];
        }
        if (isUnorderedList) {
          flushList();
        }
        isOrderedList = true;
        const content = line.replace(/^\d+\.\s/, '').trim();
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
          const paragraphText = currentParagraph.join(' ');
          // Handle bold text in paragraph
          const parts = paragraphText.split('**');
          const paragraphContent = parts.map((part, i) => {
            if (i % 2 === 1) {
              return <strong key={i} className="font-semibold">{part}</strong>;
            }
            return part;
          });
          elements.push(<p key={`p-${index}`} className="text-body mb-4">{paragraphContent}</p>);
          currentParagraph = [];
        }
      }
    });

    // Flush any remaining content
    flushList();
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join(' ');
      // Handle bold text in paragraph
      const parts = paragraphText.split('**');
      const paragraphContent = parts.map((part, i) => {
        if (i % 2 === 1) {
          return <strong key={i} className="font-semibold">{part}</strong>;
        }
        return part;
      });
      elements.push(<p key="p-final" className="text-body mb-4">{paragraphContent}</p>);
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
              ← Back to Blog
            </Link>
            <h1 className="text-h2 font-semibold font-space-mono mt-4">
              {post.title}
            </h1>
            <div className="flex flex-row gap-4 items-center mt-4">
              <span className="text-sm text-gray-600 font-space-mono">
                {new Date(post.date).toLocaleDateString('en-US', {
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

