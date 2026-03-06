"use client";

import { useState, useRef } from "react";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CoverImageUploadProps {
    url?: string;
    onUpload: (url: string) => void;
    onRemove: () => void;
    className?: string;
}

export default function CoverImageUpload({
    url,
    onUpload,
    onRemove,
    className
}: CoverImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admin/images/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                onUpload(data.url);
            } else {
                alert("Failed to upload cover image");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error uploading image");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className={cn("space-y-2", className)}>
            <label className="text-sm font-medium block">Cover Image</label>

            {url ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border group">
                    <Image
                        src={url}
                        alt="Cover"
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="p-2 bg-background/80 hover:bg-background rounded-full transition-colors text-foreground"
                        >
                            <Upload className="size-4" />
                        </button>
                        <button
                            onClick={onRemove}
                            className="p-2 bg-destructive/80 hover:bg-destructive rounded-full transition-colors text-white"
                        >
                            <X className="size-4" />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="md:h-[200px] h-[150px] w-full rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer"
                >
                    <div className="p-4 bg-muted rounded-full">
                        {isUploading ? (
                            <Loader2 className="size-6 animate-spin text-muted-foreground" />
                        ) : (
                            <ImageIcon className="size-6 text-muted-foreground" />
                        )}
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium">Click to upload cover image</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Supports JPG, PNG, WebP
                        </p>
                    </div>
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                className="hidden"
                accept="image/*"
            />
        </div>
    );
}
