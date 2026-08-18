import type { ReactNode } from 'react';

type CardProps = {
    children: ReactNode;
    className?: string;
    idx?: number;
};

export default function Card({ children, idx, className }: CardProps) {
    let rotateClass = ' ';

    if (idx) {
        rotateClass = idx % 2 === 0 ? '-rotate-1' : 'rotate-1';
    }

    return (
        <div
            className={`relative z-10 flex w-100 flex-col justify-between rounded-3xl border-2 border-primary bg-background px-5 py-8 pb-5 shadow transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-0 ${rotateClass} ${className}`}
        >
            {children}
        </div>
    );
}
