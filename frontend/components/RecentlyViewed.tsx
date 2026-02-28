import React, { useState, useEffect } from 'react';
import { Clock, Eye, ArrowRight } from 'lucide-react';
import { DemoVehicle } from '../lib/demoVehicles';

interface RecentlyViewedProps {
    onVehicleClick: (vehicle: DemoVehicle) => void;
    className?: string;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
    onVehicleClick,
    className = ""
}) => {
    const [recentVehicles, setRecentVehicles] = useState<DemoVehicle[]>([]);

    // In a real app, this would come from localStorage or an API
    useEffect(() => {
        // Mock recently viewed vehicles
        const mockRecent = [
            {
                id: "1",
                name: "Tesla Model S",
                model: "Plaid",
                year: "2024",
                image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400",
                priceLabel: "85,000 MON",
                description: "The fastest production car ever made"
            },
            {
                id: "2",
                name: "Rivian R1T",
                model: "Adventure",
                year: "2024",
                image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400",
                priceLabel: "75,000 MON",
                description: "Electric adventure vehicle"
            }
        ];
        setRecentVehicles(mockRecent);
    }, []);

    if (recentVehicles.length === 0) {
        return null;
    }

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Recently Viewed</h3>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    View All
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentVehicles.map((vehicle, index) => (
                    <div
                        key={vehicle.id}
                        onClick={() => onVehicleClick(vehicle)}
                        className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all duration-200 group"
                    >
                        <div className="flex gap-3">
                            <div className="relative">
                                <img
                                    src={vehicle.image}
                                    alt={vehicle.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Eye className="w-2 h-2 text-white" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                    {vehicle.name}
                                </h4>
                                <p className="text-sm text-gray-600 truncate">
                                    {vehicle.model} • {vehicle.year}
                                </p>
                                <p className="text-sm font-medium text-green-600 mt-1">
                                    {vehicle.priceLabel}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};