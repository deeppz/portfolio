import Navbar from "@/components/navbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto w-full px-6 pt-24 sm:pt-32">
            {children}
            <Navbar />
        </div>
    );
}
