import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
    'inline-flex cursor-pointer items-center justify-center rounded-2xl rounded-tr-4xl rounded-bl-4xl border-3 border-primary font-titre-semibold shadow transition-colors',
    {
        variants: {
            variant: {
                default:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                primary:
                    'bg-primary text-primary-foreground hover:bg-primary/90',
            },
            size: {
                default: 'xs:px-6 xs:py-2 px-2 py-1 text-base',
                sm: 'xs:px-3 px-2 py-1 text-sm',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export type ButtonProps = React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants>;

export default function Button({
    children,
    variant,
    size,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={buttonVariants({ variant, size, className })}
            {...props}
        >
            {children}
        </button>
    );
}
