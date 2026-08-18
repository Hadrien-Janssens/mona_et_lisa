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
// import { Badge } from '@/components/ui/badge';
import SiteLayout from '@/layouts/site-layout';
import CardPhoto from './components/CardPhoto';
import Subtitle from './components/Subtitle';
import CardSession from './components/CardSession';
import Badge from './components/Badge';
import StickerRayure from './components/StickerRayure';
import Tache from './components/Tache';
import StarStroke from './components/StarStroke';
import StarFill from './components/StarFill';

const Atelier = ({ workshop, sessions }: { workshop: any; sessions: any }) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [activeFilter, setActiveFilter] = useState<number | 'tous'>(
        workshop.id,
    );

    // Compute unique workshops for the filter
    const uniqueWorkshops = Array.from(
        [workshop, ...sessions.map((s: any) => s.workshop)]
            .filter((w) => w != null)
            .reduce((map, w) => map.set(w.id, w), new Map())
            .values(),
    ) as any[];

    // Filter sessions
    const filteredSessions =
        activeFilter === 'tous'
            ? sessions
            : sessions.filter(
                  (s: any) =>
                      s.workshop_id === activeFilter ||
                      (s.workshop && s.workshop.id === activeFilter),
              );

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

            <div className="mx-auto mt-24 mb-12 grid w-full max-w-250 grid-cols-1 gap-12 px-4 py-12 md:grid-cols-2">
                <div className="flex items-start gap-5 md:hidden">
                    <Subtitle>{workshop.title}</Subtitle>
                    <Badge size="lg"> {workshop.price / 100}€</Badge>
                </div>
                {/* CAROUSEL  */}
                <div className="relative flex flex-col">
                    <StickerRayure className="absolute top-3 left-1/2 z-80 w-20 -translate-x-1/2 -rotate-10 text-sticker-primary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
                    {workshop.images && workshop.images.length > 0 ? (
                        <>
                            <div className="relative">
                                <div className="relative z-50">
                                    <Carousel
                                        setApi={setApi}
                                        opts={{ loop: true }}
                                        className="mx-auto w-4/5"
                                    >
                                        <CarouselContent className="">
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
                                </div>
                                <Tache className="absolute right-8 -bottom-2 z-10 w-30 text-foreground" />
                            </div>

                            {/* Miniatures */}
                            <div className="flex gap-4 overflow-x-auto px-4 py-6">
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
                {/* DESCRIPTION  */}
                <div className="relative py-5">
                    <StarStroke className="text-forground absolute -top-7 right-15 w-7" />
                    <StarFill className="absolute -top-9 right-0 w-7 text-secondary" />

                    <StarStroke className="absolute bottom-20 -left-15 w-7 text-foreground" />
                    <StarFill className="absolute bottom-35 -left-25 w-7 text-secondary" />

                    <div className="hidden items-start gap-5 md:flex">
                        <Subtitle>{workshop.title}</Subtitle>
                        <Badge size="lg"> {workshop.price / 100}€</Badge>
                    </div>

                    <div className="prose pt-5 whitespace-pre-wrap">
                        {workshop.description}
                    </div>
                </div>
            </div>
            <div className="border-b border-dashed border-primary"></div>

            <div className="rounded-3xl p-8">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-10">
                    <div>
                        <Subtitle>Prochaines dates</Subtitle>
                    </div>
                    <div className="flex flex-wrap gap-2 md:pt-3">
                        {uniqueWorkshops.map((w) => (
                            <div key={w.id}>
                                <Badge
                                    size="lg"
                                    isActive={activeFilter === w.id}
                                    onClick={() => setActiveFilter(w.id)}
                                    isClickable
                                >
                                    {w.title}{' '}
                                </Badge>
                            </div>
                        ))}

                        <Badge
                            size="lg"
                            isActive={activeFilter === 'tous'}
                            onClick={() => setActiveFilter('tous')}
                            isClickable
                        >
                            tous
                        </Badge>
                    </div>
                </div>
                {filteredSessions && filteredSessions.length > 0 ? (
                    <div className="flex w-full flex-wrap gap-5">
                        {filteredSessions.map((session: any, index: number) => (
                            <CardSession
                                key={session.id}
                                session={session}
                                index={index}
                            />
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
