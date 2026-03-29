export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "small-business-vs-big-corp",
    title: "SMEs and Big Corps: Who Controls the Markets and who grows the Economy?",
    excerpt: "As Humanity (and now AI) pushes economic development to new frontiers, who stands to make the biggest impact on markets and communities on local and global scales?",
    date: "2026-03-27",
    author: "Jordan Thijssen",
    content: `
# SMEs and big Corps: Who Controls the Markets and who grows the Economy?
## Market Control

Large global corporations undeniably control global markets.
They control significant shares in sectors like technology, retail, and manufacturing due to influence, vast resources, and global reach.
Their ability to innovate and capture consumer loyalty enables them to maintain competitive advantages.
However, according to a [2021 European OECD study](https://www.oecd.org/en/topics/sme-indicators-benchmarking-and-monitoring.html) SMEs make up 99% of all registered businesses, employ 2/3 of the workforce and contribute over half of the economy's GDP.

## Too Soon for Economic Boons?

The first step is to identify what data you're already collecting. Most businesses have more data than they realize:
- Sales records
- Customer information
- Website analytics
- Social media engagement

## Small Businesses, Big Challenges

Start small, focus on one area, and expand from there.`,
    tags: ["Economy", "Markets", "Small Business", "Big Corp", "Community"]
  }
];


export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

