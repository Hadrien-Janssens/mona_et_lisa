import { Head, Link, router } from '@inertiajs/react';
import * as routes from '@/routes/admin/events';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash, Plus, CalendarCheck } from 'lucide-react';
import { useState } from 'react';

interface Workshop {
    id: number;
    title: string;
}

interface WorkshopSession {
    id: number;
    workshop_id: number;
    start_at: string;
    max_participants: number;
    bookings_count: number;
    workshop: Workshop;
}

interface PaginationData {
    data: WorkshopSession[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface IndexProps {
    events: PaginationData;
    workshops: Workshop[];
    filters: {
        tab: string;
        workshop_id: string | null;
    };
}

export default function Index({ events, workshops, filters }: IndexProps) {
    const [tab, setTab] = useState(filters.tab || 'upcoming');
    const [workshopId, setWorkshopId] = useState<string>(filters.workshop_id || 'all');

    const handleFilterChange = (newTab: string, newWorkshopId: string) => {
        setTab(newTab);
        setWorkshopId(newWorkshopId);
        
        router.get(routes.index.url(), {
            tab: newTab,
            ...(newWorkshopId !== 'all' ? { workshop_id: newWorkshopId } : {})
        }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (event: WorkshopSession) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer cet événement ? Les réservations associées risquent d'être supprimées.`)) {
            router.delete(routes.destroy.url(event.id), {
                preserveScroll: true,
            });
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return new Intl.DateTimeFormat('fr-FR', {
                dateStyle: 'medium',
                timeStyle: 'short'
            }).format(new Date(dateString));
        } catch (e) {
            return dateString;
        }
    };

    return (
        <>
            <Head title="Gestion des Événements" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Gestion des Événements</h1>
                        <p className="text-sm text-muted-foreground">
                            Créez, modifiez ou supprimez les sessions (dates) de vos ateliers.
                        </p>
                    </div>
                    <Button asChild className="gap-2 shadow-sm">
                        <Link href={routes.create.url()}>
                            <Plus className="h-4 w-4" />
                            Créer un événement
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Tabs value={tab} onValueChange={(val) => handleFilterChange(val, workshopId)} className="w-full sm:w-[400px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="upcoming">À venir</TabsTrigger>
                            <TabsTrigger value="past">Passés</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="w-full sm:w-auto">
                        <Select 
                            value={workshopId} 
                            onValueChange={(val) => handleFilterChange(tab, val)}
                        >
                            <SelectTrigger className="w-full sm:w-[250px]">
                                <SelectValue placeholder="Tous les ateliers" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les ateliers</SelectItem>
                                {workshops.map((w) => (
                                    <SelectItem key={w.id} value={w.id.toString()}>{w.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Card className="border-sidebar-border/70 shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle>Liste des événements</CardTitle>
                        <CardDescription>
                            {tab === 'upcoming' ? 'Événements prévus dans le futur.' : 'Événements qui se sont déjà déroulés.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {events.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-8 text-center">
                                <p className="text-sm text-muted-foreground mb-4">Aucun événement trouvé pour ces critères.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-sidebar-border bg-muted/30 text-muted-foreground">
                                            <th className="px-6 py-4 text-left font-medium">Date & Heure</th>
                                            <th className="px-6 py-4 text-left font-medium">Atelier</th>
                                            <th className="px-6 py-4 text-center font-medium">Places (Réservé / Max)</th>
                                            <th className="px-6 py-4 text-right font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-sidebar-border">
                                        {events.data.map((event) => (
                                            <tr 
                                                key={event.id} 
                                                className="group hover:bg-muted/30 transition-colors"
                                            >
                                                <td className="px-6 py-4 font-medium text-foreground flex items-center gap-2">
                                                    <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                                                    {formatDate(event.start_at)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {event.workshop.title}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {event.bookings_count} / {event.max_participants}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button 
                                                            asChild 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                        >
                                                            <Link href={routes.edit.url(event.id)}>
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-8 w-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                                                            onClick={() => handleDelete(event)}
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        
                        {/* Pagination simplifiée */}
                        {events.last_page > 1 && (
                            <div className="flex items-center justify-between border-t border-sidebar-border p-4">
                                <Button 
                                    variant="outline" 
                                    disabled={!events.prev_page_url}
                                    onClick={() => events.prev_page_url && router.get(events.prev_page_url, { tab, workshop_id: workshopId !== 'all' ? workshopId : undefined }, { preserveState: true })}
                                >
                                    Précédent
                                </Button>
                                <span className="text-sm text-muted-foreground">
                                    Page {events.current_page} sur {events.last_page}
                                </span>
                                <Button 
                                    variant="outline" 
                                    disabled={!events.next_page_url}
                                    onClick={() => events.next_page_url && router.get(events.next_page_url, { tab, workshop_id: workshopId !== 'all' ? workshopId : undefined }, { preserveState: true })}
                                >
                                    Suivant
                                </Button>
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
            title: 'Événements',
            href: '/admin/events',
        },
    ],
};
