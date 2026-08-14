import { useForm, router } from '@inertiajs/react';
import * as imageRoutes from '@/routes/admin/workshop-images';
import workshopImages from '@/routes/admin/workshops/images';
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
    Image as ImageIcon,
    Star,
    MoveLeft,
    MoveRight,
    Tag,
    X,
    Check,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Workshop, WorkshopImage } from '@/types';

interface WorkshopGalleryProps {
    workshop: Workshop;
}

export default function WorkshopGallery({ workshop }: WorkshopGalleryProps) {
    const {
        data: uploadData,
        setData: setUploadData,
        post: postUpload,
        processing: uploadProcessing,
        errors: uploadErrors,
        reset: resetUpload,
    } = useForm({
        image: null as File | null,
        tags: '',
    });

    const [editingTagsId, setEditingTagsId] = useState<number | null>(null);
    const [editTagsVal, setEditTagsVal] = useState<string>('');

    const handleUploadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadData.image) return;

        const routeDef = workshopImages.store(workshop.id);
        postUpload(routeDef.url, {
            forceFormData: true,
            onSuccess: () => {
                resetUpload();
                const fileInput = document.getElementById(
                    'image-upload-input',
                ) as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            },
        });
    };

    const startEditingTags = (image: WorkshopImage) => {
        setEditingTagsId(image.id);
        setEditTagsVal(image.tags.join(', '));
    };

    const saveTags = (image: WorkshopImage) => {
        router.patch(
            imageRoutes.update(image.id).url,
            {
                tags: editTagsVal
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
            },
            {
                onSuccess: () => setEditingTagsId(null),
            },
        );
    };

    const handleSetCover = (imageId: number) => {
        router.patch(imageRoutes.update(imageId).url, {
            is_cover: true,
        });
    };

    const handleDeleteImage = (imageId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
            router.delete(imageRoutes.destroy(imageId).url);
        }
    };

    const handleMove = (index: number, direction: 'up' | 'down') => {
        const imagesList = [...(workshop.images || [])];
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === imagesList.length - 1) return;

        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        const temp = imagesList[index].sort_order;
        imagesList[index].sort_order = imagesList[targetIndex].sort_order;
        imagesList[targetIndex].sort_order = temp;

        const payload = imagesList.map((img) => ({
            id: img.id,
            sort_order: img.sort_order,
        }));

        router.post(workshopImages.reorder(workshop.id).url, {
            images: payload,
        });
    };

    return (
        <Card className="border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
            <CardHeader>
                <CardTitle>Galerie Photos</CardTitle>
                <CardDescription>
                    Gérez les images d'illustration de cet atelier. Vous pouvez
                    ajouter des tags à chaque image pour les trier et définir la
                    photo de couverture.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Upload Form */}
                <form
                    onSubmit={handleUploadSubmit}
                    className="space-y-4 border-b border-sidebar-border pb-6"
                >
                    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="image-upload-input">
                                Ajouter une image
                            </Label>
                            <Input
                                id="image-upload-input"
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setUploadData(
                                        'image',
                                        e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    )
                                }
                                className="focus-visible:ring-primary"
                            />
                            <InputError message={uploadErrors.image} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="upload-tags">
                                Tags (séparés par des virgules)
                            </Label>
                            <Input
                                id="upload-tags"
                                type="text"
                                placeholder="ex: poterie, ambiance, tournage"
                                value={uploadData.tags}
                                onChange={(e) =>
                                    setUploadData('tags', e.target.value)
                                }
                                className="focus-visible:ring-primary"
                            />
                            <InputError message={uploadErrors.tags} />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={uploadProcessing || !uploadData.image}
                        >
                            {uploadProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Ajout en cours...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Ajouter l'image
                                </>
                            )}
                        </Button>
                    </div>
                </form>

                {/* Existing Gallery Grid */}
                {!workshop.images || workshop.images.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-sidebar-border bg-muted/20 p-8 text-center">
                        <ImageIcon className="mb-2 h-10 w-10 text-muted-foreground" />
                        <p className="text-sm font-medium text-muted-foreground">
                            Aucune image dans la galerie
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Uploadez votre première photo ci-dessus.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {workshop.images.map((image, index) => (
                            <div
                                key={image.id}
                                className={`group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-md ${
                                    image.is_cover
                                        ? 'border-primary ring-1 ring-primary'
                                        : 'border-sidebar-border'
                                }`}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                    <img
                                        src={image.url}
                                        alt={`Image de ${workshop.title}`}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {image.is_cover && (
                                        <div className="absolute top-2 left-2 rounded bg-primary px-2 py-0.5 text-[10px] font-semibold tracking-wider text-primary-foreground uppercase shadow">
                                            Couverture
                                        </div>
                                    )}
                                </div>

                                {/* Info and action panel */}
                                <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
                                    {/* Tags and editor */}
                                    <div>
                                        {editingTagsId === image.id ? (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    value={editTagsVal}
                                                    onChange={(e) =>
                                                        setEditTagsVal(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="h-7 px-2 py-1 text-xs focus-visible:ring-primary"
                                                    placeholder="tags séparés par des virgules"
                                                    autoFocus
                                                />
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-7 w-7 border-green-500 text-green-500 hover:bg-green-50"
                                                    onClick={() =>
                                                        saveTags(image)
                                                    }
                                                >
                                                    <Check className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-7 w-7 border-red-500 text-red-500 hover:bg-red-50"
                                                    onClick={() =>
                                                        setEditingTagsId(null)
                                                    }
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                {image.tags.length === 0 ? (
                                                    <span className="text-xs text-muted-foreground italic">
                                                        Aucun tag
                                                    </span>
                                                ) : (
                                                    image.tags.map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="secondary"
                                                            className="px-1.5 py-0 text-[10px] font-normal"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="ml-auto h-5 w-5 text-muted-foreground hover:text-primary"
                                                    onClick={() =>
                                                        startEditingTags(image)
                                                    }
                                                    title="Modifier les tags"
                                                >
                                                    <Tag className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Toolbar actions */}
                                    <div className="flex items-center justify-between border-t border-sidebar-border/50 pt-2">
                                        {/* Reorder actions */}
                                        <div className="flex items-center gap-1">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7 disabled:opacity-30"
                                                disabled={index === 0}
                                                onClick={() =>
                                                    handleMove(index, 'up')
                                                }
                                                title="Déplacer vers la gauche"
                                            >
                                                <MoveLeft className="h-3.5 w-3.5" />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7 disabled:opacity-30"
                                                disabled={
                                                    index ===
                                                    (workshop.images?.length ??
                                                        0) -
                                                        1
                                                }
                                                onClick={() =>
                                                    handleMove(index, 'down')
                                                }
                                                title="Déplacer vers la droite"
                                            >
                                                <MoveRight className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>

                                        {/* Cover & Delete */}
                                        <div className="flex items-center gap-2">
                                            {!image.is_cover && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-muted-foreground hover:bg-amber-50 hover:text-amber-500 dark:hover:bg-amber-950/20"
                                                    onClick={() =>
                                                        handleSetCover(image.id)
                                                    }
                                                    title="Définir comme couverture"
                                                >
                                                    <Star className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                                onClick={() =>
                                                    handleDeleteImage(image.id)
                                                }
                                                title="Supprimer l'image"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
