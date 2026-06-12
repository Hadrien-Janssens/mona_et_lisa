import { Link } from '@inertiajs/react';
import {
    BookOpen,
    CalendarClock,
    ChartSpline,
    ChevronsLeftRightEllipsis,
    CreditCard,
    FolderGit2,
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
import { dashboard } from '@/routes';
import { dashboard as adminDashboard } from '@/routes/admin';
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
        href: dashboard(),
        icon: SearchCode,
    },
    {
        title: 'Google analytics',
        href: dashboard(),
        icon: ChartSpline,
    },
    {
        title: 'Evènement',
        href: dashboard(),
        icon: CalendarClock,
    },
    {
        title: 'Contenu',
        href: dashboard(),
        icon: SquarePen,
    },
    {
        title: 'SiteWeb',
        href: dashboard(),
        icon: ChevronsLeftRightEllipsis,
    },
    {
        title: 'Stripe',
        href: dashboard(),
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
