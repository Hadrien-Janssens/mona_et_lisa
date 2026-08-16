import { useId } from 'react';

export default function StickerRayure({
    className = '',
    color1ClassName = 'text-primary',
    color2ClassName = 'text-secondary',
}: {
    className?: string;
    color1ClassName?: string;
    color2ClassName?: string;
}) {
    const patternId = useId();

    return (
        <svg
            viewBox="0 0 95 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <pattern
                    id={patternId}
                    width="12"
                    height="12"
                    patternTransform="rotate(45)"
                    patternUnits="userSpaceOnUse"
                >
                    <rect
                        width="12"
                        height="12"
                        className={color1ClassName}
                        fill="currentColor"
                    />
                    <rect
                        width="6"
                        height="12"
                        className={color2ClassName}
                        fill="currentColor"
                    />
                </pattern>
            </defs>
            <rect
                x="2.9751"
                width="92.4904"
                height="23.7443"
                transform="rotate(7.19817 2.9751 0)"
                fill={`url(#${patternId})`}
            />
        </svg>
    );
}
