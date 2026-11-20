import { useForm } from '@inertiajs/react';
import { Loader2, Save, Image as ImageIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { update as adminContentUpdate } from '@/routes/admin/content';

interface ImageSlotProps {
    id: string;
    label: string;
    subtitle: string;
    currentUrl?: string | null;
    selectedFile: File | null;
    previewUrl: string | null;
    onFileSelect: (file: File | null) => void;
}

function ImageSlot({
    id,
    label,
    subtitle,
    currentUrl,
    selectedFile,
    previewUrl,
    onFileSelect,
}: ImageSlotProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        onFileSelect(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const displayUrl = previewUrl || currentUrl;

    return (
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-sidebar-border bg-card p-4 transition-all hover:border-sidebar-border/80">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <div className="flex items-center gap-2">
                        <Label
                            htmlFor={id}
                            className="cursor-pointer text-sm font-semibold"
                        >
                            {label}
                        </Label>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {subtitle}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {/* Miniature / Preview */}
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-sidebar-border bg-muted/40 shadow-xs">
                    {displayUrl ? (
                        <img
                            src={displayUrl}
                            alt={label}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center p-2 text-center text-muted-foreground">
                            <ImageIcon className="h-6 w-6 opacity-40" />
                            <span className="mt-1 text-[10px]">Aucune</span>
                        </div>
                    )}
                </div>

                {/* Input & Actions */}
                <div className="flex-1 space-y-2">
                    <Input
                        ref={inputRef}
                        id={id}
                        type="file"
                        accept="image/*"
                        className="cursor-pointer text-xs file:cursor-pointer file:text-xs focus-visible:ring-primary"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            onFileSelect(file);
                        }}
                    />

                    {selectedFile && (
                        <div className="flex items-center justify-between gap-2">
                            <span className="max-w-[180px] truncate text-[11px] text-muted-foreground">
                                {selectedFile.name}
                            </span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleClear}
                                className="h-6 px-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                                <X className="mr-1 h-3 w-3" />
                                Annuler
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function AboutSettings({ initialData }: { initialData: any }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        content: {
            title: initialData?.title || '',
            description: initialData?.description || '',
        },
        default_images: {} as Record<number, File>,
        hover_images: {} as Record<number, File>,
    });

    const [files, setFiles] = useState<{
        default_0: File | null;
        default_1: File | null;
        hover_0: File | null;
        hover_1: File | null;
    }>({
        default_0: null,
        default_1: null,
        hover_0: null,
        hover_1: null,
    });

    const [previews, setPreviews] = useState<{
        default_0: string | null;
        default_1: string | null;
        hover_0: string | null;
        hover_1: string | null;
    }>({
        default_0: null,
        default_1: null,
        hover_0: null,
        hover_1: null,
    });

    const handleFileChange = (
        type: 'default' | 'hover',
        index: 0 | 1,
        file: File | null,
    ) => {
        const key = `${type}_${index}` as const;

        setPreviews((prev) => {
            if (prev[key]) {
                URL.revokeObjectURL(prev[key]!);
            }

            return {
                ...prev,
                [key]: file ? URL.createObjectURL(file) : null,
            };
        });

        setFiles((prev) => ({
            ...prev,
            [key]: file,
        }));

        if (type === 'default') {
            setData((prev) => {
                const next = { ...prev.default_images };

                if (file) {
                    next[index] = file;
                } else {
                    delete next[index];
                }

                return { ...prev, default_images: next };
            });
        } else {
            setData((prev) => {
                const next = { ...prev.hover_images };

                if (file) {
                    next[index] = file;
                } else {
                    delete next[index];
                }

                return { ...prev, hover_images: next };
            });
        }
    };

    // Nettoyer les ObjectURL au démontage
    useEffect(() => {
        return () => {
            Object.values(previews).forEach((url) => {
                if (url) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [previews]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(adminContentUpdate({ section: 'about' }).url, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                Object.values(previews).forEach((url) => {
                    if (url) {
                        URL.revokeObjectURL(url);
                    }
                });

                setPreviews({
                    default_0: null,
                    default_1: null,
                    hover_0: null,
                    hover_1: null,
                });

                setFiles({
                    default_0: null,
                    default_1: null,
                    hover_0: null,
                    hover_1: null,
                });

                setData((prev) => ({
                    ...prev,
                    default_images: {},
                    hover_images: {},
                }));
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <Card className="border-sidebar-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle>À propos (About)</CardTitle>
                    <CardDescription>
                        Modifiez la présentation et configurez individuellement
                        les 4 images avec prévisualisation en direct.
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

                    <div className="space-y-6">
                        <div>
                            <Label className="text-base font-semibold">
                                Photos de présentation (4 emplacements
                                distincts)
                            </Label>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Chaque portrait dispose de sa photo normale
                                (premier plan) et de sa photo au survol. Vous
                                visualisez la miniature instantanément dès que
                                vous choisissez un fichier.
                            </p>
                        </div>

                        {/* Portrait 1 - Mona */}
                        <div className="space-y-3 rounded-xl border border-sidebar-border/70 bg-muted/10 p-4">
                            <div className="flex items-center gap-2">
                                <span className="font-titre-lemon text-sm text-primary">
                                    Portrait 1 — Mona
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    (carte de gauche sur le site)
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <ImageSlot
                                    id="about-m-default"
                                    label="Photo Mona — Premier plan"
                                    subtitle="Affichée par défaut sur la première carte"
                                    currentUrl={
                                        initialData?.default_images?.[0]
                                    }
                                    selectedFile={files.default_0}
                                    previewUrl={previews.default_0}
                                    onFileSelect={(file) =>
                                        handleFileChange('default', 0, file)
                                    }
                                />
                                <ImageSlot
                                    id="about-m-hover"
                                    label="Photo Mona — Au survol"
                                    subtitle="S'affiche lorsque la première carte est survolée"
                                    currentUrl={initialData?.hover_images?.[0]}
                                    selectedFile={files.hover_0}
                                    previewUrl={previews.hover_0}
                                    onFileSelect={(file) =>
                                        handleFileChange('hover', 0, file)
                                    }
                                />
                            </div>
                        </div>

                        {/* Portrait 2 - Lisa */}
                        <div className="space-y-3 rounded-xl border border-sidebar-border/70 bg-muted/10 p-4">
                            <div className="flex items-center gap-2">
                                <span className="font-titre-lemon text-sm text-primary">
                                    Portrait 2 — Lisa
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    (carte de droite sur le site)
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <ImageSlot
                                    id="about-l-default"
                                    label="Photo Lisa — Premier plan"
                                    subtitle="Affichée par défaut sur la deuxième carte"
                                    currentUrl={
                                        initialData?.default_images?.[1]
                                    }
                                    selectedFile={files.default_1}
                                    previewUrl={previews.default_1}
                                    onFileSelect={(file) =>
                                        handleFileChange('default', 1, file)
                                    }
                                />
                                <ImageSlot
                                    id="about-l-hover"
                                    label="Photo Lisa — Au survol"
                                    subtitle="S'affiche lorsque la deuxième carte est survolée"
                                    badgeLabel="Survol"
                                    currentUrl={initialData?.hover_images?.[1]}
                                    selectedFile={files.hover_1}
                                    previewUrl={previews.hover_1}
                                    onFileSelect={(file) =>
                                        handleFileChange('hover', 1, file)
                                    }
                                />
                            </div>
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
