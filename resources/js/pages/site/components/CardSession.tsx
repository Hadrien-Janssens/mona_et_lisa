import Button from './Button';
import CheckoutModal from './CheckoutModal';
import ProgressBar from './ProgressBar';

type CardSessionProps = {
    session: any;
};

export default function CardSession({ session }: CardSessionProps) {
    return (
        <div
            key={session.id}
            className="relative z-10 flex w-70 flex-col justify-between rounded-3xl border-2 border-primary bg-background px-5 py-8 pb-5 shadow transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-0"
        >
            <div className="mb-4 flex flex-col">
                <p> {session.workshop.title}</p>
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
                <div className="mt-2">
                    <ProgressBar
                        value={session.booked_seats_count ?? 0}
                        max={session.max_participants}
                    />
                </div>
            </div>

            <div className="self-end">
                <CheckoutModal session={session}>
                    <Button>S'inscrire</Button>
                </CheckoutModal>
            </div>
        </div>
    );
}
