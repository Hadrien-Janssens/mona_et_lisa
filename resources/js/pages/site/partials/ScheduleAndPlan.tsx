import Button from '../components/Button';
import Subtitle from '../components/Subtitle';
import Subtitle2 from '../components/Subtitle2';

export default function ScheduleAndPlan({ content }: { content: any }) {
    return (
        <div className="relative overflow-hidden border-b border-dashed border-primary">
            <div className="mx-auto w-full max-w-250 py-20">
                <Subtitle>{content?.title || 'Schedule Title'}</Subtitle>
                <Subtitle2>{content?.subtitle}</Subtitle2>
                {content?.image && (
                    <img src={content.image} alt="Schedule" width="200" />
                )}

                <ul className="my-5 w-fit rounded-sm border border-primary shadow">
                    <li className="-rotate-2 p-3 px-5 font-titre-lemon text-xl">
                        Horaire
                    </li>
                    {content?.schedules?.map((schedule: any, idx: number) => (
                        <li
                            key={idx}
                            className="flex justify-between gap-15 border-t border-dashed border-primary p-3 px-5"
                        >
                            <div>
                                <strong>{schedule.day}</strong>{' '}
                            </div>
                            <div>{schedule.hours}</div>
                        </li>
                    ))}
                </ul>

                {content?.button_label && (
                    <Button variant={'primary'}>{content.button_label}</Button>
                )}
            </div>
        </div>
    );
}
