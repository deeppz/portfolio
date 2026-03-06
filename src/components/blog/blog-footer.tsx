"use client";

import Link from "next/link";
import { DATA } from "@/data/resume";
import { Github, Linkedin, Twitter } from "lucide-react";

export function BlogFooter() {
    return (
        <footer className="border-t bg-background/50 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Left: Brand */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2"
                    >
                        <div className="relative flex items-center justify-center font-serif italic font-bold text-xl h-8 w-12 opacity-80 group-hover:opacity-100 transition-opacity">
                            <span className="absolute left-0 text-foreground z-10">g</span>
                            <span className="absolute text-primary/40 text-2xl z-0 transform -translate-y-0.5">b</span>
                            <span className="absolute right-0 text-foreground z-10 transform scale-x-[-1]">g</span>
                        </div>
                        <span className="font-medium tracking-tight text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                            geek but gentle
                        </span>
                    </Link>
                    <p className="text-xs text-muted-foreground text-center md:text-left max-w-[250px]">
                        Exploring the intersection of product, engineering, and data.
                    </p>
                </div>

                {/* Right: Links & Copyright */}
                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        {DATA.contact.social.GitHub && (
                            <Link href={DATA.contact.social.GitHub.url} target="_blank" className="hover:text-foreground transition-colors">
                                <Github className="size-4" />
                            </Link>
                        )}
                        {DATA.contact.social.Twitter && (
                            <Link href={DATA.contact.social.Twitter.url} target="_blank" className="hover:text-foreground transition-colors">
                                <Twitter className="size-4" />
                            </Link>
                        )}
                        {DATA.contact.social.LinkedIn && (
                            <Link href={DATA.contact.social.LinkedIn.url} target="_blank" className="hover:text-foreground transition-colors">
                                <Linkedin className="size-4" />
                            </Link>
                        )}
                    </div>

                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} {DATA.name}. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}
