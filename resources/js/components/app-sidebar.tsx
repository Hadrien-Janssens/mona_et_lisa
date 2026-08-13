import { Link } from '@inertiajs/react';
import {
    // BookOpen,
    CalendarClock,
    ChartSpline,
    ChevronsLeftRightEllipsis,
    CreditCard,
    Image,
    // FolderGit2,
    LayoutGrid,
    Palette,
    SearchCode,
    SquarePen,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { booking, home } from '@/routes';
// import { app } from '@/routes';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as adminContentIndex } from '@/routes/admin/content';
import { index as adminEvents } from '@/routes/admin/events';
import { index as adminWorkshopIndex } from '@/routes/admin/workshops';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: adminDashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Atelier',
        href: adminWorkshopIndex(),
        icon: Palette,
    },
    {
        title: 'SEO',
        href: '#',
        icon: SearchCode,
    },
    {
        title: 'Google analytics',
        href: '#',
        icon: ChartSpline,
    },
    {
        title: 'Evènement',
        href: adminEvents(),
        icon: CalendarClock,
    },
    {
        title: 'Contenu',
        href: adminContentIndex(),
        icon: SquarePen,
    },
    {
        title: 'Média',
        href: '#',
        icon: Image,
    },
    {
        title: 'SiteWeb',
        href: home(),
        icon: ChevronsLeftRightEllipsis,
    },
    {
        title: 'Stripe',
        href: '#',
        icon: CreditCard,
    },
    {
        title: 'Réservation',
        href: booking(),
        icon: CreditCard,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: FolderGit2,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={adminDashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
