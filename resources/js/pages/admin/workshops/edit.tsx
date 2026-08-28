import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import * as routes from '@/routes/admin/workshops';
import type { Workshop } from '@/types';
import EditWorkshopForm from './partials/EditWorkshopForm';
import WorkshopGallery from './partials/WorkshopGallery';
import WorkshopSessions from './partials/WorkshopSessions';

interface EditProps {
    workshop: Workshop & {
        future_sessions_count: number;
        past_sessions_count: number;
    };
}

export default function Edit({ workshop }: EditProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteModalType =
        workshop.future_sessions_count > 0
            ? 'future'
            : workshop.past_sessions_count > 0
              ? 'past'
              : 'normal';

    const confirmDelete = () => {
        setIsDeleting(true);

        const routeDef = routes.destroy(workshop.id);
        const options = {
            onFinish: () => {
                setIsDeleting(false);
                setShowDeleteModal(false);
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
            <Head title={`Modifier : ${workshop.title}`} />
            <div className="mx-auto flex h-full w-full max-w-3xl flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                        >
                            <Link href={routes.index.url()}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="font-sans text-2xl font-bold tracking-tight">
                                Modifier l'Atelier
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Modifiez les détails de l'atelier créatif.
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="destructive"
                        className="gap-2"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        <Trash className="h-4 w-4" />
                        Supprimer
                    </Button>
                </div>

                <EditWorkshopForm workshop={workshop} />
                <WorkshopGallery workshop={workshop} />
                <WorkshopSessions workshop={workshop} />
            </div>

            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {deleteModalType === 'future'
                                ? 'Attention : Événements futurs liés'
                                : deleteModalType === 'past'
                                  ? "Archivage de l'atelier"
                                  : 'Confirmer la suppression'}
                        </DialogTitle>
                        <DialogDescription className="pt-4">
                            {deleteModalType === 'future' && (
                                <>
                                    Il y a{' '}
                                    <strong>
                                        {workshop.future_sessions_count}{' '}
                                        événement(s) futur(s)
                                    </strong>{' '}
                                    lié(s) à l'atelier "{workshop.title}".
                                    <br />
                                    <br />
                                    Voulez-vous annuler ces événements et
                                    archiver l'atelier en une seule action ?
                                </>
                            )}
                            {deleteModalType === 'past' && (
                                <>
                                    Cet atelier possède un historique de{' '}
                                    <strong>
                                        {workshop.past_sessions_count}{' '}
                                        événement(s) passé(s)
                                    </strong>
                                    .
                                    <br />
                                    <br />
                                    Il ne sera pas supprimé définitivement mais{' '}
                                    <strong>archivé</strong> pour conserver
                                    l'historique. Continuer ?
                                </>
                            )}
                            {deleteModalType === 'normal' && (
                                <>
                                    Êtes-vous sûr de vouloir supprimer
                                    définitivement l'atelier "{workshop.title}"
                                    ? Cette action est irréversible.
                                </>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteModal(false)}
                            disabled={isDeleting}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant={
                                deleteModalType === 'normal'
                                    ? 'destructive'
                                    : 'default'
                            }
                            onClick={confirmDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting
                                ? 'Traitement...'
                                : deleteModalType === 'future'
                                  ? 'Annuler et archiver'
                                  : deleteModalType === 'past'
                                    ? "Archiver l'atelier"
                                    : 'Supprimer définitivement'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Ateliers',
            href: '/admin/workshops',
        },
        {
            title: 'Modifier',
            href: '/admin/workshops/edit',
        },
    ],
};
