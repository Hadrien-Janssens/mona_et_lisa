import Button from '../components/Button';
import Subtitle from '../components/Subtitle';
import Tache from '../components/Tache';
import WorkshopCard from '../components/WorkshopCard';

export default function Workshop({
    workshops,
    content,
}: {
    workshops: any[];
    content: any;
}) {
    return (
        <div
            id="workshop"
            className="relative overflow-hidden border-b border-dashed border-primary"
        >
            <div className="mx-auto w-full max-w-250 pt-20 pb-30">
                <div className="flex items-center justify-between">
                    <Subtitle>{content?.title || 'Workshop Title'}</Subtitle>
                    {content?.button_label && (
                        <Button>{content.button_label}</Button>
                    )}
                </div>

                <div className="relative z-10 flex flex-wrap justify-center gap-10 py-10">
                    <Tache className="text-forground absolute -top-3 left-80 z-10 w-28 rotate-80" />
                    {workshops.map((workshop, idx) => (
                        <WorkshopCard
                            key={workshop.id}
                            workshop={workshop}
                            idx={idx}
                        />
                    ))}
                </div>
                <img
                    src="/img/mains.png"
                    className="absolute -bottom-20 left-[50%] z-0 w-250 translate-x-[-50%]"
                    alt=""
                />
            </div>
        </div>
    );
}
