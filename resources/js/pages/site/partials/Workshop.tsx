import Button from '../components/Button';
import CheckoutModalGlobal from '../components/CheckoutModalGlobal';
import StarStroke from '../components/StarStroke';
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
            <div className="mx-auto w-full max-w-250 pt-40 pb-30">
                <div className="flex items-center justify-between">
                    <div className="relative">
                        <StarStroke className="text-forground absolute -top-9 -left-10 w-7 -rotate-12" />
                        <Subtitle>
                            {content?.title || 'Workshop Title'}
                        </Subtitle>
                    </div>
                    {content?.button_label && (
                        <CheckoutModalGlobal>
                            <Button>{content.button_label}</Button>
                        </CheckoutModalGlobal>
                    )}
                </div>

                <div className="relative z-10 flex flex-wrap justify-center gap-10 py-10">
                    <Tache className="text-forground absolute -top-3 left-80 z-10 w-28 rotate-80" />

                    {workshops.map((workshop, idx) => (
                        <div key={workshop.id} className="relative flex">
                            <WorkshopCard workshop={workshop} idx={idx} />
                        </div>
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
