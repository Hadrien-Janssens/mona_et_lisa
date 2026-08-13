import type { ReactNode } from 'react';

type Subtitle2Props = {
    children: ReactNode;
};
export default function Subtitle2({ children }: Subtitle2Props) {
    return <p className="font-titre-lemon text-xl text-ternary">{children}</p>;
}
