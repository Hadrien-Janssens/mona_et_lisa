import type { ReactNode } from 'react';

type BadgeProps = {
    children: ReactNode;
};
export default function Badge({ children }: BadgeProps) {
    return (
        <div className="absolute top-3 right-3 rounded-full border border-ternary bg-[#F8F3EB] px-2 text-xs text-ternary">
            {children}
        </div>
    );
}
