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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { update as adminContentUpdate } from '@/routes/admin/content';

export default function AboutSettings({ initialData }: { initialData: any }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        content: {
            title: initialData?.title || '',
            description: initialData?.description || '',
        },
        default_images: null as FileList | null,
        hover_images: null as FileList | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(adminContentUpdate({ section: 'about' }), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <form onSubmit={submit}>
            <Card className="border-sidebar-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle>À propos (About)</CardTitle>
                    <CardDescription>
                        Modifiez la section de présentation, incluant les images
                        au survol.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                        <Label htmlFor="description">
                            Texte de présentation
                        </Label>
                        <Textarea
                            id="description"
                            value={data.content.description}
                            onChange={(e) =>
                                setData('content', {
                                    ...data.content,
                                    description: e.target.value,
                                })
                            }
                            rows={6}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 rounded-lg border border-sidebar-border bg-muted/10 p-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="default_images">
                                Images par défaut (premier plan)
                            </Label>
                            <Input
                                id="default_images"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) =>
                                    setData('default_images', e.target.files)
                                }
                            />
                            <p className="text-xs text-muted-foreground">
                                Sélectionnez 2 images.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hover_images">
                                Images alternatives (au survol)
                            </Label>
                            <Input
                                id="hover_images"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) =>
                                    setData('hover_images', e.target.files)
                                }
                            />
                            <p className="text-xs text-muted-foreground">
                                Sélectionnez les 2 images qui s'afficheront au
                                survol.
                            </p>
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
