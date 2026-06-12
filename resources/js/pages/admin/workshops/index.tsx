import { Head, Link, router } from '@inertiajs/react';
import * as routes from '@/routes/admin/workshops';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash, Plus, Check, X } from 'lucide-react';

interface Workshop {
    id: number;
    title: string;
    slug: string;
    summary: string | null;
    price: number;
    duration_minutes: number;
    is_active: boolean;
}

interface IndexProps {
    workshops: Workshop[];
}

export default function Index({ workshops }: IndexProps) {
    const handleDelete = (workshop: Workshop) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'atelier "${workshop.title}" ?`)) {
            const routeDef = routes.destroy(workshop.id);
            router.delete(routeDef.url);
        }
    };

    return (
        <>
            <Head title="Gestion des Ateliers" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Gestion des Ateliers</h1>
                        <p className="text-sm text-muted-foreground">
                            Créez, modifiez ou supprimez les ateliers proposés sur la plateforme.
                        </p>
                    </div>
                    <Button asChild className="gap-2 shadow-sm">
                        <Link href={routes.create.url()}>
                            <Plus className="h-4 w-4" />
                            Créer un atelier
                        </Link>
                    </Button>
                </div>

                <Card className="border-sidebar-border/70 dark:border-sidebar-border shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle>Liste des ateliers</CardTitle>
                        <CardDescription>
                            Tous les ateliers actuellement enregistrés dans la base de données.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {workshops.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-8 text-center">
                                <p className="text-sm text-muted-foreground mb-4">Aucun atelier enregistré pour le moment.</p>
                                <Button asChild variant="outline">
                                    <Link href={routes.create.url()}>Créer un premier atelier</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-sidebar-border bg-muted/30 text-muted-foreground">
                                            <th className="px-6 py-4 text-left font-medium">Titre / Résumé</th>
                                            <th className="px-6 py-4 text-left font-medium">Prix</th>
                                            <th className="px-6 py-4 text-left font-medium">Durée</th>
                                            <th className="px-6 py-4 text-left font-medium">Statut</th>
                                            <th className="px-6 py-4 text-right font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-sidebar-border">
                                        {workshops.map((workshop) => (
                                            <tr 
                                                key={workshop.id} 
                                                className="group hover:bg-muted/30 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        {workshop.title}
                                                    </div>
                                                    {workshop.summary && (
                                                        <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                                            {workshop.summary}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-medium">
                                                    {workshop.price.toFixed(2)} €
                                                </td>
                                                <td className="px-6 py-4 text-muted-foreground">
                                                    {workshop.duration_minutes} min ({workshop.duration_minutes / 60}h)
                                                </td>
                                                <td className="px-6 py-4">
                                                    {workshop.is_active ? (
                                                        <Badge variant="default" className="gap-1 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 dark:text-emerald-400">
                                                            <Check className="h-3 w-3" />
                                                            Actif
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="gap-1 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20 dark:text-amber-400">
                                                            <X className="h-3 w-3" />
                                                            Inactif
                                                        </Badge>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button 
                                                            asChild 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                        >
                                                            <Link href={routes.edit.url(workshop.id)}>
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-8 w-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                                                            onClick={() => handleDelete(workshop)}
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Ateliers',
            href: '/admin/workshops',
        },
    ],
};
