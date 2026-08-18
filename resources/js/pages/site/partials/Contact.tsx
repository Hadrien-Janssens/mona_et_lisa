import { Mail, Phone, SignpostBig } from 'lucide-react';
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
                            <form className="space-y-5">
                                <div className="flex flex-col gap-5 md:flex-row">
                                    <div className="flex flex-col">
                                        <Subtitle2>
                                            <label htmlFor="name">
                                                Ton prénom
                                            </label>
                                        </Subtitle2>
                                        <input
                                            type="text"
                                            className="w-full rounded-md border border-primary bg-background shadow"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <Subtitle2>
                                            <label htmlFor="name">
                                                Ton nom
                                            </label>
                                        </Subtitle2>

                                        <input
                                            type="text"
                                            className="w-full rounded-md border border-primary bg-background shadow"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <Subtitle2>
                                        <label htmlFor="name">Ton email</label>
                                    </Subtitle2>

                                    <input
                                        type="text"
                                        className="rounded-md border border-primary bg-background shadow"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Subtitle2>
                                        <label htmlFor="name">
                                            Ton message
                                        </label>
                                    </Subtitle2>

                                    <textarea
                                        className="rounded-md border border-primary bg-background shadow"
                                        rows={5}
                                    ></textarea>
                                </div>
                                <div className="flex justify-end">
                                    <Button size={'sm'}>Envoyer</Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
