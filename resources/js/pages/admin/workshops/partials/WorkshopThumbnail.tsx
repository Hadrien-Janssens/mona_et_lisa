import { useForm, router } from '@inertiajs/react';
import { Image as ImageIcon, Loader2, Trash2, Upload } from 'lucide-react';
import InputError from '@/components/input-error';
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
import thumbnailRoutes from '@/routes/admin/workshops/thumbnail';
import type { Workshop } from '@/types';

interface WorkshopThumbnailProps {
    workshop: Workshop;
}

export default function WorkshopThumbnail({
    workshop,
}: WorkshopThumbnailProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        thumbnail: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.thumbnail) {
            return;
        }

        post(thumbnailRoutes.store(workshop.id).url, {
            forceFormData: true,
            preserveScroll: true,
            only: ['workshop'],
            onSuccess: () => {
                reset();
                const fileInput = document.getElementById(
                    'thumbnail-upload-input',
                ) as HTMLInputElement;

                if (fileInput) {
                    fileInput.value = '';
                }
            },
        });
    };

    const handleDelete = () => {
        if (confirm('Supprimer la miniature de la carte ?')) {
            router.delete(thumbnailRoutes.destroy(workshop.id).url, {
                preserveScroll: true,
                only: ['workshop'],
            });
        }
    };

    return (
        <Card className="border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
            <CardHeader>
                <CardTitle>Miniature de la carte</CardTitle>
                <CardDescription>
                    Petite image affichée sur la carte de l'atelier. Elle est
                    indépendante de la galerie. Sans miniature, la première
                    image de la galerie est utilisée.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-sidebar-border bg-muted">
                        {workshop.card_thumbnail_url ? (
                            <img
                                src={workshop.card_thumbnail_url}
                                alt={`Miniature de ${workshop.title}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="thumbnail-upload-input">
                                {workshop.card_thumbnail_url
                                    ? 'Remplacer la miniature'
                                    : 'Ajouter une miniature'}
                            </Label>
                            <Input
                                id="thumbnail-upload-input"
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        'thumbnail',
                                        e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    )
                                }
                                className="focus-visible:ring-primary"
                            />
                            <InputError message={errors.thumbnail} />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                disabled={processing || !data.thumbnail}
                            >
                                {processing ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Upload className="mr-2 h-4 w-4" />
                                )}
                                Enregistrer
                            </Button>
                            {workshop.card_thumbnail_url && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    onClick={handleDelete}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Supprimer
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
