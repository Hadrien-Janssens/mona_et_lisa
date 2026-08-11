import { Link } from '@inertiajs/react';
import Badge from './Badge';
import Button from './Button';

const WorkshopCard = ({ workshop, idx }: { workshop: any; idx: number }) => {
    const rotateClass = idx % 2 === 0 ? '-rotate-1' : 'rotate-1';

    return (
        <div
            className={`relative z-10 flex w-70 flex-col justify-between rounded-3xl border-2 border-primary bg-background px-5 py-8 pb-5 shadow transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-0 ${rotateClass}`}
        >
            <Badge>Duo</Badge>
            <div className="flex gap-5">
                {workshop.cover_image && (
                    <img
                        src={`/storage/${workshop.cover_image.path}`}
                        alt={workshop.title}
                        className="mb-4 h-15 w-15 rounded-xl border border-primary object-cover"
                    />
                )}
                <div>
                    <p className="font-titre-semibold text-lg">
                        {workshop.title}
                    </p>
                    <p className="font-titre-lemon text-ternary">
                        Une toile à deux
                    </p>
                </div>
            </div>
            <p className="my-2 py-3 text-sm">
                {workshop.summary || 'Aucun résumé disponible.'}
            </p>
            <div className="flex items-center justify-between">
                <div className="-rotate-2">
                    <Button size={'sm'}>{workshop.price / 100}€/p.p</Button>
                </div>

                <Link
                    href={`/ateliers/${workshop.slug}`}
                    className="font-titre-lemon text-xl"
                >
                    Découvrir
                </Link>
            </div>
        </div>
    );
};

export default WorkshopCard;
