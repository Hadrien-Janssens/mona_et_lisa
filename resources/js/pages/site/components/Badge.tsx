import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center justify-center rounded-full border font-medium transition-colors',
    {
        variants: {
            variant: {
                default:
                    'border-ternary bg-[#F8F3EB] text-ternary hover:bg-ternary/10',
                primary:
                    'border-primary bg-primary text-primary-foreground hover:bg-primary/90',
                outline:
                    'border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
            },
            size: {
                default: 'px-2 py-0.5 text-xs',
                sm: 'px-1.5 py-0.5 text-[10px]',
                lg: 'px-3 py-1 text-sm',
            },
            isActive: {
                true: '',
                false: '',
            },
            isClickable: {
                true: 'hover:cursor-pointer',
                false: '',
            },
        },
        compoundVariants: [
            {
                variant: 'default',
                isActive: true,
                className:
                    'border-ternary bg-ternary text-white hover:bg-ternary/90',
            },
            {
                variant: 'primary',
                isActive: true,
                className:
                    'border-primary-foreground bg-primary-foreground text-primary',
            },
            {
                variant: 'outline',
                isActive: true,
                className: 'bg-accent text-accent-foreground',
            },
        ],
        defaultVariants: {
            variant: 'default',
            size: 'default',
            isActive: false,
        },
    },
);

export type BadgeProps = React.ComponentProps<'div'> &
    VariantProps<typeof badgeVariants> & {
        isActive?: boolean;
    };

export default function Badge({
    children,
    variant,
    size,
    isActive = false,
    className,
    isClickable = false,
    ...props
}: BadgeProps) {
    return (
        <div
            className={cn(
                badgeVariants({ variant, size, isActive, isClickable }),
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
