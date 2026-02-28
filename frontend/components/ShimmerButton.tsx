import React from 'react';
import { clsx } from 'clsx';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <button
            className={clsx(
                "relative inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-all duration-300 ease-in-out rounded-lg overflow-hidden",
                "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600",
                "hover:from-blue-700 hover:via-purple-700 hover:to-blue-700",
                "shadow-lg hover:shadow-xl",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
                "before:translate-x-[-100%] hover:before:translate-x-[100%]",
                "before:transition-transform before:duration-700",
                className
            )}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </button>
    );
};