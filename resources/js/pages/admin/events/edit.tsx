import { Head, Link, useForm, router } from '@inertiajs/react';
import * as routes from '@/routes/admin/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ArrowLeft, Save, Trash, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FormEventHandler, useState } from 'react';

interface Workshop {
    id: number;
    title: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Booking {
    id: number;
    user_id: number;
    seats: number;
    total_price: number;
    payment_status: 'paid' | 'pending' | 'failed' | 'cancelled';
    created_at: string;
    user: User;
}

interface WorkshopSession {
    id: number;
    workshop_id: number;
    start_at: string;
    max_participants: number;
    bookings?: Booking[];
}

interface EditProps {
    event: WorkshopSession;
    workshops: Workshop[];
}

export default function Edit({ event, workshops }: EditProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Convert DB datetime format to local input format (YYYY-MM-DDThh:mm)
    const formattedDate = event.start_at
        ? new Date(event.start_at).toISOString().slice(0, 16)
        : '';

    const { data, setData, patch, processing, errors } = useForm({
        workshop_id: event.workshop_id.toString(),
        start_at: formattedDate,
        max_participants: event.max_participants,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(routes.update.url(event.id));
    };

    const confirmDelete = () => {
        setIsDeleting(true);
        router.delete(routes.destroy.url(event.id), {
            onFinish: () => {
                setIsDeleting(false);
                setShowDeleteModal(false);
            },
        });
    };

    return (
        <>
            <Head title="Modifier l'événement" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                if (window.history.length > 1) {
                                    window.history.back();
                                } else {
                                    router.visit(routes.index.url());
                                }
                            }}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Modifier l'Événement
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Mettez à jour les informations de cette session.
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

                <div className="mx-auto w-full max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Détails de l'événement</CardTitle>
                            <CardDescription>
                                Modifiez les informations ci-dessous.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="workshop_id">Atelier</Label>
                                    <Select
                                        value={data.workshop_id}
                                        onValueChange={(val) =>
                                            setData('workshop_id', val)
                                        }
                                    >
                                        <SelectTrigger
                                            id="workshop_id"
                                            className={
                                                errors.workshop_id
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                        >
                                            <SelectValue placeholder="Sélectionnez un atelier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {workshops.map((w) => (
                                                <SelectItem
                                                    key={w.id}
                                                    value={w.id.toString()}
                                                >
                                                    {w.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.workshop_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.workshop_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="start_at">
                                        Date et heure de début
                                    </Label>
                                    <Input
                                        id="start_at"
                                        type="datetime-local"
                                        value={data.start_at}
                                        onChange={(e) =>
                                            setData('start_at', e.target.value)
                                        }
                                        className={
                                            errors.start_at
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    {errors.start_at && (
                                        <p className="text-sm text-destructive">
                                            {errors.start_at}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="max_participants">
                                        Nombre maximum de participants
                                    </Label>
                                    <Input
                                        id="max_participants"
                                        type="number"
                                        min="1"
                                        value={data.max_participants}
                                        onChange={(e) =>
                                            setData(
                                                'max_participants',
                                                parseInt(e.target.value),
                                            )
                                        }
                                        className={
                                            errors.max_participants
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    {errors.max_participants && (
                                        <p className="text-sm text-destructive">
                                            {errors.max_participants}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        disabled={processing}
                                        onClick={() => {
                                            if (window.history.length > 1) {
                                                window.history.back();
                                            } else {
                                                router.visit(
                                                    routes.index.url(),
                                                );
                                            }
                                        }}
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="gap-2"
                                    >
                                        <Save className="h-4 w-4" />
                                        Mettre à jour l'événement
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Participants Inscrits</CardTitle>
                            <CardDescription>
                                Liste des personnes ayant réservé des places
                                pour cet événement.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!event.bookings || event.bookings.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-sidebar-border bg-muted/20 p-8 text-center">
                                    <Users className="mb-2 h-10 w-10 text-muted-foreground" />
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Aucun inscrit pour le moment
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {event.bookings.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="flex flex-col justify-between gap-4 rounded-lg border border-sidebar-border bg-card p-4 md:flex-row md:items-center"
                                        >
                                            <div className="flex flex-col">
                                                <div className="font-medium text-foreground">
                                                    {booking.user.name}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {booking.user.email}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-sm font-medium">
                                                    {booking.seats}{' '}
                                                    {booking.seats > 1
                                                        ? 'places'
                                                        : 'place'}
                                                </div>
                                                <Badge
                                                    variant={
                                                        booking.payment_status ===
                                                        'paid'
                                                            ? 'default'
                                                            : booking.payment_status ===
                                                                'pending'
                                                              ? 'secondary'
                                                              : 'destructive'
                                                    }
                                                >
                                                    {booking.payment_status ===
                                                    'paid'
                                                        ? 'Payé'
                                                        : booking.payment_status ===
                                                            'pending'
                                                          ? 'En attente'
                                                          : 'Échoué/Annulé'}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Dialog
                    open={showDeleteModal}
                    onOpenChange={setShowDeleteModal}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                            <DialogDescription className="pt-4">
                                Êtes-vous sûr de vouloir supprimer cet événement
                                ?
                                <br />
                                <br />
                                Les réservations associées risquent d'être
                                supprimées. Cette action est irréversible.
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
                                variant="destructive"
                                onClick={confirmDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting
                                    ? 'Suppression...'
                                    : 'Supprimer définitivement'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Événements', href: '/admin/events' },
        { title: 'Modifier', href: '#' },
    ],
};
