import type { ReactElement } from 'react';

type CardPhotoProps = {
    children: ReactElement;
    rotation?: string;
    className?: string;
};

export default function CardPhoto({
    children,
    rotation = '-rotate-2',
    className = '',
}: CardPhotoProps) {
    return (
        <div
            className={`transform rounded-sm border border-primary bg-white p-3 shadow-md transition-all duration-300 hover:shadow-xl ${rotation} w-64 shrink-0 hover:scale-105 hover:rotate-0 md:w-50 ${className}`}
        >
            <figure className="aspect-square w-full overflow-hidden rounded-xs border border-primary bg-muted">
                {children}
            </figure>
            <p className="p-2 text-center">Mona</p>
        </div>
    );
}
