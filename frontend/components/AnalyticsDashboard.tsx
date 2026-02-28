import React from 'react';
import { TrendingUp, DollarSign, Car, Users, Activity, Star } from 'lucide-react';

interface AnalyticsCardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    color: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, change, icon, color }) => (
    <div
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {change}
                </p>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                {icon}
            </div>
        </div>
    </div>
);

export const AnalyticsDashboard: React.FC = () => {
    const stats = [
        {
            title: "Total Vehicles",
            value: "2,847",
            change: "+12.5%",
            icon: <Car className="w-6 h-6 text-white" />,
            color: "bg-blue-500"
        },
        {
            title: "Total Value",
            value: "$45.2M",
            change: "+8.2%",
            icon: <DollarSign className="w-6 h-6 text-white" />,
            color: "bg-green-500"
        },
        {
            title: "Active Users",
            value: "1,429",
            change: "+15.3%",
            icon: <Users className="w-6 h-6 text-white" />,
            color: "bg-purple-500"
        },
        {
            title: "Transactions",
            value: "892",
            change: "+22.1%",
            icon: <Activity className="w-6 h-6 text-white" />,
            color: "bg-orange-500"
        }
    ];

    const recentActivity = [
        { action: "Vehicle Sold", vehicle: "Tesla Model S", amount: "$85,000", time: "2 hours ago" },
        { action: "New Listing", vehicle: "Rivian R1T", amount: "$75,000", time: "4 hours ago" },
        { action: "Rental Started", vehicle: "Ford F-150", amount: "$150/day", time: "6 hours ago" },
        { action: "Service Completed", vehicle: "BMW i3", amount: "Maintenance", time: "1 day ago" }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Market Analytics</h2>
                <p className="text-gray-600">Real-time insights into your vehicle marketplace</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={stat.title}
                    >
                        <AnalyticsCard {...stat} />
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Price Trends */}
                <div
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Price Trends</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Electric Vehicles</span>
                            <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded"></div>
                                <span className="text-sm font-medium text-green-600">+15%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Luxury Sedans</span>
                            <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded"></div>
                                <span className="text-sm font-medium text-blue-600">+8%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Pickup Trucks</span>
                            <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded"></div>
                                <span className="text-sm font-medium text-orange-600">+12%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                            >
                                <div>
                                    <p className="font-medium text-gray-900">{activity.action}</p>
                                    <p className="text-sm text-gray-600">{activity.vehicle}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-900">{activity.amount}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Market Insights */}
            <div
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200"
            >
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Market Insights</h3>
                        <p className="text-gray-700 mb-4">
                            Electric vehicles are showing strong growth with a 15% increase in listings this month.
                            Luxury sedans remain popular, while pickup trucks are seeing increased demand in rural areas.
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-gray-600">Avg. Rating: 4.8/5</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Activity className="w-4 h-4 text-green-500" />
                                <span className="text-gray-600">Active Listings: 1,247</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};