import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section id="blog" className="max-w-3xl mx-auto py-10">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />

      {/* Back Button */}
      <div className="mb-8">
        <a href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
          ← Back to Blog
        </a>
      </div>

      {/* Header */}
      <div className="space-y-6 mb-10 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <time>{formatDate(post.metadata.publishedAt)}</time>
          {post.metadata.category && (
            <>
              <span>•</span>
              <span className="text-foreground font-medium">{post.metadata.category}</span>
            </>
          )}
        </div>

        <h1 className="title font-bold text-4xl md:text-5xl tracking-tight">
          {post.metadata.title}
        </h1>

        {post.metadata.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted mt-8">
            <img
              src={post.metadata.image}
              alt={post.metadata.title}
              className="object-cover size-full"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <article
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl prose-img:shadow-sm"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
    </section>
  );
}
