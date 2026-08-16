import Button from '../components/Button';
import Card from '../components/Card';
import StarFill from '../components/StarFill';
import StarStroke from '../components/StarStroke';
import Sticker from '../components/Sticker';
import StickerRayure from '../components/StickerRayure';
import Subtitle from '../components/Subtitle';
import Subtitle2 from '../components/Subtitle2';
import Tache from '../components/Tache';
import { Mail, Phone, SignpostBig } from 'lucide-react';

export default function Contact({ content }: { content: any }) {
    return (
        <div id="contact" className="relative overflow-hidden py-20">
            <Tache className="text-forground absolute top-[50%] left-[50%] z-10 w-120 translate-x-[-30%] translate-y-[-50%] rotate-70" />
            <div className="mx-auto w-full max-w-250 py-20">
                <Subtitle>{content?.title || 'Contact Title'}</Subtitle>
                <Subtitle2>{content?.subtitle}</Subtitle2>

                <div className="flex w-full justify-between">
                    {/* LEFT SIDE  */}
                    <div className="relative mt-10 space-y-8">
                        <StarStroke className="absolute -top-35 right-0 w-7 text-secondary" />
                        <StarFill className="text-forground absolute -bottom-25 left-0 w-7 rotate-50" />
                        <StarStroke className="text-forground absolute -bottom-30 left-15 w-7" />
                        <div className="relative">
                            <Sticker className="absolute -top-4 left-40 z-50 w-20 -rotate-10 text-sticker-primary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
                            <Card idx={0}>
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
                            <Sticker className="absolute -top-4 left-40 z-50 w-20 -rotate-6 text-sticker-secondary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
                            <Card idx={1}>
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
                            <StickerRayure className="absolute -top-4 left-40 z-50 w-20 -rotate-6 text-sticker-secondary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
                            <Card idx={2}>
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
                    <div className="relative flex basis-1/2 justify-end">
                        <StickerRayure className="absolute -top-4 left-65 z-50 w-20 -rotate-10 text-sticker-secondary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
                        <StarStroke className="text-forground absolute -top-30 right-15 w-7 rotate-12" />
                        <Card>
                            <form className="space-y-5">
                                <div className="flex gap-5">
                                    <div className="flex flex-col">
                                        <Subtitle2>
                                            <label htmlFor="name">
                                                Ton prénom
                                            </label>
                                        </Subtitle2>
                                        <input
                                            type="text"
                                            className="rounded-md border border-primary bg-background shadow"
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
                                            className="rounded-md border border-primary bg-background shadow"
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
