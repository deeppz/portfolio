"use client";

import Link from "next/link";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function BlogHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Custom Logo: Geek but Gentle */}
                <Link
                    href="/blog"
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
                    aria-label="Geek but Gentle Blog"
                >
                    <div className="relative flex items-center justify-center font-serif italic font-bold text-3xl h-10 w-16 text-foreground">
                        {/* Left 'g' */}
                        <span className="absolute left-0 z-10 group-hover:-translate-x-0.5 transition-transform">g</span>

                        {/* Middle 'b' (overlapping) */}
                        <span className="absolute text-primary/20 text-4xl z-0 transform -translate-y-1 rotate-12 group-hover:rotate-0 transition-all duration-500">b</span>

                        {/* Right 'g' (flipped) */}
                        <span className="absolute right-0 z-10 transform scale-x-[-1] group-hover:translate-x-0.5 transition-transform">g</span>
                    </div>

                    <div className="hidden sm:flex flex-col -space-y-1">
                        <span className="font-semibold tracking-tight text-lg leading-none">
                            geek but gentle
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                            The Blog
                        </span>
                    </div>
                </Link>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                        Visit Author
                        <ArrowUpRight className="size-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <div className="w-px h-6 bg-border" />
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
