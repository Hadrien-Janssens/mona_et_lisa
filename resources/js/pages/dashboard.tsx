import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';

export default function Dashboard({ bookings }: { bookings: any[] }) {
    const handleCancel = (bookingId: number) => {
        if (confirm("Êtes-vous sûr de vouloir annuler cette réservation ? Un remboursement sera effectué sur votre carte.")) {
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
                <h1 className="text-3xl font-bold mb-6">Mes Réservations</h1>
                
                {bookings && bookings.length > 0 ? (
                    <div className="space-y-4">
                        {bookings.map((booking) => {
                            const isCancelable = booking.payment_status === 'paid' && new Date(booking.session.start_at).getTime() - new Date().getTime() > 48 * 60 * 60 * 1000;
                            
                            return (
                                <div key={booking.id} className="border p-6 rounded-2xl bg-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <h3 className="font-bold text-xl">{booking.session.workshop.title}</h3>
                                        <p className="text-gray-600 mt-1">
                                            {new Date(booking.session.start_at).toLocaleString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                        <p className="text-sm mt-2 text-gray-500">
                                            Places : {booking.seats} | Total : {(booking.total_price / 100).toFixed(2)} € | Statut : 
                                            <span className={`ml-2 font-medium px-2 py-1 rounded-full text-xs ${booking.payment_status === 'paid' ? 'bg-green-100 text-green-700' : booking.payment_status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {booking.payment_status === 'paid' ? 'Payé' : booking.payment_status === 'cancelled' ? 'Annulé' : booking.payment_status}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {isCancelable && (
                                            <button 
                                                onClick={() => handleCancel(booking.id)}
                                                className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium"
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
                    <div className="text-center py-16 border rounded-2xl bg-gray-50">
                        <p className="text-gray-500 mb-6 text-lg">Vous n'avez pas encore de réservations.</p>
                        <a href="/" className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                            Voir les ateliers
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
