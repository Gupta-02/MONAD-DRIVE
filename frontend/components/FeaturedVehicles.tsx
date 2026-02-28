import React from 'react';
import { Star, Crown, Zap, TrendingUp } from 'lucide-react';
import VehicleCard from './VehicleCard';
import { DemoVehicle } from '../lib/demoVehicles';

interface FeaturedVehiclesProps {
    vehicles: DemoVehicle[];
    onVehicleClick: (vehicle: DemoVehicle) => void;
    onRent: (vehicle: DemoVehicle) => void;
    className?: string;
}

export const FeaturedVehicles: React.FC<FeaturedVehiclesProps> = ({
    vehicles,
    onVehicleClick,
    onRent,
    className = ""
}) => {
    // Select featured vehicles (first 3 for demo)
    const featuredVehicles = vehicles.slice(0, 3);

    const badges = [
        { icon: Crown, label: 'Premium', color: 'text-yellow-500 bg-yellow-50' },
        { icon: Zap, label: 'Electric', color: 'text-green-500 bg-green-50' },
        { icon: TrendingUp, label: 'Trending', color: 'text-green-500 bg-green-50' }
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                    <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Featured Vehicles</h2>
                    <p className="text-gray-600">Handpicked premium vehicles with special offers</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredVehicles.map((vehicle, index) => (
                    <div
                        key={vehicle.id}
                        className="relative"
                    >
                        {/* Featured Badge */}
                        <div className={`absolute -top-3 left-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium shadow-lg ${badges[index % badges.length].color}`}>
                            {(() => {
                                const Icon = badges[index % badges.length].icon;
                                return <Icon className="w-3 h-3" />;
                            })()}
                            {badges[index % badges.length].label}
                        </div>

                        {/* Special Offer Ribbon */}
                        <div className="absolute -top-3 right-4 z-10">
                            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                Special Offer
                            </div>
                        </div>

                        <div className="h-[420px]">
                            <VehicleCard
                                variant="demo"
                                id={vehicle.id}
                                name={vehicle.name}
                                model={vehicle.model}
                                year={vehicle.year}
                                image={vehicle.image}
                                priceLabel={vehicle.priceLabel}
                                listed={true}
                                deliveryStageLabel="Available"
                                onClick={() => onVehicleClick(vehicle)}
                                onRent={() => onRent(vehicle)}
                                customBadge={
                                    <div className="flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                                        <Star className="w-3 h-3" />
                                        Featured
                                    </div>
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action */}
            <div
                className="text-center py-8"
            >
                <p className="text-gray-600 mb-4">Want to see all featured vehicles?</p>
                <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    View All Featured
                </button>
            </div>
        </div>
    );
};