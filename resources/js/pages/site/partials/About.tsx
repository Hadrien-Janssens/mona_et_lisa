import { Paperclip, Scissors } from 'lucide-react';
import CardPhoto from '../components/CardPhoto';
import Subtitle from '../components/Subtitle';
import Tache from '../components/Tache';

export default function About({ content }: { content: any }) {
    return (
        <div
            id="about"
            className="relative border-b border-dashed border-primary"
        >
            <div className="mx-auto w-full max-w-250 pt-20">
                <Subtitle>{content?.title || 'À propos'}</Subtitle>

                <div className="my-16 flex flex-col items-center justify-center gap-12 px-4 pb-10 md:flex-row">
                    <div className="relative">
                        {content?.default_images?.[0] && (
                            <CardPhoto rotation="-rotate-3 ">
                                <img
                                    src={content.default_images[0]}
                                    alt="Mona"
                                    className="h-full w-full object-cover"
                                />
                            </CardPhoto>
                        )}
                        <Tache className="absolute -bottom-10 -left-10 z-10 w-30 text-foreground" />
                    </div>

                    <div>
                        {' '}
                        <p
                            className="max-w-xl text-justify leading-relaxed text-foreground/80"
                            style={{ whiteSpace: 'pre-wrap' }}
                        >
                            {content?.description}
                        </p>
                        <img
                            src="/img/big_ligne.svg"
                            alt=""
                            className="mx-auto mt-3"
                        />
                    </div>

                    <div className="relative">
                        {content?.default_images?.[1] && (
                            <CardPhoto rotation="rotate-2">
                                <img
                                    src={content.default_images[1]}
                                    alt="Lisa"
                                    className="h-full w-full object-cover"
                                />
                            </CardPhoto>
                        )}
                        <Tache className="absolute -top-10 -right-10 z-10 w-30 text-secondary" />
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
