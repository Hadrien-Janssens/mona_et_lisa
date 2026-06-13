import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Nav from './components/Nav';
import Footer from './components/Footer';

const Atelier = ({ workshop }: { workshop: any }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Head title={workshop.title} />
            <Nav />
            
            <main className="flex-1 max-w-5xl mx-auto py-12 px-4 w-full mt-24">
                <div className="mb-8">
                    <Link href="/" className="text-blue-600 hover:underline">&larr; Retour aux ateliers</Link>
                </div>

                <div className="flex justify-between items-start mb-8">
                    <h1 className="text-4xl font-bold">{workshop.title}</h1>
                    <p className="text-3xl font-semibold bg-amber-100 px-4 py-2 rounded-xl">{workshop.price / 100}€</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Description</h2>
                        <div className="prose text-gray-700 whitespace-pre-wrap">
                            {workshop.description}
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Galerie</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {workshop.images && workshop.images.length > 0 ? (
                                workshop.images.map((img: any) => (
                                    <img key={img.id} src={`/storage/${img.path}`} alt="Galerie" className="w-full h-48 object-cover rounded-xl" />
                                ))
                            ) : (
                                <p className="text-gray-500 italic">Aucune image disponible.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-3xl">
                    <h2 className="text-2xl font-bold mb-6">Prochaines Sessions</h2>
                    {workshop.sessions && workshop.sessions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {workshop.sessions.map((session: any) => (
                                <div key={session.id} className="bg-white border shadow-sm p-6 rounded-2xl flex flex-col justify-between">
                                    <div className="mb-4">
                                        <p className="font-bold text-lg mb-1">{new Date(session.start_at).toLocaleString('fr-FR', {
                                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}</p>
                                        <p className="text-sm text-gray-600">Places max: {session.max_participants}</p>
                                    </div>
                                    <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors">Réserver</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">Aucune session prévue pour le moment.</p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Atelier;
