import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Nav from './components/Nav';
import Footer from './components/Footer';

const Checkout = ({ session }: { session: any }) => {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        birthdate: '',
        seats: 1,
    });

    const workshop = session.workshop;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/reserver/${session.id}`);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Head title={`Réserver ${workshop?.title}`} />
            <Nav />
            
            <main className="flex-1 max-w-3xl mx-auto py-12 px-4 w-full mt-24">
                <div className="mb-8">
                    <Link href={`/ateliers/${workshop?.slug}`} className="text-blue-600 hover:underline">&larr; Retour à l'atelier</Link>
                </div>

                <div className="bg-white border rounded-3xl p-8 shadow-sm">
                    <h1 className="text-3xl font-bold mb-4">Réservation</h1>
                    <div className="bg-amber-50 p-4 rounded-xl mb-8">
                        <h2 className="font-bold text-lg">{workshop?.title}</h2>
                        <p className="text-gray-700">
                            Session du : {new Date(session.start_at).toLocaleString('fr-FR', {
                                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                        </p>
                        <p className="font-semibold mt-2">Prix par personne : {workshop?.price / 100}€</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                <input 
                                    type="text" 
                                    value={data.first_name} 
                                    onChange={e => setData('first_name', e.target.value)}
                                    className="w-full border-gray-300 rounded-xl shadow-sm focus:border-black focus:ring-black"
                                    required
                                />
                                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                <input 
                                    type="text" 
                                    value={data.last_name} 
                                    onChange={e => setData('last_name', e.target.value)}
                                    className="w-full border-gray-300 rounded-xl shadow-sm focus:border-black focus:ring-black"
                                    required
                                />
                                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input 
                                type="email" 
                                value={data.email} 
                                onChange={e => setData('email', e.target.value)}
                                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-black focus:ring-black"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone (optionnel)</label>
                                <input 
                                    type="tel" 
                                    value={data.phone} 
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full border-gray-300 rounded-xl shadow-sm focus:border-black focus:ring-black"
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                <input 
                                    type="date" 
                                    value={data.birthdate} 
                                    onChange={e => setData('birthdate', e.target.value)}
                                    className="w-full border-gray-300 rounded-xl shadow-sm focus:border-black focus:ring-black"
                                    required
                                />
                                {errors.birthdate && <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de places</label>
                            <select 
                                value={data.seats} 
                                onChange={e => setData('seats', parseInt(e.target.value))}
                                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-black focus:ring-black"
                            >
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                            {errors.seats && <p className="text-red-500 text-sm mt-1">{errors.seats}</p>}
                        </div>

                        <div className="pt-4 border-t flex justify-between items-center">
                            <span className="text-xl font-bold">Total: {(workshop?.price / 100) * data.seats}€</span>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors font-bold disabled:opacity-50"
                            >
                                {processing ? 'Redirection Stripe...' : 'Payer'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout;
