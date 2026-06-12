import { Link, useForm } from '@inertiajs/react';
import * as routes from '@/routes/admin/workshops';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { Loader2 } from 'lucide-react';
import { Workshop } from '@/types';

interface EditWorkshopFormProps {
    workshop: Workshop;
}

export default function EditWorkshopForm({ workshop }: EditWorkshopFormProps) {
    const { data, setData, put, processing, errors, transform } = useForm({
        title: workshop.title,
        summary: workshop.summary || '',
        description: workshop.description,
        price: workshop.price.toString(),
        duration_minutes: workshop.duration_minutes.toString(),
        is_active: workshop.is_active ? '1' : '0',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        transform((data) => ({
            ...data,
            is_active: data.is_active === '1',
        }));

        const routeDef = routes.update(workshop.id);
        put(routeDef.url);
    };

    return (
        <Card className="border-sidebar-border/70 dark:border-sidebar-border shadow-sm">
            <CardHeader>
                <CardTitle>Détails de l'atelier</CardTitle>
                <CardDescription>
                    Modifiez les informations ci-dessous pour mettre à jour l'atelier.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre de l'atelier</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="ex: Initiation à la Poterie au Tour"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="focus-visible:ring-primary"
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="summary">Résumé court</Label>
                        <Input
                            id="summary"
                            type="text"
                            placeholder="ex: Découvrez les bases du tournage..."
                            value={data.summary}
                            onChange={(e) => setData('summary', e.target.value)}
                            className="focus-visible:ring-primary"
                        />
                        <InputError message={errors.summary} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description complète</Label>
                        <textarea
                            id="description"
                            rows={6}
                            placeholder="Décrivez en détail le déroulement de l'atelier, ce que les participants vont apprendre et ce qu'ils vont emporter..."
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:ring-primary"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="price">Prix (€)</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="ex: 45.00"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="focus-visible:ring-primary"
                            />
                            <InputError message={errors.price} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration_minutes">Durée (minutes)</Label>
                            <Input
                                id="duration_minutes"
                                type="number"
                                min="1"
                                placeholder="ex: 120"
                                value={data.duration_minutes}
                                onChange={(e) => setData('duration_minutes', e.target.value)}
                                className="focus-visible:ring-primary"
                            />
                            <InputError message={errors.duration_minutes} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="is_active">Statut</Label>
                            <Select
                                value={data.is_active}
                                onValueChange={(val) => setData('is_active', val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choisir le statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Actif</SelectItem>
                                    <SelectItem value="0">Inactif</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.is_active} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-sidebar-border">
                        <Button asChild variant="outline" type="button">
                            <Link href={routes.index.url()}>Annuler</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="shadow-sm">
                            {processing ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Enregistrement...
                                </>
                            ) : (
                                'Enregistrer les modifications'
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
