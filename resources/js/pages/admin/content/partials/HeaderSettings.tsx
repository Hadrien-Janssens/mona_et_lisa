import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { update as adminContentUpdate } from '@/routes/admin/content';

export default function HeaderSettings({ initialData }: { initialData: any }) {
    const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
        content: {
            title: initialData?.title || '',
            subtitle: initialData?.subtitle || '',
            button1_label: initialData?.button1_label || '',
            button2_label: initialData?.button2_label || '',
        },
        images: null as FileList | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(adminContentUpdate({ section: 'header' }), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <form onSubmit={submit}>
            <Card className="border-sidebar-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle>En-tête (Header)</CardTitle>
                    <CardDescription>
                        Modifiez le texte d'accroche principal et les boutons d'action.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre principal</Label>
                        <Input
                            id="title"
                            value={data.content.title}
                            onChange={(e) => setData('content', { ...data.content, title: e.target.value })}
                            placeholder="ex: Bienvenue chez Mona & Lisa"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="subtitle">Sous-titre</Label>
                        <Textarea
                            id="subtitle"
                            value={data.content.subtitle}
                            onChange={(e) => setData('content', { ...data.content, subtitle: e.target.value })}
                            placeholder="Texte de présentation court"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="button1_label">Bouton 1 (Label)</Label>
                            <Input
                                id="button1_label"
                                value={data.content.button1_label}
                                onChange={(e) => setData('content', { ...data.content, button1_label: e.target.value })}
                                placeholder="ex: Voir nos ateliers"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="button2_label">Bouton 2 (Label)</Label>
                            <Input
                                id="button2_label"
                                value={data.content.button2_label}
                                onChange={(e) => setData('content', { ...data.content, button2_label: e.target.value })}
                                placeholder="ex: Nous contacter"
                            />
                        </div>
                    </div>

                    {/* Basic Image Upload - Note: React handles FileList in state */}
                    <div className="space-y-2">
                        <Label htmlFor="images">Photos (3 emplacements)</Label>
                        <Input
                            id="images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setData('images', e.target.files)}
                        />
                        <p className="text-xs text-muted-foreground">Sélectionnez jusqu'à 3 images.</p>
                    </div>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t border-sidebar-border px-6 py-4 flex items-center justify-end gap-2">
                    {recentlySuccessful && <p className="text-sm text-emerald-600 mr-2">Enregistré avec succès !</p>}
                    <Button type="submit" disabled={processing}>
                        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Enregistrer
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
