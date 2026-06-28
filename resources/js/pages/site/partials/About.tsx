import CardPhoto from '../components/CardPhoto';
import Subtitle from '../components/Subtitle';

export default function About({ content }: { content: any }) {
    return (
        <div className="relative overflow-hidden border-b border-dashed border-primary">
            <div className="mx-auto w-full max-w-250 pt-20">
                <Subtitle>{content?.title || 'À propos'}</Subtitle>

                <div className="my-16 flex flex-col items-center justify-center gap-12 px-4 pb-10 md:flex-row">
                    {content?.default_images?.[0] && (
                        <CardPhoto rotation="-rotate-3">
                            <img
                                src={content.default_images[0]}
                                alt="Mona"
                                className="h-full w-full object-cover"
                            />
                        </CardPhoto>
                    )}

                    <p
                        className="max-w-xl text-justify leading-relaxed text-foreground/80"
                        style={{ whiteSpace: 'pre-wrap' }}
                    >
                        {content?.description}
                    </p>

                    {content?.default_images?.[1] && (
                        <CardPhoto rotation="rotate-2">
                            <img
                                src={content.default_images[1]}
                                alt="Lisa"
                                className="h-full w-full object-cover"
                            />
                        </CardPhoto>
                    )}
                </div>
            </div>
            {/* <p>Images au survol :</p>
                {content?.hover_images?.map((img: string, idx: number) => (
                    <img key={idx} src={img} alt={`Hover ${idx}`} width="100" />
                ))} */}
        </div>
    );
}
