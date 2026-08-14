import React from 'react';
import { useForm } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import Subtitle from './Subtitle';
import Button from './Button';

type CheckoutModalProps = {
    session: any;
    children: React.ReactNode;
};

export default function CheckoutModal({
    session,
    children,
}: CheckoutModalProps) {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        birthdate: '',
        seats: 1,
    });
    console.log(session.workshop);

    const workshop = session.workshop;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/reserver/${session.id}`);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                data-theme="public"
                className="my-10 max-h-[90vh] w-fit overflow-y-auto rounded-sm border border-s bg-background shadow sm:max-w-xl"
            >
                <DialogTitle className="sr-only">
                    Réservation pour {workshop?.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                    Formulaire de réservation pour {workshop?.title}
                </DialogDescription>

                <div
                    data-theme="public"
                    className="bg-background p-2 text-foreground"
                >
                    <h2 className="mb-4">
                        <Subtitle>Réservation</Subtitle>
                    </h2>
                    <div className="mb-6 border-t-2 border-b-2 border-dashed border-primary p-4">
                        <h3>
                            {' '}
                            Atelier :{' '}
                            <span className="text-lg font-bold">
                                {workshop?.title}
                            </span>
                        </h3>
                        <p className="">
                            Date :{' '}
                            <span className="text-lg font-bold">
                                {new Date(session.start_at).toLocaleString(
                                    'fr-FR',
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    },
                                )}
                            </span>
                        </p>
                        <p>
                            Prix par personne :{' '}
                            <span className="text-lg font-bold">
                                {workshop?.price / 100}€
                            </span>
                        </p>
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
                                Total: {(workshop?.price / 100) * data.seats}€
                            </span>
                            <button type="submit" disabled={processing}>
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
