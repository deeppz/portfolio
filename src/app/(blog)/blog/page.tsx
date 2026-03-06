import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import { BlogPosts } from "@/components/blog/blog-posts";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog",
  description: "Insights on Engineering, Product Management, and Data.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Sort posts by date
  const sortedPosts = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  const featuredPost = sortedPosts[0]; // For now, just take latest as featured
  const remainingPosts = sortedPosts.slice(1);

  return (
    <section className="max-w-4xl mx-auto py-12 space-y-16">

      {/* Header */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="space-y-4">
          <h1 className="font-bold text-4xl tracking-tight">Writing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Thoughts on building products, engineering data systems, and leading teams.
          </p>
        </div>
      </BlurFade>

      {/* Featured Post (Latest) */}
      {featuredPost && (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <Link href={`/blog/${featuredPost.slug}`} className="group relative block overflow-hidden rounded-2xl bg-muted aspect-[2/1] border">
            {featuredPost.metadata.image && (
              <img
                src={featuredPost.metadata.image}
                alt={featuredPost.metadata.title}
                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <time>{formatDate(featuredPost.metadata.publishedAt)}</time>
                  {featuredPost.metadata.category && (
                    <>
                      <span>•</span>
                      <span>{featuredPost.metadata.category}</span>
                    </>
                  )}
                </div>
                <h2 className="text-3xl font-bold tracking-tight">{featuredPost.metadata.title}</h2>
                <p className="text-white/80 line-clamp-2 max-w-2xl text-lg">{featuredPost.metadata.summary}</p>
              </div>
            </div>
          </Link>
        </BlurFade>
      )}

      {/* Main Content */}
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <BlogPosts posts={sortedPosts} />
      </BlurFade>

    </section>
  );
}
