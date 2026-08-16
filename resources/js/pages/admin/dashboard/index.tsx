import { Head } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    CreditCard,
    Users,
    CalendarCheck,
    Check,
    X,
    Clock,
} from 'lucide-react';

interface User {
    first_name: string;
    last_name: string;
    email: string;
}

interface Workshop {
    title: string;
}

interface WorkshopSession {
    start_at: string;
    workshop: Workshop;
}

interface Booking {
    id: number;
    seats: number;
    total_price: number;
    payment_status: string;
    user: User;
    session: WorkshopSession;
    created_at: string;
}

interface DashboardProps {
    totalBookings: number;
    totalRevenue: number;
    recentBookings: Booking[];
}

export default function Index({
    totalBookings,
    totalRevenue,
    recentBookings,
}: DashboardProps) {
    const formatCurrency = (amountInCents: number) => {
        return (amountInCents / 100).toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        });
    };

    const formatDate = (dateString: string) => {
        try {
            return new Intl.DateTimeFormat('fr-FR', {
                dateStyle: 'medium',
                timeStyle: 'short',
            }).format(new Date(dateString));
        } catch (e) {
            return dateString;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return (
                    <Badge
                        variant="default"
                        className="gap-1 border-emerald-500/20 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400"
                    >
                        <Check className="h-3 w-3" /> Payé
                    </Badge>
                );
            case 'pending':
                return (
                    <Badge
                        variant="secondary"
                        className="gap-1 border-amber-500/20 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400"
                    >
                        <Clock className="h-3 w-3" /> En attente
                    </Badge>
                );
            case 'failed':
                return (
                    <Badge
                        variant="destructive"
                        className="gap-1 border-red-500/20 bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400"
                    >
                        <X className="h-3 w-3" /> Échoué
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <>
            <Head title="Tableau de bord" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Tableau de bord
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Récapitulatif de l'activité et des réservations de
                            vos ateliers.
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Réservations Totales
                            </CardTitle>
                            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalBookings}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Depuis le début
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Revenus (Payés)
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(totalRevenue)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Volume total des paiements validés
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-4 border-sidebar-border/70 shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle>Dernières Réservations</CardTitle>
                        <CardDescription>
                            Les 10 réservations les plus récentes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {recentBookings.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-8 text-center">
                                <p className="text-sm text-muted-foreground">
                                    Aucune réservation pour le moment.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-sidebar-border bg-muted/30 text-muted-foreground">
                                            <th className="px-6 py-4 text-left font-medium">
                                                Date de réservation
                                            </th>
                                            <th className="px-6 py-4 text-left font-medium">
                                                Client
                                            </th>
                                            <th className="px-6 py-4 text-left font-medium">
                                                Atelier & Session
                                            </th>
                                            <th className="px-6 py-4 text-center font-medium">
                                                Places
                                            </th>
                                            <th className="px-6 py-4 text-right font-medium">
                                                Prix Total
                                            </th>
                                            <th className="px-6 py-4 text-left font-medium">
                                                Statut
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-sidebar-border">
                                        {recentBookings.map((booking) => (
                                            <tr
                                                key={booking.id}
                                                className="transition-colors hover:bg-muted/30"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                                                    {formatDate(
                                                        booking.created_at,
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-foreground">
                                                        {
                                                            booking.user
                                                                ?.first_name
                                                        }{' '}
                                                        {
                                                            booking.user
                                                                ?.last_name
                                                        }
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {booking.user?.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-foreground">
                                                        {
                                                            booking.session
                                                                ?.workshop
                                                                ?.title
                                                        }
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                                        <CalendarCheck className="h-3 w-3" />
                                                        {booking.session
                                                            ? formatDate(
                                                                  booking
                                                                      .session
                                                                      .start_at,
                                                              )
                                                            : 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center font-medium">
                                                    <Badge variant="outline">
                                                        {booking.seats}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right font-medium">
                                                    {formatCurrency(
                                                        booking.total_price,
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(
                                                        booking.payment_status,
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
        },
    ],
};
