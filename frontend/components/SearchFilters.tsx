import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

interface SearchFiltersProps {
    onSearch: (query: string) => void;
    onFilter: (filters: FilterOptions) => void;
    className?: string;
}

export interface FilterOptions {
    priceRange: [number, number];
    yearRange: [number, number];
    make: string[];
    type: string[];
    listed: boolean | null;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
    onSearch,
    onFilter,
    className = ""
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<FilterOptions>({
        priceRange: [0, 1000000],
        yearRange: [2000, 2026],
        make: [],
        type: [],
        listed: null
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        onSearch(query);
    };

    const updateFilters = (newFilters: Partial<FilterOptions>) => {
        const updated = { ...filters, ...newFilters };
        setFilters(updated);
        onFilter(updated);
    };

    const makes = ["Tesla", "Rivian", "Ford", "BMW", "Mercedes", "Audi", "Porsche"];
    const types = ["SUV", "Sedan", "Truck", "Sports Car", "Electric", "Hybrid"];

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Search Bar */}
            <div className="relative">
                <div
                    className="relative"
                >
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search vehicles by name, make, model..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
                <motion.button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Filter className="w-4 h-4" />
                    Filters
                    {showFilters ? <X className="w-4 h-4" /> : null}
                </motion.button>

                {/* Active Filters Count */}
                {(filters.make.length > 0 || filters.type.length > 0 || filters.listed !== null) && (
                    <span className="text-sm text-gray-600">
                        {filters.make.length + filters.type.length + (filters.listed !== null ? 1 : 0)} active
                    </span>
                )}
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Price Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price Range (MON)
                            </label>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="1000000"
                                    step="10000"
                                    value={filters.priceRange[1]}
                                    onChange={(e) => updateFilters({
                                        priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                                    })}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>{filters.priceRange[0].toLocaleString()}</span>
                                    <span>{filters.priceRange[1].toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Year Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year Range
                            </label>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="2000"
                                    max="2026"
                                    value={filters.yearRange[1]}
                                    onChange={(e) => updateFilters({
                                        yearRange: [filters.yearRange[0], parseInt(e.target.value)]
                                    })}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>{filters.yearRange[0]}</span>
                                    <span>{filters.yearRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Make */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Make
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {makes.map((make) => (
                                    <button
                                        key={make}
                                        onClick={() => {
                                            const newMakes = filters.make.includes(make)
                                                ? filters.make.filter(m => m !== make)
                                                : [...filters.make, make];
                                            updateFilters({ make: newMakes });
                                        }}
                                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                            filters.make.includes(make)
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {make}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {types.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            const newTypes = filters.type.includes(type)
                                                ? filters.type.filter(t => t !== type)
                                                : [...filters.type, type];
                                            updateFilters({ type: newTypes });
                                        }}
                                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                            filters.type.includes(type)
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateFilters({ listed: null })}
                                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                        filters.listed === null
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => updateFilters({ listed: true })}
                                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                        filters.listed === true
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Listed
                                </button>
                                <button
                                    onClick={() => updateFilters({ listed: false })}
                                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                        filters.listed === false
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Not Listed
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <button
                            onClick={() => {
                                const defaultFilters: FilterOptions = {
                                    priceRange: [0, 1000000],
                                    yearRange: [2000, 2026],
                                    make: [],
                                    type: [],
                                    listed: null
                                };
                                setFilters(defaultFilters);
                                onFilter(defaultFilters);
                            }}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};