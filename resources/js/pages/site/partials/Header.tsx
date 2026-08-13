import Button from '../components/Button';
import CardPhoto from '../components/CardPhoto';
import StarFill from '../components/StarFill';
import StarStroke from '../components/StarStroke';
import Sticker from '../components/Sticker';
import Tache from '../components/Tache';

export default function Header({ content }: { content: any }) {
    return (
        <div
            id="acceuil"
            className="relative mt-30 h-200 overflow-hidden border-b border-dashed border-primary"
        >
            <div className="mx-auto flex w-250 justify-center pt-20">
                {/* LEFT  */}
                <div className="relative z-10 basis-2/5">
                    <Tache className="absolute top-50 -left-60 w-50 text-foreground" />
                    <h1 className="w-30 font-titre-lemon text-8xl">
                        {content?.title || 'Header Title'}
                    </h1>
                    <img src="/img/big_ligne.svg" alt="" className="" />

                    <p className="w-90 pt-5 pb-10 text-lg">
                        {content?.subtitle}
                    </p>

                    <div className="flex gap-5">
                        {content?.button1_label && (
                            <Button>{content.button1_label}</Button>
                        )}
                        {content?.button2_label && (
                            <Button variant={'primary'}>
                                {content.button2_label}
                            </Button>
                        )}
                    </div>
                </div>

                {/* RIGHT  */}
                <div className="relative z-10 basis-1/2">
                    <StarFill className="absolute -top-9 right-0 w-7 text-secondary" />
                    <StarStroke className="text-forground absolute -top-7 right-15 w-7" />
                    <div className="group absolute -rotate-2">
                        <Sticker className="absolute -top-4 left-13 z-50 w-20 -rotate-10 text-sticker-primary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
                        <CardPhoto>
                            <img
                                src={content?.images[0]}
                                alt={`Header Image`}
                                width="100"
                                className="h-full w-full object-cover"
                            />
                        </CardPhoto>
                    </div>

                    <div className="absolute top-50 left-30 rotate-2">
                        <CardPhoto>
                            <img
                                src={content?.images[1]}
                                alt={`Header Image`}
                                width="100"
                                className="h-full w-full object-cover"
                            />
                        </CardPhoto>
                    </div>

                    <div className="absolute top-7 right-10 rotate-5">
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
            <img
                src="/img/mains.png"
                className="absolute -right-125 -bottom-1 z-0 w-210"
                alt=""
            />
        </div>
    );
}
