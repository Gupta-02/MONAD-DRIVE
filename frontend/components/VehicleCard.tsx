import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export type VehicleCardVariant = "demo" | "onchain";

interface VehicleCardProps {
    variant: VehicleCardVariant;
    id: string;
    name: string;
    model?: string;
    year?: string;
    image?: string;
    priceLabel: string;
    listed?: boolean;
    deliveryStageLabel?: string;
    onClick?: () => void;
    onRent?: () => void;
    onCompare?: () => void;
    showMarketActions?: boolean;
    customBadge?: React.ReactNode;
    latestService?: string;
}

export default function VehicleCard({
    variant,
    id,
    name,
    model,
    year,
    image,
    priceLabel,
    listed,
    deliveryStageLabel,
    onClick,
    onRent,
    onCompare,
    showMarketActions = true,
    customBadge,
    latestService
}: VehicleCardProps) {
    const imageUrl = image || 'https://via.placeholder.com/600x400?text=No+Image';

    return (
        <div
            onClick={onClick}
            className={twMerge(
                "group relative flex flex-col h-full cursor-pointer",
                "bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl overflow-hidden",
                "border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20",
                "transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]",
                "ring-1 ring-white/10 hover:ring-blue-500/30"
            )}
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-3xl transition-all duration-500 pointer-events-none"></div>

            {/* Image Section */}
            <div className="relative h-64 bg-gradient-to-br from-gray-800 to-black overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    {/* Compare Button */}
                    {onCompare && (
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                onCompare();
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </motion.button>
                    )}

                    {/* Other Badges */}
                    <div className="flex gap-2">
                        {listed && variant === 'onchain' && (
                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 backdrop-blur-md rounded-full border border-emerald-500/30">
                                Listed
                            </span>
                        )}
                        {deliveryStageLabel && (
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/80 backdrop-blur-md rounded-full border border-white/10">
                            {deliveryStageLabel}
                        </span>
                    )}
                    {customBadge}
                </div>
            </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-gray-900 via-slate-900 to-black">
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white mb-1 truncate tracking-tight">
                        {name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
                        {year && <span>{year}</span>}
                        {model && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                                <span>{model}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Latest Service Display */}
                {typeof latestService === 'string' && latestService.length > 0 && (
                    <div className="mb-4 p-3 bg-zinc-800/50 border border-white/5 rounded-xl flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-orange-500/10 text-orange-400 border-orange-500/20 uppercase">
                                Service
                            </span>
                        </div>
                        <p className="text-xs text-zinc-300 font-medium leading-snug break-words">
                            {latestService}
                        </p>
                    </div>
                )}

                <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                            Price
                        </span>
                        <span className="text-lg font-bold text-white tracking-tight">
                            {priceLabel}
                        </span>
                    </div>

                    {showMarketActions && (
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRent?.();
                                }}
                                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                            >
                                Rent
                            </button>
                            <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/25">
                                Buy
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
