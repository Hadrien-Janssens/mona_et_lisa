import { Link, usePage } from '@inertiajs/react';
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
import { edit as adminStripeEdit } from '@/routes/admin/stripe';
import type { NavItem } from '@/types';
import type { Auth } from '@/types/auth';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: adminDashboard(),
        icon: LayoutGrid,
        roles: ['admin'],
    },
    {
        title: 'Atelier',
        href: adminWorkshopIndex(),
        icon: Palette,
        roles: ['admin'],
    },
    {
        title: 'SEO',
        href: '#',
        icon: SearchCode,
        roles: ['admin'],
    },
    {
        title: 'Google analytics',
        href: '#',
        icon: ChartSpline,
        roles: ['admin'],
    },
    {
        title: 'Evènement',
        href: adminEvents(),
        icon: CalendarClock,
        roles: ['admin'],
    },
    {
        title: 'Contenu',
        href: adminContentIndex(),
        icon: SquarePen,
        roles: ['admin'],
    },
    {
        title: 'Média',
        href: '#',
        icon: Image,
        roles: ['admin'],
    },
    {
        title: 'SiteWeb',
        href: home(),
        icon: ChevronsLeftRightEllipsis,
        roles: ['admin'],
    },
    {
        title: 'Stripe',
        href: adminStripeEdit(),
        icon: CreditCard,
        roles: ['admin'],
    },
    {
        title: 'Réservation',
        href: booking(),
        icon: CreditCard,
        roles: ['admin', 'client'],
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
    const { auth } = usePage<{ auth: Auth }>().props;
    const user = auth.user;
    const userRole = user.is_admin ? 'admin' : 'client';

    const filteredMainNavItems = mainNavItems.filter(
        (item) => !item.roles || item.roles.includes(userRole),
    );

    const filteredFooterNavItems = footerNavItems.filter(
        (item) => !item.roles || item.roles.includes(userRole),
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href={
                                    user.is_admin ? adminDashboard() : booking()
                                }
                                prefetch
                            >
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredMainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={filteredFooterNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
