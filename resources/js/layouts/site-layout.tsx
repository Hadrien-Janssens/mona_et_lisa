import React from 'react';

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            data-theme="public"
            className="flex min-h-screen flex-col bg-background font-sans text-foreground"
        >
            {children}
        </div>
    );
}
