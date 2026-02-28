'use client';

import React, { useEffect, useState } from 'react';
import { readContract } from '@wagmi/core';
import { formatEther } from 'viem';
import { config } from '../lib/wagmiConfig';
import { vehicleNftAbi, vehicleNftAddress, VehicleView, fetchMetadata } from '../lib/contracts';
import { motion } from 'framer-motion';
import VehicleCard from '../components/VehicleCard';
import VehicleDetailsDrawer from '../components/VehicleDetailsDrawer';
import { SearchFilters, FilterOptions } from '../components/SearchFilters';
import { VehicleComparison } from '../components/VehicleComparison';
import { QuickActions } from '../components/QuickActions';
import { FeaturedVehicles } from '../components/FeaturedVehicles';
import { RecentlyViewed } from '../components/RecentlyViewed';
import { demoVehicles, DemoVehicle } from '../lib/demoVehicles';
import { useActivityFeedStore } from '../lib/activityStore';

export default function Marketplace() {
    const [vehicles, setVehicles] = useState<VehicleView[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVehicle, setSelectedVehicle] = useState<{
        type: "demo";
        data: DemoVehicle;
        mode?: "buy" | "rent"
    } | {
        type: "onchain";
        data: VehicleView;
        mode?: "buy" | "rent"
    } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<FilterOptions>({
        priceRange: [0, 1000000],
        yearRange: [2000, 2026],
        make: [],
        type: [],
        listed: null
    });
    const [comparisonVehicles, setComparisonVehicles] = useState<Array<{
        type: "demo" | "onchain";
        data: DemoVehicle | VehicleView;
    }>>([]);
    const [showComparison, setShowComparison] = useState(false);

    const { addActivity } = useActivityFeedStore();

    const fetchVehicles = async () => {
        setLoading(true);
        const tempVehicles: VehicleView[] = [];

        // Fetch first 10 for now to be faster
        for (let i = 1; i <= 10; i++) {
            try {
                const vehicleData = await readContract(config, {
                    address: vehicleNftAddress,
                    abi: vehicleNftAbi,
                    functionName: 'getVehicle',
                    args: [BigInt(i)],
                }) as any;

                const tokenUri = await readContract(config, {
                    address: vehicleNftAddress,
                    abi: vehicleNftAbi,
                    functionName: 'tokenURI',
                    args: [BigInt(i)],
                }) as string;

                const metadata = await fetchMetadata(tokenUri);

                tempVehicles.push({
                    tokenId: i,
                    currentOwner: vehicleData.currentOwner,
                    price: vehicleData.price,
                    listed: vehicleData.listed,
                    deliveryStage: vehicleData.deliveryStage,
                    metadata: metadata,
                });
            } catch (err) {
                // Skip if not minted or error
            }
        }
        setVehicles(tempVehicles);
        setLoading(false);
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handlePurchaseComplete = ({ demo }: { demo?: boolean } = {}) => {
        if (!demo) {
            // Refresh on-chain data
            fetchVehicles();
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleFilter = (newFilters: FilterOptions) => {
        setFilters(newFilters);
    };

    const handleQuickAction = (action: string) => {
        // Handle quick actions
        console.log('Quick action:', action);
        // In a real app, this would filter vehicles or navigate
    };

    const handleAddToComparison = (vehicle: { type: "demo" | "onchain"; data: DemoVehicle | VehicleView }) => {
        if (comparisonVehicles.length < 3 && !comparisonVehicles.some(v =>
            v.type === vehicle.type &&
            ((v.type === 'demo' && (v.data as DemoVehicle).id === (vehicle.data as DemoVehicle).id) ||
             (v.type === 'onchain' && (v.data as VehicleView).tokenId === (vehicle.data as VehicleView).tokenId))
        )) {
            setComparisonVehicles([...comparisonVehicles, vehicle]);
        }
    };

    const handleRemoveFromComparison = (index: number) => {
        setComparisonVehicles(comparisonVehicles.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-12">
            {/* Hero Header */}
            <section className="mb-16 text-center">
                <div className="relative">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Find Your Next Car
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Explore a marketplace of vehicle digital twins with transparent delivery and service history on Monad.
                        Discover the future of automotive ownership with blockchain-powered trust and innovation.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Search & Filters */}
            <section>
                <SearchFilters
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                />
            </section>

            {/* Quick Actions */}
            <section>
                <QuickActions onAction={handleQuickAction} />
            </section>

            {/* Featured Vehicles */}
            <section>
                <FeaturedVehicles
                    vehicles={demoVehicles}
                    onVehicleClick={(vehicle) => setSelectedVehicle({ type: "demo", data: vehicle, mode: "buy" })}
                    onRent={(vehicle) => setSelectedVehicle({ type: "demo", data: vehicle, mode: "rent" })}
                />
            </section>

            {/* Recently Viewed */}
            <section>
                <RecentlyViewed
                    onVehicleClick={(vehicle) => setSelectedVehicle({ type: "demo", data: vehicle, mode: "buy" })}
                />
            </section>

            {/* Combined Inventory */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Featured Inventory</h2>
                        <p className="text-sm text-gray-400">Browse available vehicles for sale and rent.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Demo Vehicles */}
                    {demoVehicles.map((demo) => (
                        <div key={demo.id} className="h-[420px]">
                            <VehicleCard
                                variant="demo"
                                id={demo.id}
                                name={demo.name}
                                model={demo.model}
                                year={demo.year}
                                image={demo.image}
                                priceLabel={demo.priceLabel}
                                listed={true}
                                deliveryStageLabel="Available"
                                onClick={() => setSelectedVehicle({ type: "demo", data: demo, mode: "buy" })}
                                onRent={() => setSelectedVehicle({ type: "demo", data: demo, mode: "rent" })}
                                onCompare={() => handleAddToComparison({ type: "demo", data: demo })}
                            />
                        </div>
                    ))}

                    {/* On-Chain Vehicles */}
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="h-[420px] bg-gray-100 rounded-3xl animate-pulse flex flex-col overflow-hidden">
                                <div className="h-64 bg-gray-200" />
                                <div className="p-6 space-y-4 flex-1">
                                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                    <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center">
                                        <div className="h-8 bg-gray-200 rounded w-20" />
                                        <div className="h-8 bg-gray-200 rounded w-24" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        vehicles.map((v) => (
                            <div key={v.tokenId} className="h-[420px]">
                                <VehicleCard
                                    variant="onchain"
                                    id={v.tokenId.toString()}
                                    name={v.metadata?.name || `Vehicle #${v.tokenId}`}
                                    model={v.metadata?.model}
                                    year={v.metadata?.year}
                                    image={v.metadata?.image}
                                    priceLabel={formatEther(v.price) + " MON"}
                                    listed={v.listed}
                                    deliveryStageLabel={v.deliveryStage === 2 ? 'Delivered' : v.deliveryStage === 1 ? 'In Transit' : undefined}
                                    onClick={() => setSelectedVehicle({ type: "onchain", data: v, mode: "buy" })}
                                    onRent={() => setSelectedVehicle({ type: "onchain", data: v, mode: "rent" })}
                                    onCompare={() => handleAddToComparison({ type: "onchain", data: v })}
                                />
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Details Drawer */}
            <VehicleDetailsDrawer
                isOpen={!!selectedVehicle}
                onClose={() => setSelectedVehicle(null)}
                variant={selectedVehicle?.type === 'demo' ? 'demo' : 'onchain'}
                demoData={selectedVehicle?.type === 'demo' ? selectedVehicle.data : undefined}
                onchainData={selectedVehicle?.type === 'onchain' ? selectedVehicle.data : undefined}
                onPurchaseComplete={handlePurchaseComplete}
                modeOverride={selectedVehicle?.mode}
            />

            {/* Vehicle Comparison Modal */}
            <VehicleComparison
                isOpen={showComparison}
                onClose={() => setShowComparison(false)}
                vehicles={comparisonVehicles}
                onRemoveVehicle={handleRemoveFromComparison}
            />

            {/* Floating Compare Button */}
            {comparisonVehicles.length > 0 && (
                <motion.button
                    onClick={() => setShowComparison(true)}
                    className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow z-40"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="relative">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {comparisonVehicles.length}
                        </span>
                    </div>
                </motion.button>
            )}
        </div>
    );
}
