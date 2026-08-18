import { Paperclip, Scissors } from 'lucide-react';
import Button from '../components/Button';
import StarFill from '../components/StarFill';
import StarStroke from '../components/StarStroke';
import Sticker from '../components/Sticker';
import StickerRayure from '../components/StickerRayure';
import Subtitle from '../components/Subtitle';
import Subtitle2 from '../components/Subtitle2';
import Tache from '../components/Tache';

export default function ScheduleAndPlan({ content }: { content: any }) {
    return (
        <div
            id="horaire"
            className="relative border-b border-dashed border-primary px-5 py-14 sm:py-20 md:py-40 lg:px-10"
        >
            <div className="max-w-50">
                <Subtitle>{content?.title || 'Schedule Title'}</Subtitle>
            </div>{' '}
            <div className="translate-x-5 -rotate-3">
                <Subtitle2>{content?.subtitle}</Subtitle2>
            </div>{' '}
            <div className="flex w-full max-w-250 flex-col items-center justify-between md:flex-row">
                {/* LEFTSIDE  */}
                <div className="w-full md:w-fit">
                    <ul className="md-w-fit relative my-10 w-full rounded-sm border border-primary shadow">
                        <Sticker className="absolute -top-4 left-30 z-50 w-20 -rotate-10 text-sticker-secondary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8" />
                        <li className="-rotate-2 p-3.5 px-7 font-titre-lemon text-xl md:px-3 lg:px-7">
                            Horaire
                        </li>
                        {content?.schedules?.map(
                            (schedule: any, idx: number) => (
                                <li
                                    key={idx}
                                    className="flex justify-between gap-5 border-t border-dashed border-primary p-3.5 px-7 md:px-3 lg:gap-15 lg:px-7"
                                >
                                    <div>
                                        <strong>{schedule.day}</strong>{' '}
                                    </div>
                                    <div>{schedule.hours}</div>
                                </li>
                            ),
                        )}
                    </ul>
                    {content?.button_label && (
                        <div className="flex justify-center md:justify-start">
                            <Button variant={'primary'}>
                                {content.button_label}
                            </Button>
                        </div>
                    )}
                </div>

                {/* RIGHTSIDE  */}
                <div className="group relative mt-16 translate-x-20 md:mt-0 lg:translate-x-0">
                    <Sticker className="absolute -top-6 -left-5 z-50 w-20 -rotate-4 text-sticker-secondary transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8 md:-left-10 lg:-left-5" />
                    <Sticker className="absolute -top-4 left-25 z-50 w-20 -rotate-2 text-sticker-primary transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105 group-hover:-rotate-8 md:left-20 lg:left-25" />
                    <StickerRayure className="absolute -top-2 left-56 z-50 w-20 -rotate-1 text-sticker-primary transition-transform duration-300 group-hover:-translate-y-4 group-hover:scale-105 group-hover:-rotate-8 md:left-50 lg:left-56" />
                    <StarStroke className="text-forground absolute -top-20 right-18 w-7 rotate-12 sm:right-10 md:right-0" />
                    <StarFill className="absolute -top-10 -left-23 w-7 rotate-12 text-secondary sm:-left-30 md:-left-50" />
                    <StarFill className="text-forground absolute right-37 -bottom-12 w-7 sm:right-30 md:-bottom-20" />
                    <Tache className="absolute -bottom-10 -left-40 z-10 w-60 text-secondary md:-bottom-20" />
                    <div
                        className={`relative z-30 h-90 w-full shrink-0 -translate-x-20 rotate-4 transform rounded-sm border border-primary bg-white p-3 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:rotate-0 group-hover:shadow-xl md:w-90 lg:w-100`}
                    >
                        <figure className="h-[80%] w-full overflow-hidden rounded-xs border border-primary bg-muted">
                            <img
                                src="/img/map.png"
                                className="h-full w-full overflow-hidden rounded-xs border border-primary bg-muted"
                                alt=""
                            />
                        </figure>
                        <p className="p-2 text-center">Mona</p>
                    </div>
                </div>
            </div>
            <Paperclip className="absolute right-0 bottom-0 translate-y-1/2" />
            <Scissors className="absolute top-0 left-0 -translate-y-1/2" />
        </div>
    );
}
