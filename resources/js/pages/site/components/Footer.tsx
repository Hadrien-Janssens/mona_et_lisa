import { MoveRight } from 'lucide-react';
import Button from './Button';
import StarStroke from './StarStroke';
import Tache from './Tache';
import { Link } from '@inertiajs/react';

export default function Footer({ content }: { content: any }) {
    return (
        <footer className="bg-primary px-6 py-8 text-xs text-background">
            {/* Passage en grid avec 3 colonnes égales et centrage parfait des éléments */}
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3 md:justify-items-center">
                {/* Colonne 1 : Mona & Lisa */}
                <div className="w-full md:max-w-xs">
                    <p className="text-xl">Mona & Lisa</p>
                    <div className="relative w-fit">
                        <p className="w-fit py-1.5 font-titre-lemon text-lg text-secondary">
                            {content?.subtitle}
                        </p>
                        <StarStroke className="absolute top-2 -right-8 w-4 text-secondary" />
                    </div>
                    <p className="text-justify md:max-w-54">
                        {content?.catchphrase}
                    </p>
                </div>

                {/* Colonne 2 : Navigation */}
                <div>
                    <p className="pb-1 font-titre-lemon text-lg text-secondary">
                        Navigation
                    </p>
                    <ul className="flex gap-5 space-y-2 md:flex-col md:gap-0">
                        <div className="space-y-2">
                            <li>
                                <Link
                                    href="/#accueil"
                                    className="flex cursor-pointer items-center justify-center gap-1 transition-opacity hover:opacity-75"
                                >
                                    <MoveRight className="w-3" />
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#about"
                                    className="flex cursor-pointer items-center justify-center gap-1 transition-opacity hover:opacity-75"
                                >
                                    <MoveRight className="w-3" />A propos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#workshop"
                                    className="flex cursor-pointer items-center justify-center gap-1 transition-opacity hover:opacity-75"
                                >
                                    <MoveRight className="w-3" />
                                    Ateliers
                                </Link>
                            </li>
                        </div>
                        <div className="space-y-2">
                            <li>
                                <Link
                                    href="/#horaire"
                                    className="flex cursor-pointer items-center justify-center gap-1 transition-opacity hover:opacity-75"
                                >
                                    <MoveRight className="w-3" />
                                    Horaire
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#contact"
                                    className="flex cursor-pointer items-center justify-center gap-1 transition-opacity hover:opacity-75"
                                >
                                    <MoveRight className="w-3" />
                                    Contact
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>

                {/* Colonne 3 : Contact */}
                <div>
                    <p className="pb-1.5 font-titre-lemon text-lg text-secondary">
                        Contact
                    </p>
                    <div className="space-y-2">
                        <a
                            href="mailto:monaetlisa@hotmail.com"
                            className="block transition-opacity hover:opacity-75"
                        >
                            monaetlisa@hotmail.com
                        </a>
                        <a
                            href="tel:+32478744148"
                            className="block transition-opacity hover:opacity-75"
                        >
                            0478 74 41 48
                        </a>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=rue+d'Enghien+45,+7000+Mons,+Belgique"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block transition-opacity hover:opacity-75"
                        >
                            rue d'Enghien 45 <br /> 7000 Mons, Belgique
                        </a>
                        <div className="flex gap-1.5 pt-2">
                            <a
                                target="_blank"
                                href="https://www.facebook.com/profile.php?id=61573072010378"
                            >
                                <Button size={'sm'}>Facebook</Button>
                            </a>
                            <a
                                href="https://www.instagram.com/mona.lisa.atelier/"
                                target="_blank"
                            >
                                <Button size={'sm'}>Instagram</Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-5 w-full border border-dashed border-secondary"></div>

            <div className="flex flex-col justify-center font-titre-lemon text-lg text-secondary md:flex-row md:justify-between">
                <div className="relative w-fit">
                    <Tache className="absolute top-1.5 -right-6 w-4 text-secondary" />
                    <p className="w-fit">© 2026 Mona & Lisa</p>
                </div>
                <div className="relative w-fit">
                    <StarStroke className="absolute top-1 -left-8 w-4 text-secondary" />
                    <p className="w-fit">Made with love by hadrien janssens</p>
                </div>
            </div>
        </footer>
    );
}
