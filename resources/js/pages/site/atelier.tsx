import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import SiteLayout from '@/layouts/site-layout';
import CardPhoto from './components/CardPhoto';
import Subtitle from './components/Subtitle';
import CardSession from './components/CardSession';

const Atelier = ({ workshop, sessions }: { workshop: any; sessions: any }) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <>
            <Head title={workshop.title} />

            {/* <div className=""> */}
            <div className="mb-8">
                <Link href="/" className="text-blue-600 hover:underline">
                    &larr; Retour aux ateliers
                </Link>
            </div>

            <div className="mx-auto mt-24 mb-12 grid w-full max-w-250 grid-cols-1 gap-12 px-4 py-12 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                    {workshop.images && workshop.images.length > 0 ? (
                        <>
                            <Carousel
                                setApi={setApi}
                                opts={{ loop: true }}
                                className="mx-auto w-4/5"
                            >
                                <CarouselContent>
                                    {workshop.images.map((img: any) => (
                                        <CarouselItem
                                            key={img.id}
                                            className="py-2 pl-4"
                                        >
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className="group cursor-pointer p-5">
                                                        <CardPhoto
                                                            rotation="-rotate-2"
                                                            className="!w-full !p-3"
                                                        >
                                                            <img
                                                                src={`/storage/${img.path}`}
                                                                alt="Galerie"
                                                                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                            />
                                                        </CardPhoto>
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
                                                    <img
                                                        src={`/storage/${img.path}`}
                                                        alt="Galerie agrandie"
                                                        className="h-auto w-full rounded-xl object-contain"
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                            </Carousel>

                            {/* Miniatures */}
                            <div className="mt-6 flex gap-4 overflow-x-auto px-4 py-6">
                                {workshop.images.map(
                                    (img: any, index: number) => (
                                        <button
                                            key={img.id}
                                            onClick={() => api?.scrollTo(index)}
                                            className={`transition-all duration-300 focus:ring-0 focus:outline-none ${current === index ? 'z-10 scale-105 opacity-100' : 'opacity-50 hover:scale-100 hover:opacity-100'}`}
                                        >
                                            <CardPhoto
                                                className="!w-20 !p-1 md:!w-24"
                                                rotation={
                                                    current === index
                                                        ? 'rotate-0'
                                                        : '-rotate-2'
                                                }
                                            >
                                                <img
                                                    src={`/storage/${img.path}`}
                                                    alt="Miniature"
                                                    className="aspect-square w-full object-cover"
                                                />
                                            </CardPhoto>
                                        </button>
                                    ),
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500 italic">
                            Aucune image disponible.
                        </p>
                    )}
                </div>

                <div>
                    <Subtitle>{workshop.title}</Subtitle>
                    {workshop.price / 100}€
                    <div className="prose pt-5 whitespace-pre-wrap">
                        {workshop.description}
                    </div>
                </div>
            </div>
            <div className="border-b border-dashed border-primary"></div>

            <div className="rounded-3xl p-8">
                <Subtitle>Prochaines dates</Subtitle>
                {workshop.sessions && workshop.sessions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {sessions.map((session: any) => (
                            <CardSession session={session} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">
                        Aucune session prévue pour le moment.
                    </p>
                )}
            </div>
            {/* </div> */}
        </>
    );
};

Atelier.layout = (page: React.ReactNode) => <SiteLayout>{page}</SiteLayout>;

export default Atelier;
