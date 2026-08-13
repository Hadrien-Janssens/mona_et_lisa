import { Link } from '@inertiajs/react';

type CardSessionProps = {
    session: any;
};

export default function CardSession({ session }: CardSessionProps) {
    console.log(session);

    return (
        <div
            key={session.id}
            className="relative z-10 flex w-70 flex-col justify-between rounded-3xl border-2 border-primary bg-background px-5 py-8 pb-5 shadow transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-0"
        >
            <div className="mb-4">
                <p>{session.workshop.title}</p>
                <p className="mb-1 text-lg font-bold">
                    {new Date(session.start_at).toLocaleString('fr-FR', {
                        // weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
                <p className="text-sm text-gray-600">
                    Places max: {session.max_participants}
                </p>
            </div>
            <Link
                href={`/reserver/${session.id}`}
                className="rounded-xl bg-black px-4 py-2 text-center text-white transition-colors hover:bg-gray-800"
            >
                Réserver
            </Link>
        </div>
    );
}
