import Link from "next/link";
import { getAllBlogPosts } from "./blog-data";

export const metadata = {
  title: "Blog | Data Driven Outcomes",
  description: "Insights, guides, and thoughts on data analytics for small businesses",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="mx-auto lg:max-w-[80vw] w-[90vw] h-screen text-black">
      <section className="border-l border-r border-black bg-background h-full">
        <div className="flex flex-col h-full">
          <h1 className="text-h2 font-semibold font-space-mono px-2 border-b py-4">
            My Blog
          </h1>
          <div className="p-6">
            <p className="text-body mb-8">
              Insights, guides, and thoughts on data analytics, business strategy, and making data-driven decisions.
            </p>
            <div className="flex flex-col gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="border-2 border-black inset-border p-6 hover:bg-gray-100 transition-colors duration-200 ease-in-out block"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-h3 font-semibold font-space-mono">
                      {post.title}
                    </h2>
                    <p className="text-body text-gray-700">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-row gap-4 items-center mt-2">
                      <span className="text-sm text-gray-600 font-space-mono">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
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
                </Link>
              ))}
            </div>
            {posts.length === 0 && (
              <div className="border-2 border-black inset-border p-6 text-center">
                <p className="text-body text-gray-600">
                  No blog posts yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

