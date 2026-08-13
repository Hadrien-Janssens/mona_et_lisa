import { Head, Link } from '@inertiajs/react';
import SiteLayout from '@/layouts/site-layout';

const Atelier = ({ workshop }: { workshop: any }) => {
    return (
        <>
            <Head title={workshop.title} />

            <div className="mx-auto mt-24 w-full max-w-5xl px-4 py-12">
                <div className="mb-8">
                    <Link href="/" className="text-blue-600 hover:underline">
                        &larr; Retour aux ateliers
                    </Link>
                </div>

                <div className="mb-8 flex items-start justify-between">
                    <h1 className="text-4xl font-bold">{workshop.title}</h1>
                    <p className="rounded-xl bg-amber-100 px-4 py-2 text-3xl font-semibold">
                        {workshop.price / 100}€
                    </p>
                </div>

                <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div>
                        <h2 className="mb-4 text-2xl font-bold">Galerie</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {workshop.images && workshop.images.length > 0 ? (
                                workshop.images.map((img: any) => (
                                    <img
                                        key={img.id}
                                        src={`/storage/${img.path}`}
                                        alt="Galerie"
                                        className="h-48 w-full rounded-xl object-cover"
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 italic">
                                    Aucune image disponible.
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-4 text-2xl font-bold">Description</h2>
                        <div className="prose whitespace-pre-wrap text-gray-700">
                            {workshop.description}
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl bg-gray-50 p-8">
                    <h2 className="mb-6 text-2xl font-bold">
                        Prochaines Sessions
                    </h2>
                    {workshop.sessions && workshop.sessions.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {workshop.sessions.map((session: any) => (
                                <div
                                    key={session.id}
                                    className="flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm"
                                >
                                    <div className="mb-4">
                                        <p className="mb-1 text-lg font-bold">
                                            {new Date(
                                                session.start_at,
                                            ).toLocaleString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Places max:{' '}
                                            {session.max_participants}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/reserver/${session.id}`}
                                        className="rounded-xl bg-black px-4 py-2 text-center text-white transition-colors hover:bg-gray-800"
                                    >
                                        Réserver
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">
                            Aucune session prévue pour le moment.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

Atelier.layout = (page: React.ReactNode) => <SiteLayout>{page}</SiteLayout>;

export default Atelier;
