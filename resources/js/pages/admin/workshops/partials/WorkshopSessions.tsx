import { useForm, router } from '@inertiajs/react';
import workshopSessions from '@/routes/admin/workshops/sessions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Loader2, Plus, Trash2, X, Check, Calendar, Users, Edit as EditIcon } from 'lucide-react';
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

    const [editingSessionId, setEditingSessionId] = useState<number | null>(null);
    const {
        data: editSessionData,
        setData: setEditSessionData,
        patch: patchSession,
        processing: editSessionProcessing,
        errors: editSessionErrors,
        reset: resetEditSession,
    } = useForm({
        start_at: '',
        max_participants: '',
    });

    const handleSessionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postSession(workshopSessions.store(workshop.id).url, {
            onSuccess: () => resetSession(),
        });
    };

    const startEditingSession = (session: WorkshopSession) => {
        setEditingSessionId(session.id);
        const date = new Date(session.start_at);
        const isoString = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        setEditSessionData({
            start_at: isoString,
            max_participants: session.max_participants.toString(),
        });
    };

    const handleEditSessionSubmit = (e: React.FormEvent, sessionId: number) => {
        e.preventDefault();
        patchSession(workshopSessions.update({ workshop: workshop.id, session: sessionId }).url, {
            onSuccess: () => {
                setEditingSessionId(null);
                resetEditSession();
            },
        });
    };

    const handleDeleteSession = (sessionId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce créneau ?')) {
            router.delete(workshopSessions.destroy({ workshop: workshop.id, session: sessionId }).url);
        }
    };

    return (
        <Card className="border-sidebar-border/70 dark:border-sidebar-border shadow-sm">
            <CardHeader>
                <CardTitle>Sessions (Créneaux)</CardTitle>
                <CardDescription>
                    Gérez les différentes dates et heures auxquelles cet atelier aura lieu.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Session Form */}
                <form onSubmit={handleSessionSubmit} className="space-y-4 border-b pb-6 border-sidebar-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="start_at">Date et heure de début</Label>
                            <Input
                                id="start_at"
                                type="datetime-local"
                                value={sessionData.start_at}
                                onChange={(e) => setSessionData('start_at', e.target.value)}
                                className="focus-visible:ring-primary"
                            />
                            <InputError message={sessionErrors.start_at} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="max_participants">Nombre max. de participants</Label>
                            <Input
                                id="max_participants"
                                type="number"
                                min="1"
                                value={sessionData.max_participants}
                                onChange={(e) => setSessionData('max_participants', e.target.value)}
                                className="focus-visible:ring-primary"
                            />
                            <InputError message={sessionErrors.max_participants} />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={sessionProcessing}>
                            {sessionProcessing ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Ajout en cours...
                                </>
                            ) : (
                                <>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Ajouter le créneau
                                </>
                            )}
                        </Button>
                    </div>
                </form>

                {/* Existing Sessions List */}
                {!workshop.sessions || workshop.sessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-sidebar-border rounded-lg bg-muted/20">
                        <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium text-muted-foreground">Aucun créneau planifié</p>
                        <p className="text-xs text-muted-foreground mt-1">Ajoutez votre première session ci-dessus.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {workshop.sessions.map((session) => (
                            <div 
                                key={session.id} 
                                className="flex flex-col md:flex-row gap-4 justify-between md:items-center p-4 border border-sidebar-border rounded-lg bg-card"
                            >
                                {editingSessionId === session.id ? (
                                    <form onSubmit={(e) => handleEditSessionSubmit(e, session.id)} className="flex-1 flex flex-col md:flex-row gap-4 items-end">
                                        <div className="space-y-1 w-full md:w-auto flex-1">
                                            <Label htmlFor={`edit_start_${session.id}`} className="text-xs">Date et heure</Label>
                                            <Input
                                                id={`edit_start_${session.id}`}
                                                type="datetime-local"
                                                value={editSessionData.start_at}
                                                onChange={(e) => setEditSessionData('start_at', e.target.value)}
                                            />
                                            <InputError message={editSessionErrors.start_at} />
                                        </div>
                                        <div className="space-y-1 w-full md:w-32">
                                            <Label htmlFor={`edit_max_${session.id}`} className="text-xs">Max participants</Label>
                                            <Input
                                                id={`edit_max_${session.id}`}
                                                type="number"
                                                min="1"
                                                value={editSessionData.max_participants}
                                                onChange={(e) => setEditSessionData('max_participants', e.target.value)}
                                            />
                                            <InputError message={editSessionErrors.max_participants} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button type="submit" size="sm" disabled={editSessionProcessing}>
                                                <Check className="h-4 w-4 mr-1" /> Enregistrer
                                            </Button>
                                            <Button type="button" size="sm" variant="outline" onClick={() => setEditingSessionId(null)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div className="flex flex-col">
                                            <div className="font-medium text-foreground flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                {new Date(session.start_at).toLocaleDateString('fr-FR', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                            <div className="text-sm flex items-center gap-2 text-muted-foreground mt-1">
                                                <Users className="h-4 w-4" />
                                                {session.booked_seats_count} / {session.max_participants} participants
                                                {session.spots_left === 0 ? (
                                                    <Badge variant="destructive" className="ml-2 text-[10px] py-0">Complet</Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="ml-2 text-[10px] py-0">{session.spots_left} places dispo.</Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => startEditingSession(session)}
                                            >
                                                <EditIcon className="h-4 w-4 mr-1.5" />
                                                Modifier
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="text-destructive hover:bg-destructive/10 hover:text-destructive border-transparent"
                                                onClick={() => handleDeleteSession(session.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
