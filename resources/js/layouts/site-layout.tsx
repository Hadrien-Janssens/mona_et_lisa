import { usePage } from '@inertiajs/react';
import Footer from '@/pages/site/components/Footer';
import Nav from '@/pages/site/components/Nav';

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { siteContents } = usePage<any>().props;

    return (
        <div
            data-theme="public"
            className="flex min-h-screen flex-col bg-background font-sans text-foreground"
        >
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer content={siteContents?.footer} />
        </div>
    );
}
