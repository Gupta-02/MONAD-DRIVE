import React, { useState } from 'react';
import { X, Plus, BarChart3, Zap, Calendar, DollarSign } from 'lucide-react';
import { VehicleView } from '../lib/contracts';
import { DemoVehicle } from '../lib/demoVehicles';

interface VehicleComparisonProps {
    isOpen: boolean;
    onClose: () => void;
    vehicles: Array<{
        type: "demo" | "onchain";
        data: DemoVehicle | VehicleView;
    }>;
    onRemoveVehicle: (index: number) => void;
}

export const VehicleComparison: React.FC<VehicleComparisonProps> = ({
    isOpen,
    onClose,
    vehicles,
    onRemoveVehicle
}) => {
    const [activeTab, setActiveTab] = useState<'specs' | 'pricing' | 'features'>('specs');

    const getVehicleData = (vehicle: { type: "demo" | "onchain"; data: DemoVehicle | VehicleView }) => {
        if (vehicle.type === 'demo') {
            const data = vehicle.data as DemoVehicle;
            return {
                id: data.id,
                name: data.name,
                model: data.model,
                year: data.year,
                image: data.image,
                price: data.priceLabel,
                specs: {
                    range: '300 miles',
                    acceleration: '0-60 in 3.1s',
                    topSpeed: '140 mph',
                    battery: '75 kWh',
                    horsepower: '402 hp'
                },
                features: ['Autopilot', 'Supercharger Access', 'Mobile App', 'Over-the-air Updates']
            };
        } else {
            const data = vehicle.data as VehicleView;
            return {
                id: data.tokenId?.toString() || 'N/A',
                name: data.metadata?.name || 'Unknown',
                model: data.metadata?.model || 'N/A',
                year: data.metadata?.year || 'N/A',
                image: data.metadata?.image || '',
                price: 'N/A',
                specs: {
                    range: 'N/A',
                    acceleration: 'N/A',
                    topSpeed: 'N/A',
                    battery: 'N/A',
                    horsepower: 'N/A'
                },
                features: ['NFT Ownership', 'Blockchain Tracking']
            };
        }
    };

    const comparisonData = vehicles.map(getVehicleData);

    const tabs = [
        { id: 'specs', label: 'Specifications', icon: BarChart3 },
        { id: 'pricing', label: 'Pricing', icon: DollarSign },
        { id: 'features', label: 'Features', icon: Zap }
    ];

    return (
        <>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <div
                        className="fixed inset-4 md:inset-8 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Vehicle Comparison</h2>
                                <p className="text-gray-600">Compare {vehicles.length} vehicles side by side</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto">
                            {/* Vehicle Headers */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 border-b border-gray-200">
                                {comparisonData.map((vehicle, index) => (
                                    <div key={vehicle.id} className="text-center">
                                        <div className="relative mb-4">
                                            <img
                                                src={vehicle.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                                                alt={vehicle.name}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                onClick={() => onRemoveVehicle(index)}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <h3 className="font-semibold text-lg text-gray-900">{vehicle.name}</h3>
                                        <p className="text-gray-600">{vehicle.model} • {vehicle.year}</p>
                                        <p className="text-blue-600 font-medium mt-1">{vehicle.price}</p>
                                    </div>
                                ))}

                                {/* Add Vehicle Slot */}
                                {vehicles.length < 3 && (
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 transition-colors cursor-pointer">
                                        <Plus className="w-8 h-8 mb-2" />
                                        <span className="text-sm">Add Vehicle</span>
                                    </div>
                                )}
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-gray-200">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                                            activeTab === tab.id
                                                ? 'text-blue-600 border-b-2 border-blue-600'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Comparison Content */}
                            <div className="p-6">
                                {activeTab === 'specs' && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {comparisonData.map((vehicle, index) => (
                                                <div key={vehicle.id} className="space-y-3">
                                                    <h4 className="font-medium text-gray-900">{vehicle.name}</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Range:</span>
                                                            <span className="font-medium">{vehicle.specs.range}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">0-60 mph:</span>
                                                            <span className="font-medium">{vehicle.specs.acceleration}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Top Speed:</span>
                                                            <span className="font-medium">{vehicle.specs.topSpeed}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Battery:</span>
                                                            <span className="font-medium">{vehicle.specs.battery}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Horsepower:</span>
                                                            <span className="font-medium">{vehicle.specs.horsepower}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'pricing' && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Pricing & Value</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {comparisonData.map((vehicle, index) => (
                                                <div key={vehicle.id} className="bg-gray-50 rounded-lg p-4">
                                                    <h4 className="font-medium text-gray-900 mb-3">{vehicle.name}</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Purchase Price:</span>
                                                            <span className="font-medium text-green-600">{vehicle.price}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Daily Rental:</span>
                                                            <span className="font-medium">~{Math.round(parseInt(vehicle.price.replace(/[^0-9]/g, '')) / 1000)} MON</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Insurance Est.:</span>
                                                            <span className="font-medium">~{Math.round(parseInt(vehicle.price.replace(/[^0-9]/g, '')) / 200)} MON/mo</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'features' && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Features & Capabilities</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {comparisonData.map((vehicle, index) => (
                                                <div key={vehicle.id} className="space-y-3">
                                                    <h4 className="font-medium text-gray-900">{vehicle.name}</h4>
                                                    <div className="space-y-2">
                                                        {vehicle.features.map((feature, featureIndex) => (
                                                            <div key={featureIndex} className="flex items-center gap-2 text-sm">
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                                <span>{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};