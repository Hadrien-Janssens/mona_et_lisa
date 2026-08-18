import type { ReactElement } from 'react';

type CardPhotoProps = {
    children: ReactElement;
    rotation?: string;
    animation?: boolean;
    className?: string;
};

export default function CardPhoto({
    children,
    rotation = '-rotate-2',
    animation,
    className = '',
}: CardPhotoProps) {
    return (
        <div
            className={`relative transform rounded-sm border border-primary bg-white p-3 shadow-md transition-all duration-300 ${rotation} z-30 shrink-0 ${animation ? 'group-hover:scale-105 group-hover:rotate-0 hover:shadow-xl' : ' '} w-37 sm:w-50 md:w-40 lg:w-50 ${className}`}
        >
            <figure className="aspect-square w-full overflow-hidden rounded-xs border border-primary bg-muted">
                {children}
            </figure>
            <p className="p-0 text-center md:p-2">Mona</p>
        </div>
    );
}
