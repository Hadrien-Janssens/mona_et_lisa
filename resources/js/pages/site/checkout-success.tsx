import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Nav from './components/Nav';
import Footer from './components/Footer';

import { useForm } from '@inertiajs/react';
import { activate } from '@/routes/checkout';

const CheckoutSuccess = ({ session_id, needs_password, email }: { session_id?: string, needs_password?: boolean, email?: string }) => {
    const { data, setData, post, processing, errors } = useForm({
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(activate.url());
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Head title="Paiement validé" />
            <Nav />
            
            <main className="flex-1 max-w-2xl mx-auto py-24 px-4 w-full mt-12 text-center">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h1 className="text-4xl font-bold mb-4">Merci pour votre réservation !</h1>
                <p className="text-xl text-gray-600 mb-8">Votre paiement a été traité avec succès. Vous allez recevoir un email de confirmation d'ici quelques minutes.</p>

                {needs_password && (
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8 text-left">
                        <h2 className="text-2xl font-bold mb-4">Dernière étape : Créez votre mot de passe</h2>
                        <p className="text-gray-600 mb-6">Pour pouvoir annuler votre réservation ou voir vos prochains ateliers, veuillez définir un mot de passe pour votre compte.</p>
                        
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" value={data.email} disabled className="w-full border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                                <input 
                                    type="password" 
                                    value={data.password} 
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                    required
                                    minLength={8}
                                />
                                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmez le mot de passe</label>
                                <input 
                                    type="password" 
                                    value={data.password_confirmation} 
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg focus:ring-black focus:border-black"
                                    required
                                    minLength={8}
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-bold disabled:opacity-50"
                            >
                                {processing ? 'Activation...' : 'Activer mon compte'}
                            </button>
                        </form>
                    </div>
                )}
                
                <Link href="/" className="bg-white text-black border-2 border-black px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors font-bold inline-block">
                    Retour à l'accueil
                </Link>
            </main>

            <Footer />
        </div>
    );
};

export default CheckoutSuccess;
