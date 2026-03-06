"use client";

import { useState, cloneElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Send } from "lucide-react";
import { RainbowButton } from "@/components/magicui/rainbow-button";

interface ContactFormProps {
    trigger?: React.ReactNode;
}

export function ContactForm({ trigger }: ContactFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Validate Phone Number
        const phone = data.phone as string;
        if (!/^\d{10}$/.test(phone)) {
            setError("Please enter a valid 10-digit mobile number.");
            setIsLoading(false);
            return;
        }

        try {
            // SheetDB API URL
            const SHEETDB_URL = "https://sheetdb.io/api/v1/jt9js3n0kz85i";

            await fetch(SHEETDB_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: data,
                }),
            });

            setIsSuccess(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsSuccess(false);
            }, 2000);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {cloneElement(trigger as React.ReactElement, {
                onClick: () => setIsOpen(true),
            })}

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/50 bg-background/80 p-8 shadow-2xl backdrop-blur-xl sm:p-12"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-500 transition-all hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                            >
                                <X size={20} />
                            </button>

                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="mb-6 rounded-full bg-green-500/10 p-4 text-green-500"
                                    >
                                        <Send size={32} />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                                    <p className="mt-2 text-muted-foreground">
                                        Thanks for reaching out. I'll get back to you soon.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-foreground">Get in Touch</h2>
                                        <p className="mt-2 text-muted-foreground">
                                            Have a project in mind? Let's build something amazing together.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-foreground">
                                                Name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Enter your Name"
                                                className="w-full rounded-lg border border-input/50 bg-secondary/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-foreground">
                                                Email
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Enter your Email"
                                                className="w-full rounded-lg border border-input/50 bg-secondary/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-sm font-medium text-foreground">
                                                Contact Number
                                            </label>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                pattern="[0-9]{10}"
                                                maxLength={10}
                                                placeholder="Enter 10-digit Mobile Number"
                                                title="Please enter a valid 10-digit mobile number"
                                                className="w-full rounded-lg border border-input/50 bg-secondary/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                onInput={(e) => {
                                                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 10);
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium text-foreground">
                                                Message
                                            </label>
                                            <textarea
                                                required
                                                name="message"
                                                id="message"
                                                rows={4}
                                                placeholder="Enter your Message"
                                                className="w-full resize-none rounded-lg border border-input/50 bg-secondary/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>

                                        {error && (
                                            <p className="text-sm text-red-500">{error}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="group relative flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-70"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="animate-spin" size={20} />
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send size={16} className="transition-transform group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
