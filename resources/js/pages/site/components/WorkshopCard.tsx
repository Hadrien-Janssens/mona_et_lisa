import { Link } from '@inertiajs/react';

const WorkshopCard = ({ workshop }: { workshop: any }) => {
    return (
        <div className="rounded-3xl border p-5">
            {workshop.cover_image && (
                <img src={`/storage/${workshop.cover_image.path}`} alt={workshop.title} className="w-full h-48 object-cover rounded-xl mb-4" />
            )}
            <p className="font-bold text-lg">{workshop.title}</p>
            <p className="text-gray-600 my-2">
                {workshop.summary || 'Aucun résumé disponible.'}
            </p>
            <p className="font-semibold">{workshop.price / 100}€ / p.p</p>
            <Link href={`/ateliers/${workshop.slug}`} className="mt-4 inline-block bg-black text-white px-4 py-2 rounded">
                Découvrir
            </Link>
        </div>
    );
};

export default WorkshopCard;
