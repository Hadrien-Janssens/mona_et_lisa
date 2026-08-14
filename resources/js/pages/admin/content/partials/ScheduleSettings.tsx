import { useForm } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import { update as adminContentUpdate } from '@/routes/admin/content';

export default function ScheduleSettings({
    initialData,
}: {
    initialData: any;
}) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        content: {
            title: initialData?.title || '',
            subtitle: initialData?.subtitle || '',
            button_label: initialData?.button_label || '',
            schedules: initialData?.schedules || [
                { day: 'Mercredi', hours: '14h - 18h' },
            ],
        },
        image: null as File | null,
    });

    const addSchedule = () => {
        setData('content', {
            ...data.content,
            schedules: [...data.content.schedules, { day: '', hours: '' }],
        });
    };

    const removeSchedule = (index: number) => {
        const newSchedules = [...data.content.schedules];
        newSchedules.splice(index, 1);
        setData('content', { ...data.content, schedules: newSchedules });
    };

    const updateSchedule = (
        index: number,
        field: 'day' | 'hours',
        value: string,
    ) => {
        const newSchedules = [...data.content.schedules];
        newSchedules[index][field] = value;
        setData('content', { ...data.content, schedules: newSchedules });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(adminContentUpdate({ section: 'schedule' }), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <form onSubmit={submit}>
            <Card className="border-sidebar-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle>Horaires et Accès</CardTitle>
                    <CardDescription>
                        Configurez les jours d'ouverture et l'image
                        d'illustration.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">Titre</Label>
                            <Input
                                id="title"
                                value={data.content.title}
                                onChange={(e) =>
                                    setData('content', {
                                        ...data.content,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Sous-titre</Label>
                            <Input
                                id="subtitle"
                                value={data.content.subtitle}
                                onChange={(e) =>
                                    setData('content', {
                                        ...data.content,
                                        subtitle: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="button_label">Label du bouton</Label>
                        <Input
                            id="button_label"
                            value={data.content.button_label}
                            onChange={(e) =>
                                setData('content', {
                                    ...data.content,
                                    button_label: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image d'illustration</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData('image', e.target.files?.[0] || null)
                            }
                        />
                    </div>

                    <div className="space-y-4 border-t border-sidebar-border pt-4">
                        <div className="flex items-center justify-between">
                            <Label>Tableau des horaires</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addSchedule}
                            >
                                <Plus className="mr-2 h-4 w-4" /> Ajouter une
                                ligne
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {data.content.schedules.map(
                                (schedule: any, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2"
                                    >
                                        <Input
                                            placeholder="Jour (ex: Mercredi)"
                                            value={schedule.day}
                                            onChange={(e) =>
                                                updateSchedule(
                                                    index,
                                                    'day',
                                                    e.target.value,
                                                )
                                            }
                                            className="flex-1"
                                        />
                                        <Input
                                            placeholder="Heures (ex: 14h - 18h)"
                                            value={schedule.hours}
                                            onChange={(e) =>
                                                updateSchedule(
                                                    index,
                                                    'hours',
                                                    e.target.value,
                                                )
                                            }
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:bg-red-100 hover:text-red-700"
                                            onClick={() =>
                                                removeSchedule(index)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ),
                            )}
                            {data.content.schedules.length === 0 && (
                                <p className="py-4 text-center text-sm text-muted-foreground italic">
                                    Aucun horaire défini.
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-end gap-2 border-t border-sidebar-border bg-muted/30 px-6 py-4">
                    {recentlySuccessful && (
                        <p className="mr-2 text-sm text-emerald-600">
                            Enregistré avec succès !
                        </p>
                    )}
                    <Button type="submit" disabled={processing}>
                        {processing ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Enregistrer
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
