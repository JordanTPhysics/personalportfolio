"use client";

import { useEffect, useCallback } from "react";

import { Button } from "@/components/ui/Button";

export default function SuccessPage() {
    const handleEmailSend = useCallback(() => {
        const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;
        if (!email) return;

        fetch("/api/sendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const shouldSend = sessionStorage.getItem("surveyJustSubmitted");
        if (shouldSend) {
            sessionStorage.removeItem("surveyJustSubmitted");
            handleEmailSend();
        }
    }, [handleEmailSend]);

    return (
        <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto lg:w-2/3 w-full">
                <h1 className="text-h1 font-space-mono font-bold tracking-tight text-foreground mb-12">
                    Success! Check your email for the free Ebook.
                </h1>

                <span className="text-h4 text-center mx-8 flex justify-center bg-slate-300 rounded-md p-4 border-2 border-black">
                    Didn't receive the email? Check your spam folder or try again.
                </span>
            </div>
            <div className="flex justify-center mt-12">
                <Button onClick={handleEmailSend} variant="default" className="rounded-md hover:text-white h-full">Try Again</Button>
            </div>
        </div>
    );
}