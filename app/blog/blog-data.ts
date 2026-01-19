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
//   {
//     slug: "understanding-kpis",
//     title: "Understanding KPIs: What Metrics Actually Matter?",
//     excerpt: "A guide to identifying and tracking the Key Performance Indicators that drive real business results.",
//     date: "2024-02-01",
//     author: "Jordan Thijssen",
//     content: `# Understanding KPIs: What Metrics Actually Matter?

// Key Performance Indicators (KPIs) are essential for measuring business success, but not all metrics are created equal.

// ## What Makes a Good KPI?

// A good KPI should be:
// - **Measurable**: You can track it consistently
// - **Relevant**: It directly relates to your business goals
// - **Actionable**: You can do something about it
// - **Timely**: You can measure it frequently enough to make decisions

// ## Common Mistakes

// Many businesses track too many metrics or the wrong ones. Focus on metrics that:
// 1. Align with your business objectives
// 2. Help you make decisions
// 3. Can be improved through action

// ## Examples for Small Businesses

// - Revenue per customer
// - Customer acquisition cost
// - Customer lifetime value
// - Conversion rates
// - Inventory turnover

// Remember: The best KPIs are the ones you'll actually use to make decisions.`,
//     tags: ["KPIs", "Metrics", "Business Strategy"]
//   },
//   {
//     slug: "data-driven-pricing-strategies",
//     title: "Data-Driven Pricing Strategies That Work",
//     excerpt: "How to use data to optimize your pricing and maximize revenue without losing customers.",
//     date: "2024-02-20",
//     author: "Jordan Thijssen",
//     content: `# Data-Driven Pricing Strategies That Work

// Pricing is one of the most important decisions you'll make, and data can help you get it right.

// ## The Power of Data in Pricing

// Traditional pricing often relies on:
// - Competitor analysis
// - Cost-plus models
// - Gut feeling

// Data-driven pricing uses:
// - Customer behavior data
// - Price elasticity analysis
// - Demand forecasting
// - A/B testing results

// ## Key Data Points to Collect

// 1. **Price sensitivity**: How do sales change with price?
// 2. **Customer segments**: Do different groups respond differently?
// 3. **Seasonal patterns**: When are customers willing to pay more?
// 4. **Competitive positioning**: Where do you fit in the market?

// ## Implementation Steps

// 1. Start tracking sales at different price points
// 2. Analyze customer segments
// 3. Test pricing strategies
// 4. Monitor results and iterate

// The goal isn't to charge the highest price, but to find the optimal price that maximizes both revenue and customer satisfaction.`,
//     tags: ["Pricing", "Revenue Optimization", "Data Strategy"]
//   }
// ];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

