import { Head, Link, router } from '@inertiajs/react';
import * as routes from '@/routes/admin/workshops';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash, Plus, Check, X } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface Workshop {
    id: number;
    title: string;
    slug: string;
    summary: string | null;
    price: number;
    duration_minutes: number;
    is_active: boolean;
    future_sessions_count: number;
    past_sessions_count: number;
}

interface IndexProps {
    workshops: Workshop[];
}

export default function Index({ workshops }: IndexProps) {
    const [workshopToDelete, setWorkshopToDelete] = useState<Workshop | null>(null);
    const [deleteModalType, setDeleteModalType] = useState<'future' | 'past' | 'normal' | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (workshop: Workshop) => {
        setWorkshopToDelete(workshop);
        if (workshop.future_sessions_count > 0) {
            setDeleteModalType('future');
        } else if (workshop.past_sessions_count > 0) {
            setDeleteModalType('past');
        } else {
            setDeleteModalType('normal');
        }
    };

    const confirmDelete = () => {
        if (!workshopToDelete) return;
        setIsDeleting(true);

        const routeDef = routes.destroy(workshopToDelete.id);
        const options = {
            onFinish: () => {
                setIsDeleting(false);
                setWorkshopToDelete(null);
                setDeleteModalType(null);
            },
        };

        if (deleteModalType === 'future') {
            router.delete(routeDef.url, {
                ...options,
                data: { force_cancel_future: true },
            });
        } else {
            router.delete(routeDef.url, options);
        }
    };

    return (
        <>
            <Head title="Gestion des Ateliers" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Gestion des Ateliers
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Créez, modifiez ou supprimez les ateliers proposés
                            sur la plateforme.
                        </p>
                    </div>
                    <Button asChild className="gap-2 shadow-sm">
                        <Link href={routes.create.url()}>
                            <Plus className="h-4 w-4" />
                            Créer un atelier
                        </Link>
                    </Button>
                </div>

                <Card className="border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
                    <CardHeader className="pb-3">
                        <CardTitle>Liste des ateliers</CardTitle>
                        <CardDescription>
                            Tous les ateliers actuellement enregistrés dans la
                            base de données.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {workshops.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-8 text-center">
                                <p className="mb-4 text-sm text-muted-foreground">
                                    Aucun atelier enregistré pour le moment.
                                </p>
                                <Button asChild variant="outline">
                                    <Link href={routes.create.url()}>
                                        Créer un premier atelier
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-sidebar-border bg-muted/30 text-muted-foreground">
                                            <th className="px-6 py-4 text-left font-medium">
                                                Titre / Résumé
                                            </th>
                                            <th className="px-6 py-4 text-left font-medium">
                                                Prix
                                            </th>
                                            <th className="px-6 py-4 text-left font-medium">
                                                Durée
                                            </th>
                                            <th className="px-6 py-4 text-left font-medium">
                                                Statut
                                            </th>
                                            <th className="px-6 py-4 text-right font-medium">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-sidebar-border">
                                        {workshops.map((workshop) => (
                                            <tr
                                                key={workshop.id}
                                                className="group transition-colors hover:bg-muted/30"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-foreground transition-colors group-hover:text-primary">
                                                        {workshop.title}
                                                    </div>
                                                    {workshop.summary && (
                                                        <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                                            {workshop.summary}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-medium">
                                                    {workshop.price.toFixed(2)}{' '}
                                                    €
                                                </td>
                                                <td className="px-6 py-4 text-muted-foreground">
                                                    {(() => {
                                                        const h = Math.floor(
                                                            workshop.duration_minutes /
                                                                60,
                                                        );
                                                        const m =
                                                            workshop.duration_minutes %
                                                            60;
                                                        if (h > 0) {
                                                            return `${h}h${m > 0 ? m.toString().padStart(2, '0') : ''}`;
                                                        }
                                                        return `${m} min`;
                                                    })()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {workshop.is_active ? (
                                                        <Badge
                                                            variant="default"
                                                            className="gap-1 border-emerald-500/20 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400"
                                                        >
                                                            <Check className="h-3 w-3" />
                                                            Actif
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            variant="secondary"
                                                            className="gap-1 border-amber-500/20 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400"
                                                        >
                                                            <X className="h-3 w-3" />
                                                            Inactif
                                                        </Badge>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            asChild
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                        >
                                                            <Link
                                                                href={routes.edit.url(
                                                                    workshop.id,
                                                                )}
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive/80"
                                                            onClick={() =>
                                                                handleDeleteClick(
                                                                    workshop,
                                                                )
                                                            }
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
                    </CardContent>
                </Card>

                <Dialog
                    open={!!workshopToDelete}
                    onOpenChange={(open) => {
                        if (!open) {
                            setWorkshopToDelete(null);
                            setDeleteModalType(null);
                        }
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {deleteModalType === 'future'
                                    ? 'Attention : Événements futurs liés'
                                    : deleteModalType === 'past'
                                    ? 'Archivage de l\'atelier'
                                    : 'Confirmer la suppression'}
                            </DialogTitle>
                            <DialogDescription className="pt-4">
                                {deleteModalType === 'future' && (
                                    <>
                                        Il y a <strong>{workshopToDelete?.future_sessions_count} événement(s) futur(s)</strong> lié(s) à l'atelier "{workshopToDelete?.title}". 
                                        <br /><br />
                                        Voulez-vous annuler ces événements et archiver l'atelier en une seule action ?
                                    </>
                                )}
                                {deleteModalType === 'past' && (
                                    <>
                                        Cet atelier possède un historique de <strong>{workshopToDelete?.past_sessions_count} événement(s) passé(s)</strong>. 
                                        <br /><br />
                                        Il ne sera pas supprimé définitivement mais <strong>archivé</strong> pour conserver l'historique. Continuer ?
                                    </>
                                )}
                                {deleteModalType === 'normal' && (
                                    <>
                                        Êtes-vous sûr de vouloir supprimer définitivement l'atelier "{workshopToDelete?.title}" ? Cette action est irréversible.
                                    </>
                                )}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4">
                            <Button
                                variant="outline"
                                onClick={() => setWorkshopToDelete(null)}
                                disabled={isDeleting}
                            >
                                Annuler
                            </Button>
                            <Button
                                variant={deleteModalType === 'normal' ? 'destructive' : 'default'}
                                onClick={confirmDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting
                                    ? 'Traitement...'
                                    : deleteModalType === 'future'
                                    ? 'Annuler et archiver'
                                    : deleteModalType === 'past'
                                    ? 'Archiver l\'atelier'
                                    : 'Supprimer définitivement'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Ateliers',
            href: '/admin/workshops',
        },
    ],
};
