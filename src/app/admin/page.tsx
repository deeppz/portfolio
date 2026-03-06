"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BlurFade from "@/components/magicui/blur-fade";
import { FileEdit, Trash2, Plus, LogOut } from "lucide-react";

type Post = {
    slug: string;
    metadata: {
        title: string;
        publishedAt: string;
        category: string;
        status?: "draft" | "published";
    };
};

export default function AdminDashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/admin/posts");
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
            fetchPosts();
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-background px-8 py-12">
            <div className="mx-auto w-full max-w-5xl">
                <BlurFade delay={0.1}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">
                                Admin Dashboard
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Manage your blog posts
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Link href="/blog" target="_blank">
                                <button className="px-4 py-2 rounded-lg border border-input hover:bg-accent transition-colors">
                                    Preview Blog
                                </button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-lg border border-input hover:bg-accent transition-colors flex items-center gap-2"
                            >
                                <LogOut className="size-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </BlurFade>

                <BlurFade delay={0.2}>
                    <Link href="/admin/editor">
                        <button className="w-full mb-6 px-6 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium">
                            <Plus className="size-5" />
                            Create New Post
                        </button>
                    </Link>
                </BlurFade>

                {loading ? (
                    <div className="text-center text-muted-foreground py-12">
                        Loading posts...
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                        No posts yet. Create your first post!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post, idx) => (
                            <BlurFade key={post.slug} delay={0.3 + idx * 0.05}>
                                <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold">
                                                {post.metadata.title}
                                            </h3>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                <span>{post.metadata.publishedAt}</span>
                                                <span>•</span>
                                                <span>{post.metadata.category}</span>
                                                <span>•</span>
                                                <span
                                                    className={
                                                        post.metadata.status === "published"
                                                            ? "text-green-600 dark:text-green-400"
                                                            : "text-yellow-600 dark:text-yellow-400"
                                                    }
                                                >
                                                    {post.metadata.status || "published"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link href={`/admin/editor/${post.slug}`}>
                                                <button className="p-2 rounded-lg border border-input hover:bg-accent transition-colors">
                                                    <FileEdit className="size-4" />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.slug)}
                                                className="p-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
