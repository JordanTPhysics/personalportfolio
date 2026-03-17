export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [];
//   {
//     slug: "getting-started-with-data-analytics",
//     title: "Getting Started with Data Analytics for Small Businesses",
//     excerpt: "Learn how small businesses can leverage data analytics to make better decisions and drive growth.",
//     date: "2024-01-15",
//     author: "Jordan Thijssen",
//     content: `# Getting Started with Data Analytics for Small Businesses

// Data analytics might seem like something only large corporations can afford, but that's not the case. Small businesses can benefit tremendously from understanding their data.

// ## Why Data Analytics Matters

// For small businesses, every decision counts. Data analytics helps you:
// - Make informed decisions based on facts, not guesswork
// - Identify opportunities for growth
// - Understand your customers better
// - Optimize your operations

// ## Getting Started

// The first step is to identify what data you're already collecting. Most businesses have more data than they realize:
// - Sales records
// - Customer information
// - Website analytics
// - Social media engagement

// Start small, focus on one area, and expand from there.`,
//     tags: ["Data Analytics", "Small Business", "Getting Started"]
//   },


export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

