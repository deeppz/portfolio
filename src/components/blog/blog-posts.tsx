"use client";

import { useState } from "react";
import { BlogCard } from "./blog-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPostsProps {
    posts: Array<{
        slug: string;
        metadata: any;
    }>;
}

export function BlogPosts({ posts }: BlogPostsProps) {
    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract all unique tags
    const allTags = Array.from(
        new Set(
            posts.flatMap((post) => post.metadata.tags || [])
        )
    ).sort();

    // Filter posts
    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.metadata.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
            post.metadata.summary.toLowerCase().includes(search.toLowerCase());

        const matchesTag = selectedTag
            ? post.metadata.tags?.includes(selectedTag)
            : true;

        return matchesSearch && matchesTag;
    });

    return (
        <div className="space-y-10">
            {/* Search & Filters */}
            <div className="flex flex-col gap-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Search articles..."
                        className="pl-9 h-11 bg-muted/50"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {allTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={cn(
                                "px-3 py-1 text-sm rounded-full transition-colors border",
                                selectedTag === null
                                    ? "bg-foreground text-background border-foreground font-medium"
                                    : "bg-background text-muted-foreground border-border hover:border-foreground/50"
                            )}
                        >
                            All
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                className={cn(
                                    "px-3 py-1 text-sm rounded-full transition-colors border",
                                    selectedTag === tag
                                        ? "bg-foreground text-background border-foreground font-medium"
                                        : "bg-background text-muted-foreground border-border hover:border-foreground/50"
                                )}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Grid */}
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-muted-foreground">
                    <p>No posts found matching your criteria</p>
                    <button
                        onClick={() => { setSearch(""); setSelectedTag(null) }}
                        className="text-primary hover:underline mt-2 text-sm"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
