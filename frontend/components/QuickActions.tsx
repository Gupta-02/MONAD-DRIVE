import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, TrendingUp, Star, Zap, Shield } from 'lucide-react';

interface QuickActionsProps {
    onAction: (action: string) => void;
    className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
    onAction,
    className = ""
}) => {
    const actions = [
        {
            id: 'favorites',
            label: 'Favorites',
            icon: Heart,
            color: 'text-red-500',
            bgColor: 'bg-red-50 hover:bg-red-100',
            description: 'View saved vehicles'
        },
        {
            id: 'recent',
            label: 'Recently Viewed',
            icon: Clock,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50 hover:bg-blue-100',
            description: 'Your recent activity'
        },
        {
            id: 'trending',
            label: 'Trending',
            icon: TrendingUp,
            color: 'text-green-500',
            bgColor: 'bg-green-50 hover:bg-green-100',
            description: 'Popular vehicles'
        },
        {
            id: 'premium',
            label: 'Premium',
            icon: Star,
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-50 hover:bg-yellow-100',
            description: 'Exclusive vehicles'
        },
        {
            id: 'electric',
            label: 'Electric Only',
            icon: Zap,
            color: 'text-purple-500',
            bgColor: 'bg-purple-50 hover:bg-purple-100',
            description: 'Zero emission vehicles'
        },
        {
            id: 'certified',
            label: 'Certified',
            icon: Shield,
            color: 'text-indigo-500',
            bgColor: 'bg-indigo-50 hover:bg-indigo-100',
            description: 'Verified quality'
        }
    ];

    return (
        <div className={`space-y-4 ${className}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
                <p className="text-sm text-gray-600">Fast access to common tasks</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {actions.map((action) => (
                    <motion.button
                        key={action.id}
                        onClick={() => onAction(action.id)}
                        className={`p-4 rounded-xl ${action.bgColor} border border-gray-200 transition-all duration-200 text-left group`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-white shadow-sm ${action.color}`}>
                                {(() => {
                                    const Icon = action.icon;
                                    return <Icon className="w-4 h-4" />;
                                })()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 text-sm group-hover:text-gray-800">
                                    {action.label}
                                </h4>
                                <p className="text-xs text-gray-600 mt-1 leading-tight">
                                    {action.description}
                                </p>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};