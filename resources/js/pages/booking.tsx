import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';

export default function Booking({ bookings }: { bookings: any[] }) {
    const handleCancel = (bookingId: number) => {
        if (
            confirm(
                'Êtes-vous sûr de vouloir annuler cette réservation ? Un remboursement sera effectué sur votre carte.',
            )
        ) {
            // @ts-ignore
            import('@inertiajs/react').then(({ router }) => {
                router.post(`/bookings/${bookingId}/cancel`);
            });
        }
    };

    return (
        <>
            <Head title="Mes Réservations" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-8">
                <h1 className="mb-6 text-3xl font-bold">Mes Réservations</h1>

                {bookings && bookings.length > 0 ? (
                    <div className="space-y-4">
                        {bookings.map((booking) => {
                            const isCancelable =
                                booking.payment_status === 'paid' &&
                                new Date(booking.session.start_at).getTime() -
                                    new Date().getTime() >
                                    48 * 60 * 60 * 1000;

                            return (
                                <div
                                    key={booking.id}
                                    className="flex flex-col items-start justify-between gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold">
                                            {booking.session.workshop.title}
                                        </h3>
                                        <p className="mt-1 text-gray-600">
                                            {new Date(
                                                booking.session.start_at,
                                            ).toLocaleString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Places : {booking.seats} | Total :{' '}
                                            {(
                                                booking.total_price / 100
                                            ).toFixed(2)}{' '}
                                            € | Statut :
                                            <span
                                                className={`ml-2 rounded-full px-2 py-1 text-xs font-medium ${booking.payment_status === 'paid' ? 'bg-green-100 text-green-700' : booking.payment_status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}
                                            >
                                                {booking.payment_status ===
                                                'paid'
                                                    ? 'Payé'
                                                    : booking.payment_status ===
                                                        'cancelled'
                                                      ? 'Annulé'
                                                      : booking.payment_status}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {isCancelable && (
                                            <button
                                                onClick={() =>
                                                    handleCancel(booking.id)
                                                }
                                                className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-medium text-red-600 transition-colors hover:bg-red-100"
                                            >
                                                Annuler ma réservation
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-2xl border bg-gray-50 py-16 text-center">
                        <p className="mb-6 text-lg text-gray-500">
                            Vous n'avez pas encore de réservations.
                        </p>
                        <a
                            href="/"
                            className="rounded-xl bg-black px-8 py-3 font-bold text-white transition-colors hover:bg-gray-800"
                        >
                            Voir les ateliers
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}

// Dashboard.layout = {
//     breadcrumbs: [
//         {
//             title: 'Dashboard',
//             href: dashboard(),
//         },
//     ],
// };
