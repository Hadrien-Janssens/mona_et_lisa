import { useForm, router, Link } from '@inertiajs/react';
import workshopSessions from '@/routes/admin/workshops/sessions';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import {
    Loader2,
    Plus,
    Trash2,
    X,
    Check,
    Calendar,
    Users,
    Edit as EditIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Workshop, WorkshopSession } from '@/types';

interface WorkshopSessionsProps {
    workshop: Workshop;
}

export default function WorkshopSessions({ workshop }: WorkshopSessionsProps) {
    const {
        data: sessionData,
        setData: setSessionData,
        post: postSession,
        processing: sessionProcessing,
        errors: sessionErrors,
        reset: resetSession,
    } = useForm({
        start_at: '',
        max_participants: '10',
    });

    const handleSessionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postSession(workshopSessions.store(workshop.id).url, {
            onSuccess: () => resetSession(),
        });
    };

    return (
        <Card className="border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
            <CardHeader>
                <CardTitle>Sessions (Créneaux)</CardTitle>
                <CardDescription>
                    Gérez les différentes dates et heures auxquelles cet atelier
                    aura lieu.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Session Form */}
                <form
                    onSubmit={handleSessionSubmit}
                    className="space-y-4 border-b border-sidebar-border pb-6"
                >
                    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="start_at">
                                Date et heure de début
                            </Label>
                            <Input
                                id="start_at"
                                type="datetime-local"
                                value={sessionData.start_at}
                                onChange={(e) =>
                                    setSessionData('start_at', e.target.value)
                                }
                                className="focus-visible:ring-primary"
                            />
                            <InputError message={sessionErrors.start_at} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="max_participants">
                                Nombre max. de participants
                            </Label>
                            <Input
                                id="max_participants"
                                type="number"
                                min="1"
                                value={sessionData.max_participants}
                                onChange={(e) =>
                                    setSessionData(
                                        'max_participants',
                                        e.target.value,
                                    )
                                }
                                className="focus-visible:ring-primary"
                            />
                            <InputError
                                message={sessionErrors.max_participants}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={sessionProcessing}>
                            {sessionProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Ajout en cours...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Ajouter le créneau
                                </>
                            )}
                        </Button>
                    </div>
                </form>

                {/* Existing Sessions List */}
                {!workshop.sessions || workshop.sessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-sidebar-border bg-muted/20 p-8 text-center">
                        <Calendar className="mb-2 h-10 w-10 text-muted-foreground" />
                        <p className="text-sm font-medium text-muted-foreground">
                            Aucun créneau planifié
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Ajoutez votre première session ci-dessus.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {workshop.sessions.map((session) => (
                            <Link
                                key={session.id}
                                href={`/admin/events/${session.id}/edit`}
                                className="flex flex-col justify-between gap-4 rounded-lg border border-sidebar-border bg-card p-4 transition-colors hover:bg-muted/50 md:flex-row md:items-center"
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 font-medium text-foreground">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        {new Date(
                                            session.start_at,
                                        ).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        {session.booked_seats_count} /{' '}
                                        {session.max_participants} participants
                                        {session.spots_left === 0 ? (
                                            <Badge
                                                variant="destructive"
                                                className="ml-2 py-0 text-[10px]"
                                            >
                                                Complet
                                            </Badge>
                                        ) : (
                                            <Badge
                                                variant="secondary"
                                                className="ml-2 py-0 text-[10px]"
                                            >
                                                {session.spots_left} places
                                                dispo.
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
