"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
    Bold,
    Italic,
    Code,
    Link as LinkIcon,
    Image as ImageIcon,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Loader2,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Palette,
    Clock,
    Type
} from "lucide-react";
import { cn } from "@/lib/utils";

type MDXEditorProps = {
    value: string;
    onChange: (value: string) => void;
    onPreviewUpdate?: (html: string) => void;
};

const FONT_SIZES = [
    { label: "Small", value: "12px" },
    { label: "Normal", value: "16px" },
    { label: "Large", value: "20px" },
    { label: "Huge", value: "24px" },
    { label: "Giant", value: "32px" },
];

export default function MDXEditor({ value, onChange }: MDXEditorProps) {
    const { theme } = useTheme();
    const [editorTheme, setEditorTheme] = useState<"vs-dark" | "light">("light");
    const editorRef = useRef<any>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [textColor, setTextColor] = useState("#000000");

    useEffect(() => {
        setEditorTheme(theme === "dark" ? "vs-dark" : "light");
    }, [theme]);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
    };

    const insertText = (before: string, after: string = "") => {
        const editor = editorRef.current;
        if (!editor) return;

        const selection = editor.getSelection();
        const model = editor.getModel();
        if (!selection || !model) return;

        const selectedText = model.getValueInRange(selection);
        const newText = before + selectedText + after;

        editor.executeEdits("toolbar", [
            {
                range: selection,
                text: newText,
                forceMoveMarkers: true,
            },
        ]);

        editor.focus();
    };

    // --- Rich Text Formatters (using HTML/JSX for MDX) ---

    const formatFontSize = (size: string) => {
        insertText(`<span style={{ fontSize: '${size}' }}>`, "</span>");
    };

    const formatColor = (color: string) => {
        insertText(`<span style={{ color: '${color}' }}>`, "</span>");
        setShowColorPicker(false);
    };

    const formatAlign = (align: 'left' | 'center' | 'right') => {
        insertText(`<div style={{ textAlign: '${align}' }}>\n`, "\n</div>");
    };

    // --- Stats ---
    const stats = useMemo(() => {
        const words = value.trim().split(/\s+/).filter(Boolean).length;
        const time = Math.ceil(words / 200);
        return { words, time };
    }, [value]);

    // --- Image Upload ---

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
                const markdown = `![${file.name.split('.')[0]}](${data.url})`;

                const editor = editorRef.current;
                if (editor) {
                    const position = editor.getPosition();
                    if (position) {
                        editor.executeEdits("image-upload", [
                            {
                                range: {
                                    startLineNumber: position.lineNumber,
                                    startColumn: position.column,
                                    endLineNumber: position.lineNumber,
                                    endColumn: position.column,
                                },
                                text: markdown,
                                forceMoveMarkers: true,
                            },
                        ]);
                    }
                }
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload error");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // --- Basic Markdown Helpers ---
    const formatBold = () => insertText("**", "**");
    const formatItalic = () => insertText("*", "*");
    const formatCode = () => insertText("`", "`");
    const formatLink = () => insertText("[", "](url)");
    const formatH1 = () => insertText("# ");
    const formatH2 = () => insertText("## ");
    const formatH3 = () => insertText("### ");
    const formatList = () => insertText("- ");
    const formatOrderedList = () => insertText("1. ");
    const formatCodeBlock = () => insertText("\n```javascript\n", "\n```\n");

    return (
        <div className="flex flex-col h-full bg-background relative group">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
            />

            {/* Toolbar */}
            <div className="flex flex-col border-b border-border bg-muted/40 backdrop-blur-sm z-10 transition-all">
                {/* Row 1: Primary Formatting */}
                <div className="flex items-center gap-1.5 p-2 flex-wrap">
                    <ToolbarBtn onClick={formatH1} icon={Heading1} title="Heading 1" />
                    <ToolbarBtn onClick={formatH2} icon={Heading2} title="Heading 2" />
                    <ToolbarBtn onClick={formatH3} icon={Heading3} title="Heading 3" />

                    <div className="w-px h-6 bg-border mx-1 my-auto" />

                    <ToolbarBtn onClick={formatBold} icon={Bold} title="Bold" />
                    <ToolbarBtn onClick={formatItalic} icon={Italic} title="Italic" />
                    <ToolbarBtn onClick={formatLink} icon={LinkIcon} title="Link" />
                    <ToolbarBtn onClick={formatCode} icon={Code} title="Inline Code" />

                    <div className="w-px h-6 bg-border mx-1 my-auto" />

                    <ToolbarBtn onClick={formatList} icon={List} title="Bullet List" />
                    <ToolbarBtn onClick={formatOrderedList} icon={ListOrdered} title="Numbered List" />
                    <ToolbarBtn onClick={formatCodeBlock} icon={Code} title="Code Block" />

                    <div className="w-px h-6 bg-border mx-1 my-auto" />

                    <ToolbarBtn onClick={handleImageClick} icon={isUploading ? Loader2 : ImageIcon} title="Image" disabled={isUploading} />
                </div>

                {/* Row 2: Rich Text Options */}
                <div className="flex items-center gap-3 px-2 pb-2 text-sm">
                    <div className="flex items-center gap-2 bg-background/50 rounded-md border p-0.5">
                        <Type className="size-3.5 ml-2 text-muted-foreground" />
                        <select
                            className="h-7 text-xs bg-transparent border-none focus:ring-0 outline-none cursor-pointer min-w-[70px]"
                            onChange={(e) => {
                                formatFontSize(e.target.value);
                                e.target.value = ""; // Reset
                            }}
                        >
                            <option value="" disabled selected>Size</option>
                            {FONT_SIZES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </div>

                    <div className="relative">
                        <button
                            className="flex items-center gap-1.5 h-8 px-2.5 hover:bg-accent rounded-md border bg-background/50 transition-colors"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            title="Text Color"
                        >
                            <Palette className="size-3.5" style={{ color: textColor }} />
                            <span className="text-xs font-medium">Color</span>
                        </button>
                        {showColorPicker && (
                            <div className="absolute top-full left-0 mt-2 p-2 bg-popover border rounded-lg shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                                <input
                                    type="color"
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    className="block w-full h-8 cursor-pointer rounded mb-2"
                                />
                                <button
                                    onClick={() => formatColor(textColor)}
                                    className="w-full text-xs bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1.5 rounded-md font-medium transition-colors"
                                >
                                    Apply Color
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-0.5 bg-background/50 rounded-md border p-0.5 h-8">
                        <ToolbarBtn onClick={() => formatAlign('left')} icon={AlignLeft} title="Align Left" />
                        <ToolbarBtn onClick={() => formatAlign('center')} icon={AlignCenter} title="Align Center" />
                        <ToolbarBtn onClick={() => formatAlign('right')} icon={AlignRight} title="Align Right" />
                    </div>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 min-h-0 relative">
                <Editor
                    height="100%"
                    defaultLanguage="markdown"
                    value={value}
                    onChange={(val) => onChange(val || "")}
                    onMount={handleEditorDidMount}
                    theme={editorTheme}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 16,
                        lineNumbers: "on",
                        wordWrap: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        insertSpaces: true,
                        padding: { top: 24, bottom: 40 },
                        fontFamily: "var(--font-sans)",
                        renderLineHighlight: "none",
                    }}
                />
            </div>

            {/* Status Bar */}
            <div className="absolute bottom-4 right-6 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3 text-xs font-medium bg-background/80 backdrop-blur border shadow-sm px-3 py-1.5 rounded-full text-muted-foreground">
                    <span>{stats.words} words</span>
                    <span className="w-px h-3 bg-border" />
                    <span className="flex items-center gap-1.5">
                        <Clock className="size-3" />
                        {stats.time} min read
                    </span>
                </div>
            </div>
        </div>
    );
}

function ToolbarBtn({ onClick, icon: Icon, title, disabled }: { onClick: () => void, icon: any, title: string, disabled?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="p-1.5 rounded-md hover:bg-background hover:text-foreground hover:shadow-sm transition-all text-muted-foreground disabled:opacity-50 disabled:hover:shadow-none"
            title={title}
        >
            <Icon className={cn("size-4", disabled && "animate-spin")} />
        </button>
    )
}
