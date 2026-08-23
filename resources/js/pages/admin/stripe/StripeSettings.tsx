import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { update } from '@/routes/admin/stripe';

interface Props {
    stripe_public_key: string | null;
    has_secret_key: boolean;
    has_webhook_secret: boolean;
    webhook_url: string;
}

export default function StripeSettings({
    stripe_public_key,
    has_secret_key,
    has_webhook_secret,
    webhook_url,
}: Props) {
    const isFullyConnected =
        stripe_public_key && has_secret_key && has_webhook_secret;
    const [isEditing, setIsEditing] = useState(!isFullyConnected);
    const [copied, setCopied] = useState(false);

    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            stripe_public_key: stripe_public_key || '',
            stripe_secret_key: '',
            stripe_webhook_secret: '',
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update.url(), {
            preserveScroll: true,
            onSuccess: () => {
                setData('stripe_secret_key', '');
                setData('stripe_webhook_secret', '');
                setIsEditing(false);
            },
        });
    };

    const copyWebhookUrl = () => {
        navigator.clipboard.writeText(webhook_url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <Head title="Configuration Stripe" />

            <div className="mx-auto max-w-4xl p-4 md:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Configuration Stripe
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Connectez votre compte Stripe pour accepter les
                        paiements sur votre site.
                    </p>
                </div>

                {!isEditing && isFullyConnected ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <svg
                                className="h-8 w-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-green-800">
                            Stripe est connecté et prêt à encaisser !
                        </h2>
                        <p className="mb-8 max-w-lg text-green-700">
                            Vos clés d'API sont correctement configurées. Votre
                            site peut désormais recevoir des paiements en toute
                            sécurité.
                        </p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="rounded-xl border border-green-300 bg-white px-6 py-2 font-medium text-green-700 transition-colors hover:bg-green-50"
                        >
                            Modifier mes clés
                        </button>
                    </div>
                ) : (
                    <form onSubmit={submit} className="space-y-10">
                        {/* Clés API */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                1. Clés d'API Stripe
                            </h2>

                            <div className="mb-6 flex flex-col items-start gap-3 rounded-xl bg-blue-50 p-5 text-sm text-blue-800">
                                <p>
                                    Pour connecter votre compte, vous devez
                                    récupérer vos clés d'API standard (Standard
                                    Keys).
                                    <br />
                                    Si votre clé secrète n'est plus visible,
                                    vous pouvez simplement en créer une nouvelle
                                    en cliquant sur le bouton{' '}
                                    <strong>
                                        "Créer une clé secrète"
                                    </strong>{' '}
                                    (Create secret key) sur votre tableau de
                                    bord Stripe.
                                </p>
                                <a
                                    href="https://dashboard.stripe.com/apikeys"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        ></path>
                                    </svg>
                                    Ouvrir mes clés API Stripe
                                </a>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Clé Publique (Publishable key)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.stripe_public_key}
                                        onChange={(e) =>
                                            setData(
                                                'stripe_public_key',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border-gray-300 font-mono text-sm placeholder-gray-400 focus:border-black focus:ring-black"
                                        placeholder="pk_live_..."
                                        required
                                    />
                                    {errors.stripe_public_key && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.stripe_public_key}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Clé Secrète (Secret key)
                                    </label>
                                    <input
                                        type="password"
                                        value={data.stripe_secret_key}
                                        onChange={(e) =>
                                            setData(
                                                'stripe_secret_key',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border-gray-300 font-mono text-sm placeholder-gray-400 focus:border-black focus:ring-black"
                                        placeholder={
                                            has_secret_key
                                                ? '•••••••••••••••• (Laissez vide pour conserver la clé actuelle)'
                                                : 'sk_live_...'
                                        }
                                        required={!has_secret_key}
                                    />
                                    {has_secret_key && (
                                        <p className="mt-2 text-xs text-gray-500">
                                            Une clé secrète est déjà
                                            enregistrée. Ne remplissez ce champ
                                            que si vous souhaitez la modifier.
                                        </p>
                                    )}
                                    {errors.stripe_secret_key && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.stripe_secret_key}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Webhook */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                2. Configuration du Webhook
                            </h2>

                            <div className="mb-6 space-y-4 rounded-xl bg-blue-50 p-5 text-sm text-blue-800">
                                <p>
                                    Le Webhook permet à Stripe de prévenir votre
                                    site qu'un paiement a bien été reçu, pour
                                    valider les commandes en temps réel.
                                </p>

                                <div>
                                    <p className="mb-2 font-semibold">
                                        Étape A : Copiez l'URL de votre Webhook
                                        ci-dessous :
                                    </p>
                                    <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-white p-2">
                                        <code className="flex-1 truncate text-blue-900 select-all">
                                            {webhook_url}
                                        </code>
                                        <button
                                            type="button"
                                            onClick={copyWebhookUrl}
                                            className="rounded-md bg-blue-100 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-blue-700 transition-colors hover:bg-blue-200"
                                        >
                                            {copied
                                                ? 'Copié !'
                                                : "Copier l'URL"}
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <p className="mb-2 font-semibold">
                                        Étape B : Ajoutez-la sur Stripe :
                                    </p>
                                    <a
                                        href="https://dashboard.stripe.com/webhooks"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 font-medium text-blue-600 underline hover:text-blue-800"
                                    >
                                        Cliquez ici pour ajouter un Endpoint sur
                                        Stripe
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            ></path>
                                        </svg>
                                    </a>
                                    <p className="mt-1">
                                        Collez l'URL copiée, ajoutez l'événement{' '}
                                        <code>checkout.session.completed</code>,
                                        puis récupérez le{' '}
                                        <strong>secret de signature</strong>{' '}
                                        (qui commence par <code>whsec_</code>).
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Secret Webhook (Signing secret)
                                </label>
                                <input
                                    type="password"
                                    value={data.stripe_webhook_secret}
                                    onChange={(e) =>
                                        setData(
                                            'stripe_webhook_secret',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border-gray-300 font-mono text-sm placeholder-gray-400 focus:border-black focus:ring-black"
                                    placeholder={
                                        has_webhook_secret
                                            ? '•••••••••••••••• (Laissez vide pour conserver le secret actuel)'
                                            : 'whsec_...'
                                    }
                                    required={!has_webhook_secret}
                                />
                                {has_webhook_secret && (
                                    <p className="mt-2 text-xs text-gray-500">
                                        Un secret webhook est déjà enregistré.
                                        Ne remplissez ce champ que si vous
                                        souhaitez le modifier.
                                    </p>
                                )}
                                {errors.stripe_webhook_secret && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.stripe_webhook_secret}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-black px-8 py-3 font-bold text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Enregistrement...'
                                    : 'Enregistrer la configuration'}
                            </button>

                            {isFullyConnected && (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="font-medium text-gray-600 hover:text-black"
                                >
                                    Annuler
                                </button>
                            )}

                            {recentlySuccessful && (
                                <span className="flex items-center gap-1 font-medium text-green-600">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    Enregistré
                                </span>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
