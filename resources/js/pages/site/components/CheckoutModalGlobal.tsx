import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import Subtitle from './Subtitle';
import Button from './Button';

type CheckoutModalGlobalProps = {
    children: React.ReactNode;
};

export default function CheckoutModalGlobal({
    children,
}: CheckoutModalGlobalProps) {
    const { globalSessions } = usePage().props as any;

    const [selectedSession, setSelectedSession] = useState<any>(
        globalSessions && globalSessions.length > 0 ? globalSessions[0] : null,
    );

    useEffect(() => {
        if (!selectedSession && globalSessions && globalSessions.length > 0) {
            setSelectedSession(globalSessions[0]);
        }
    }, [globalSessions]);

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        birthdate: '',
        seats: 1,
    });

    const workshop = selectedSession?.workshop;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedSession) {
            post(`/reserver/${selectedSession.id}`);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                data-theme="public"
                className="my-5 max-h-[90vh] w-[95vw] overflow-x-hidden overflow-y-auto rounded-sm border border-s bg-background shadow sm:w-full sm:max-w-xl"
            >
                <DialogTitle className="sr-only">
                    Réservation d'atelier
                </DialogTitle>
                <DialogDescription className="sr-only">
                    Formulaire de réservation pour un atelier
                </DialogDescription>

                <div
                    data-theme="public"
                    className="w-full max-w-full overflow-hidden bg-background p-2 text-foreground"
                >
                    <h2 className="mb-4">
                        <Subtitle>Réservation</Subtitle>
                    </h2>

                    <div className="mb-6 w-full border-t-2 border-b-2 border-dashed border-primary py-4">
                        <h3 className="mb-3 text-sm font-bold tracking-wider text-primary uppercase">
                            Choisissez une session
                        </h3>
                        {globalSessions && globalSessions.length > 0 ? (
                            <div className="no-scrollbar flex w-full max-w-full snap-x gap-4 overflow-x-auto p-2">
                                {globalSessions.map((s: any) => (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => setSelectedSession(s)}
                                        className={`w-60 flex-none snap-center rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                                            selectedSession?.id === s.id
                                                ? 'scale-[1.02] border-primary bg-primary/10 shadow-sm'
                                                : 'border-gray-200 opacity-80 hover:border-primary/50 hover:opacity-100'
                                        }`}
                                    >
                                        <h4 className="mb-1 line-clamp-2 text-lg leading-tight font-bold">
                                            {s.workshop.title}
                                        </h4>
                                        <p className="mb-2 text-sm font-medium">
                                            {new Date(
                                                s.start_at,
                                            ).toLocaleString('fr-FR', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                        <p className="text-sm font-bold text-primary">
                                            {s.workshop.price / 100}€ / pers.
                                        </p>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="py-2 text-gray-500 italic">
                                Aucune session disponible pour le moment.
                            </p>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData('first_name', e.target.value)
                                    }
                                    className="w-full rounded-sm border-gray-300 shadow-sm focus:border-black focus:ring-black"
                                    required
                                />
                                {errors.first_name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.first_name}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData('last_name', e.target.value)
                                    }
                                    className="w-full rounded-sm border-gray-300 shadow-sm focus:border-black focus:ring-black"
                                    required
                                />
                                {errors.last_name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.last_name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className="w-full rounded-sm border-gray-300 shadow-sm focus:border-black focus:ring-black"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Téléphone (optionnel)
                                </label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    className="w-full rounded-sm border-gray-300 shadow-sm focus:border-black focus:ring-black"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Date de naissance
                                </label>
                                <input
                                    type="date"
                                    value={data.birthdate}
                                    onChange={(e) =>
                                        setData('birthdate', e.target.value)
                                    }
                                    className="w-full rounded-sm border-gray-300 shadow-sm focus:border-black focus:ring-black"
                                    required
                                />
                                {errors.birthdate && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.birthdate}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Nombre de places
                            </label>
                            <select
                                value={data.seats}
                                onChange={(e) =>
                                    setData('seats', parseInt(e.target.value))
                                }
                                className="w-full rounded-sm border-gray-300 shadow-sm focus:border-black focus:ring-black"
                            >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                            {errors.seats && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.seats}
                                </p>
                            )}
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t-2 border-dashed border-primary pt-4">
                            <span className="text-xl font-bold">
                                Total:{' '}
                                {workshop
                                    ? (workshop.price / 100) * data.seats
                                    : 0}
                                €
                            </span>
                            <button
                                type="submit"
                                disabled={processing || !selectedSession}
                            >
                                <Button>
                                    {' '}
                                    {processing ? 'Redirection...' : 'Suivant'}
                                </Button>
                            </button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
