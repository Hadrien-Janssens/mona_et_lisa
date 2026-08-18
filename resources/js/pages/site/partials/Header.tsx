import Button from '../components/Button';
import CardPhoto from '../components/CardPhoto';
import StarFill from '../components/StarFill';
import StarStroke from '../components/StarStroke';
import Sticker from '../components/Sticker';
import StickerRayure from '../components/StickerRayure';
import Tache from '../components/Tache';

export default function Header({ content }: { content: any }) {
    return (
        <div
            id="acceuil"
            className="relative mt-2 h-full overflow-hidden border-b border-dashed border-primary md:mt-30 md:h-screen md:max-h-170 md:gap-0"
        >
            <Tache className="absolute top-20 -right-14 w-30 text-foreground md:top-50 md:-left-60 md:w-50" />
            <div className="mx-auto flex w-full flex-col items-center justify-center gap-0 pt-25 md:w-250 md:flex-row md:pt-10 lg:gap-5">
                {/* LEFT  */}
                <div className="relative z-10 flex flex-col items-center justify-center md:basis-2/5 md:items-start">
                    <h1 className="w-60 font-titre-lemon text-7xl sm:text-8xl md:w-30">
                        {content?.title || 'Header Title'}
                    </h1>
                    <img src="/img/big_ligne.svg" alt="" className="w-2/3" />

                    <p className="w-70 pt-5 pb-0 text-center md:w-90 md:pb-10 md:text-left">
                        {content?.subtitle}
                    </p>
                    {/* BUTTON DESKTOP  */}
                    <div className="hidden gap-5 md:flex">
                        {content?.button1_label && (
                            <a href="/#contact">
                                <Button>{content.button1_label}</Button>
                            </a>
                        )}
                        {content?.button2_label && (
                            <a href="/#workshop">
                                <Button variant={'primary'}>
                                    {content.button2_label}
                                </Button>
                            </a>
                        )}
                    </div>
                </div>

                {/* RIGHT  */}
                <div className="relative top-2 z-10 flex w-full basis-1/2 justify-center md:top-12 md:w-full">
                    <div className="relative flex aspect-square h-fit w-130 justify-center pt-8 md:w-full lg:pt-15">
                        <StarFill className="absolute -top-9 right-0 w-7 text-secondary md:right-50 lg:right-0" />
                        <StarStroke className="text-forground absolute -top-7 right-15 w-7 md:right-65 lg:right-15" />
                        <div className="group relative left-20 -rotate-2 md:left-5 lg:left-20">
                            <StickerRayure className="absolute -top-4 left-8 z-50 w-20 -rotate-10 text-sticker-primary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8 sm:left-13 md:left-8 lg:left-13" />
                            <CardPhoto className="">
                                <img
                                    src={content?.images[0]}
                                    alt={`Header Image`}
                                    width="100"
                                    className="h-full w-full object-cover"
                                />
                            </CardPhoto>
                        </div>

                        <div className="relative top-30 left-0 z-60 rotate-2 md:top-50 md:-left-15 lg:left-0">
                            <Sticker className="absolute -top-4 left-8 z-50 w-20 -rotate-10 text-sticker-secondary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8 sm:left-13 md:left-8 lg:left-13" />
                            <CardPhoto>
                                <img
                                    src={content?.images[1]}
                                    alt={`Header Image`}
                                    width="100"
                                    className="h-full w-full object-cover"
                                />
                            </CardPhoto>
                        </div>

                        <div className="relative right-20 rotate-5 md:right-35 lg:right-20">
                            <Sticker className="absolute -top-4 left-8 z-50 w-20 -rotate-10 text-sticker-primary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8 sm:left-13 md:left-8 lg:left-13" />
                            <CardPhoto>
                                <img
                                    src={content?.images[2]}
                                    alt={`Header Image`}
                                    width="100"
                                    className="h-full w-full object-cover"
                                />
                            </CardPhoto>
                        </div>
                    </div>
                </div>
                <div className="relative -top-22 z-10 mb-10 flex gap-5 md:mb-0 md:hidden">
                    {content?.button1_label && (
                        <a href="/#contact">
                            <Button>{content.button1_label}</Button>
                        </a>
                    )}
                    {content?.button2_label && (
                        <a href="/#workshop">
                            <Button variant={'primary'}>
                                {content.button2_label}
                            </Button>
                        </a>
                    )}
                </div>
            </div>
            <img
                src="/img/mains.png"
                className="absolute -right-125 -bottom-1 z-0 hidden w-210 md:block"
                alt=""
            />
        </div>
    );
}
