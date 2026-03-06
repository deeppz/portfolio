"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
    post: {
        slug: string;
        metadata: {
            title: string;
            summary: string;
            publishedAt: string;
            image?: string;
            tags?: string[];
            category?: string;
        };
    };
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-4 p-4 rounded-xl border bg-card text-card-foreground hover:shadow-lg transition-all hover:bg-muted/50"
        >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted border">
                {post.metadata.image ? (
                    <Image
                        src={post.metadata.image}
                        alt={post.metadata.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary">
                        <span className="text-4xl">📄</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <time dateTime={post.metadata.publishedAt}>
                        {formatDate(post.metadata.publishedAt)}
                    </time>
                    {post.metadata.category && (
                        <>
                            <span>•</span>
                            <span className="font-medium text-foreground">{post.metadata.category}</span>
                        </>
                    )}
                </div>

                <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.metadata.title}
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-3 flex-1">
                    {post.metadata.summary}
                </p>

                {post.metadata.tags && post.metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                        {post.metadata.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0 h-5 font-normal">
                                {tag}
                            </Badge>
                        ))}
                        {post.metadata.tags.length > 3 && (
                            <span className="text-[10px] text-muted-foreground self-center">
                                +{post.metadata.tags.length - 3}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
}
