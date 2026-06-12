import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as routes from '@/routes/admin/workshops';
import type { Workshop } from '@/types';
import EditWorkshopForm from './partials/EditWorkshopForm';
import WorkshopGallery from './partials/WorkshopGallery';
import WorkshopSessions from './partials/WorkshopSessions';

interface EditProps {
    workshop: Workshop;
}

export default function Edit({ workshop }: EditProps) {
    return (
        <>
            <Head title={`Modifier : ${workshop.title}`} />
            <div className="mx-auto flex h-full w-full max-w-3xl flex-1 flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                    >
                        <Link href={routes.index.url()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="font-sans text-2xl font-bold tracking-tight">
                            Modifier l'Atelier
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Modifiez les détails de l'atelier créatif.
                        </p>
                    </div>
                </div>

                <EditWorkshopForm workshop={workshop} />
                <WorkshopGallery workshop={workshop} />
                <WorkshopSessions workshop={workshop} />
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Ateliers',
            href: '/admin/workshops',
        },
        {
            title: 'Modifier',
            href: '/admin/workshops/edit',
        },
    ],
};
