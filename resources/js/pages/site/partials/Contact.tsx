import { useForm } from '@inertiajs/react';
import { Mail, Phone, SignpostBig } from 'lucide-react';
// import contactSend from '@/routes/contact';
import { send as contactSend } from '@/routes/contact';
import Button from '../components/Button';
import Card from '../components/Card';
import StarFill from '../components/StarFill';
import StarStroke from '../components/StarStroke';
import Sticker from '../components/Sticker';
import StickerRayure from '../components/StickerRayure';
import Subtitle from '../components/Subtitle';
import Subtitle2 from '../components/Subtitle2';
import Tache from '../components/Tache';

export default function Contact({ content }: { content: any }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // 2. Utilisation de la route typée
        // Selon la configuration exacte de ton outil, l'appel à la fonction
        // retourne soit directement la chaîne de caractères de l'URL, soit un objet.
        // Si ça ne marche pas direct avec contactSend(), essaie contactSend().url

        post(contactSend(), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div
            id="contact"
            className="relative overflow-hidden px-5 py-12 md:py-20 lg:px-10"
        >
            <Tache className="text-forground absolute top-[50%] left-[50%] z-10 w-120 translate-x-[-30%] translate-y-[-50%] rotate-70" />
            <div className="mx-auto w-full max-w-250">
                <Subtitle>{content?.title || 'Contact Title'}</Subtitle>
                <Subtitle2>{content?.subtitle}</Subtitle2>

                <div className="flex w-full flex-col justify-between gap-20 md:flex-row md:gap-10">
                    {/* LEFT SIDE  */}

                    <div className="relative mt-10 flex basis-1/2 flex-col space-y-8">
                        <StarStroke className="absolute -top-35 right-0 w-7 text-secondary" />
                        <StarFill className="text-forground absolute -bottom-25 left-0 w-7 rotate-50" />
                        <StarStroke className="text-forground absolute -bottom-30 left-15 w-7" />
                        <div className="relative">
                            <Sticker className="absolute -top-4 left-1/2 z-50 w-20 -translate-x-1/2 -rotate-10 text-sticker-primary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
                            <Card idx={0} className="w-full">
                                <p className="flex gap-2 font-titre-lemon text-ternary">
                                    <Mail />
                                    <strong className="text-xl font-light">
                                        {' '}
                                        Email
                                    </strong>
                                </p>
                                <a href="mailto:monaetlisa@hotmail.com">
                                    {content?.email}
                                </a>
                            </Card>
                        </div>
                        <div className="relative">
                            <StickerRayure className="absolute -top-4 left-1/2 z-50 w-20 -translate-x-1/2 -rotate-6 text-sticker-secondary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
                            <Card idx={1} className="w-full">
                                <p className="flex gap-2 font-titre-lemon text-ternary">
                                    <SignpostBig />
                                    <strong className="text-xl font-light">
                                        {' '}
                                        adresse
                                    </strong>
                                </p>
                                <p>{content?.address}</p>
                            </Card>
                        </div>

                        <div className="relative">
                            <Sticker className="absolute -top-4 left-1/2 z-50 w-20 -translate-x-1/2 -rotate-6 text-sticker-secondary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
                            <Card idx={2} className="w-full">
                                <div>
                                    <p className="flex gap-2 font-titre-lemon text-ternary">
                                        <Phone />
                                        <strong className="text-xl font-light">
                                            {' '}
                                            Téléphone
                                        </strong>
                                    </p>
                                    <ul>
                                        <a href="tel:+32478744148">
                                            {content?.phones?.map(
                                                (
                                                    phone: string,
                                                    idx: number,
                                                ) => (
                                                    <li key={idx}>{phone}</li>
                                                ),
                                            )}
                                        </a>
                                    </ul>
                                </div>
                            </Card>
                        </div>
                    </div>
                    {/* RIGHT SIDE  */}
                    <div className="relative flex w-full justify-center md:basis-1/2 md:justify-end">
                        <StarStroke className="text-forground absolute -top-30 right-15 w-7 rotate-12" />
                        <Card className="relative w-full">
                            <StickerRayure className="absolute -top-4 left-1/2 z-50 w-20 -translate-x-1/2 -rotate-10 text-sticker-secondary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
                            <form className="space-y-5" onSubmit={submit}>
                                <div className="flex flex-col gap-5 md:flex-row">
                                    <div className="flex flex-col">
                                        <Subtitle2>
                                            <label htmlFor="first_name">
                                                Ton prénom
                                            </label>
                                        </Subtitle2>
                                        <input
                                            id="first_name"
                                            type="text"
                                            className="w-full rounded-md border border-primary bg-background shadow"
                                            value={data.first_name}
                                            onChange={(e) =>
                                                setData(
                                                    'first_name',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <Subtitle2>
                                            <label htmlFor="last_name">
                                                Ton nom
                                            </label>
                                        </Subtitle2>

                                        <input
                                            id="last_name"
                                            type="text"
                                            className="w-full rounded-md border border-primary bg-background shadow"
                                            value={data.last_name}
                                            onChange={(e) =>
                                                setData(
                                                    'last_name',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <Subtitle2>
                                        <label htmlFor="email">Ton email</label>
                                    </Subtitle2>

                                    <input
                                        id="email"
                                        type="text"
                                        className="rounded-md border border-primary bg-background shadow"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Subtitle2>
                                        <label htmlFor="message">
                                            Ton message
                                        </label>
                                    </Subtitle2>

                                    <textarea
                                        id="message"
                                        className="rounded-md border border-primary bg-background shadow"
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) =>
                                            setData('message', e.target.value)
                                        }
                                    ></textarea>
                                </div>
                                <div className="flex justify-end">
                                    <Button size={'sm'} disabled={processing}>
                                        {processing
                                            ? 'Envoi en cours...'
                                            : 'Envoyer'}
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
