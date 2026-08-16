import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Nav from './components/Nav';
import Footer from './components/Footer';

import { useForm } from '@inertiajs/react';
import { activate } from '@/routes/checkout';
import Button from './components/Button';

const CheckoutSuccess = ({
    session_id,
    needs_password,
    email,
}: {
    session_id?: string;
    needs_password?: boolean;
    email?: string;
}) => {
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
        <div className="flex flex-col">
            <Head title="Paiement validé" />
            <Nav />

            <main className="mx-auto mt-12 w-full max-w-2xl flex-1 px-4 pt-24 pb-10 text-center">
                <h1 className="mb-4 text-4xl font-bold">
                    Merci pour votre réservation !
                </h1>
                <p className="mb-8">
                    Votre paiement a été traité avec succès. Vous allez recevoir
                    un email de confirmation d'ici quelques minutes.
                </p>

                {needs_password && (
                    <div className="my-10 mb-8 w-fit rounded-sm border border-primary p-8 text-left shadow">
                        <h2 className="mb-4 text-2xl font-bold">
                            Dernière étape{' '}
                            <span className="text-sm">
                                (optionnel) : Créez votre mot de passe
                            </span>
                        </h2>
                        <p className="mb-6">
                            Pour pouvoir annuler votre réservation ou voir vos
                            prochains ateliers, veuillez définir un mot de passe
                            pour votre compte.
                        </p>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    disabled
                                    className="w-full cursor-not-allowed rounded-sm border border-primary p-1"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Mot de passe
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className="w-full rounded-sm border border-primary p-1 focus:border-black focus:ring-black"
                                    required
                                    minLength={8}
                                />
                                {errors.password && (
                                    <div className="mt-1 text-sm text-red-500">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Confirmez le mot de passe
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-sm border border-primary p-1 focus:border-black focus:ring-black"
                                    required
                                    minLength={8}
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="submit" disabled={processing}>
                                    <Button>
                                        {' '}
                                        {processing
                                            ? 'Activation...'
                                            : 'Activer mon compte'}
                                    </Button>
                                </button>
                                <Link href="/">
                                    <Button variant="primary">
                                        <Link href="/">Retour à l'accueil</Link>
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CheckoutSuccess;
