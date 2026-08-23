import { Paperclip, Scissors } from 'lucide-react';
import CardPhoto from '../components/CardPhoto';
import StarFill from '../components/StarFill';
import StarStroke from '../components/StarStroke';
import Sticker from '../components/Sticker';
import StickerRayure from '../components/StickerRayure';
import Subtitle from '../components/Subtitle';
import Tache from '../components/Tache';

export default function About({ content }: { content: any }) {
    return (
        <div
            id="about"
            className="relative border-b border-dashed border-primary"
        >
            <div className="mx-auto w-full px-5 pt-30 pb-10 md:pt-30 md:pb-30 lg:max-w-250 lg:px-10">
                <div className="relative w-fit">
                    <Subtitle>{content?.title || 'À propos'}</Subtitle>
                    <StarFill className="text-forground absolute -top-12 -left-2 w-7 -rotate-40 lg:-top-9 lg:-left-10" />
                    <StarStroke className="absolute -right-13 -bottom-4 w-7 text-secondary" />
                </div>

                <div className="my-12 flex flex-col items-center justify-center gap-12 pb-10 md:my-16 md:flex-row">
                    {/* LISA */}
                    <div className="relative hidden md:block">
                        <Sticker className="absolute -top-4 left-8 z-50 w-20 -rotate-10 text-sticker-primary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8 sm:left-13 md:left-8 lg:left-13" />

                        <CardPhoto rotation="-rotate-3 ">
                            <img
                                src={
                                    content?.default_images?.[0] ||
                                    '/img/default.png'
                                }
                                alt="Mona"
                                className="h-full w-full object-cover"
                            />
                        </CardPhoto>

                        <Tache className="absolute -bottom-10 -left-10 z-10 w-30 text-foreground" />
                    </div>
                    {/* TEXT */}
                    <div className="-order-1 md:order-0">
                        {' '}
                        <p
                            className="w-full text-justify leading-relaxed text-foreground/80 md:max-w-xl"
                            style={{ whiteSpace: 'pre-wrap' }}
                        >
                            {content?.description || 'Description'}
                        </p>
                        <img
                            src="/img/big_ligne.svg"
                            alt=""
                            className="mx-auto mt-3 mb-5"
                        />
                    </div>
                    {/* Mona Mobile */}
                    <div className="flex justify-between gap-10">
                        <div className="relative md:hidden">
                            <Sticker className="absolute -top-4 left-8 z-50 w-20 -rotate-10 text-sticker-primary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8 sm:left-13 md:left-8 lg:left-13" />

                            <CardPhoto rotation="-rotate-3 ">
                                <img
                                    src={
                                        content?.default_images?.[0] ||
                                        '/img/default.png'
                                    }
                                    alt="Mona"
                                    className="h-full w-full object-cover"
                                />
                            </CardPhoto>

                            <Tache className="absolute -bottom-10 -left-10 z-10 w-30 text-foreground" />
                        </div>
                        <div className="relative">
                            <StickerRayure className="absolute -top-4 left-8 z-50 w-20 -rotate-6 text-sticker-primary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8 sm:left-13 md:left-8 lg:left-13" />

                            <CardPhoto rotation="rotate-2">
                                <img
                                    src={
                                        content?.default_images?.[1] ||
                                        '/img/default.png'
                                    }
                                    alt="Lisa"
                                    className="h-full w-full object-cover"
                                />
                            </CardPhoto>

                            <Tache className="absolute -top-10 -right-10 z-10 w-30 text-secondary" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <p>Images au survol :</p>
                {content?.hover_images?.map((img: string, idx: number) => (
                    <img key={idx} src={img} alt={`Hover ${idx}`} width="100" />
                ))} */}
            <Paperclip className="absolute right-0 bottom-0 translate-y-1/2" />
            <Scissors className="absolute top-0 left-0 -translate-y-1/2" />
        </div>
    );
}
