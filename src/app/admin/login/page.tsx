"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BlurFade from "@/components/magicui/blur-fade";
import ShimmerButton from "@/components/magicui/shimmer-button";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin");
            } else {
                setError("Invalid password");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <BlurFade delay={0.1}>
                <div className="w-full max-w-md space-y-8 p-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight">Admin Login</h1>
                        <p className="mt-2 text-muted-foreground">
                            Enter your password to access the admin panel
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter admin password"
                            />
                        </div>

                        {error && (
                            <div className="text-sm text-destructive text-center">
                                {error}
                            </div>
                        )}

                        <ShimmerButton
                            type="submit"
                            className="w-full"
                            background="hsl(var(--foreground))"
                            shimmerColor="hsl(var(--background))"
                            disabled={loading}
                        >
                            <span className="text-background font-medium">
                                {loading ? "Logging in..." : "Login"}
                            </span>
                        </ShimmerButton>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Admin panel is only available in development mode
                    </p>
                </div>
            </BlurFade>
        </div>
    );
}
