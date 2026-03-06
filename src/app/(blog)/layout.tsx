import { BlogHeader } from "@/components/blog/blog-header";
import { BlogFooter } from "@/components/blog/blog-footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased w-full flex flex-col">
      <BlogHeader />
      <main className="flex-1 w-full">
        {children}
      </main>
      <BlogFooter />
    </div>
  );
}
