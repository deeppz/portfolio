import RetroGrid from "@/components/magicui/retro-grid";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen">
            <RetroGrid className="fixed inset-0 -z-10" />
            {children}
        </div>
    );
}
