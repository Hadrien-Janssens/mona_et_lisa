import React from 'react';

type ProgressBarProps = {
    value: number;
    max: number;
    className?: string;
};

export default function ProgressBar({
    value,
    max,
    className = '',
}: ProgressBarProps) {
    const percentage =
        max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

    // Determine the color based on the fill percentage
    const colorClass = 'bg-primary'; // plenty of places

    return (
        <div className={`w-full ${className}`}>
            <div className="mb-1 flex justify-between text-xs font-medium text-gray-600">
                <span className="text-ternary">
                    {value}/{max} inscrit{value >= 2 ? 's' : ''}
                </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full border-primary bg-blue-100">
                <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
