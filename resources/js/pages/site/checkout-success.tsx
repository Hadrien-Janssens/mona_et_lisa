import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Nav from './components/Nav';
import Footer from './components/Footer';

const CheckoutSuccess = ({ session_id }: { session_id?: string }) => {
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
                
                <Link href="/" className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors font-bold inline-block">
                    Retour à l'accueil
                </Link>
            </main>

            <Footer />
        </div>
    );
};

export default CheckoutSuccess;
