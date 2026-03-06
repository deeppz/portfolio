"use client";

import { useEffect, useState } from "react";

type PreviewPanelProps = {
    content: string;
};

export default function PreviewPanel({ content }: PreviewPanelProps) {
    const [html, setHtml] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!content) {
                setHtml("");
                return;
            }

            setLoading(true);
            try {
                const res = await fetch("/api/admin/render", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content }),
                });
                const data = await res.json();
                setHtml(data.html || "");
            } catch (error) {
                console.error("Failed to render markdown:", error);
            } finally {
                setLoading(false);
            }
        }, 300); // Debounce: Wait 300ms after typing stops

        return () => clearTimeout(timer);
    }, [content]);

    return (
        <div className="h-full overflow-y-auto p-8 bg-background">
            {loading && (
                <div className="text-sm text-muted-foreground mb-4">
                    Rendering preview...
                </div>
            )}
            <article
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}
