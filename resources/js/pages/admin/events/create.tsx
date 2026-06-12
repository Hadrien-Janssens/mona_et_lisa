import { Head, Link, useForm } from '@inertiajs/react';
import * as routes from '@/routes/admin/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Workshop {
    id: number;
    title: string;
}

interface CreateProps {
    workshops: Workshop[];
}

export default function Create({ workshops }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        workshop_id: '',
        start_at: '',
        max_participants: 10,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(routes.store.url());
    };

    return (
        <>
            <Head title="Créer un événement" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={routes.index.url()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Nouvel Événement</h1>
                        <p className="text-sm text-muted-foreground">
                            Planifiez une nouvelle session pour un atelier existant.
                        </p>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Détails de l'événement</CardTitle>
                            <CardDescription>
                                Remplissez les informations ci-dessous pour planifier cette session.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="workshop_id">Atelier</Label>
                                    <Select 
                                        value={data.workshop_id} 
                                        onValueChange={(val) => setData('workshop_id', val)}
                                    >
                                        <SelectTrigger id="workshop_id" className={errors.workshop_id ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Sélectionnez un atelier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {workshops.map((w) => (
                                                <SelectItem key={w.id} value={w.id.toString()}>
                                                    {w.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.workshop_id && (
                                        <p className="text-sm text-destructive">{errors.workshop_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="start_at">Date et heure de début</Label>
                                    <Input
                                        id="start_at"
                                        type="datetime-local"
                                        value={data.start_at}
                                        onChange={(e) => setData('start_at', e.target.value)}
                                        className={errors.start_at ? 'border-destructive' : ''}
                                    />
                                    {errors.start_at && (
                                        <p className="text-sm text-destructive">{errors.start_at}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="max_participants">Nombre maximum de participants</Label>
                                    <Input
                                        id="max_participants"
                                        type="number"
                                        min="1"
                                        value={data.max_participants}
                                        onChange={(e) => setData('max_participants', parseInt(e.target.value))}
                                        className={errors.max_participants ? 'border-destructive' : ''}
                                    />
                                    {errors.max_participants && (
                                        <p className="text-sm text-destructive">{errors.max_participants}</p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <Button variant="outline" asChild disabled={processing}>
                                        <Link href={routes.index.url()}>Annuler</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing} className="gap-2">
                                        <Save className="h-4 w-4" />
                                        Enregistrer l'événement
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Événements', href: '/admin/events' },
        { title: 'Créer', href: '/admin/events/create' },
    ],
};
