import Button from './Button';
import CheckoutModal from './CheckoutModal';
import ProgressBar from './ProgressBar';
import Sticker from './Sticker';
import StickerRayure from './StickerRayure';

type CardSessionProps = {
    session: any;
    index?: number;
};

export default function CardSession({ session, index = 0 }: CardSessionProps) {
    const stickerVariant = index % 3;

    return (
        <div
            key={session.id}
            className="group relative z-10 flex w-70 flex-col justify-between rounded-3xl border-2 border-primary bg-background px-5 py-8 pb-5 shadow transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-0"
        >
            {stickerVariant === 0 && (
                <Sticker className="absolute -top-4 left-25 z-50 w-20 -rotate-10 text-sticker-primary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
            )}
            {stickerVariant === 1 && (
                <Sticker className="absolute -top-4 left-25 z-50 w-20 -rotate-10 text-sticker-secondary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
            )}
            {stickerVariant === 2 && (
                <StickerRayure className="absolute -top-4 left-25 z-50 w-20 -rotate-10 text-sticker-secondary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
            )}

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
