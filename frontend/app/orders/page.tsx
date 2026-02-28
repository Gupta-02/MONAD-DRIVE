"use client";

import React from "react";
import { demoOrdersInTransit } from "../../lib/ordersData";
import DeliveryProgress from "../../components/DeliveryProgress";
import { useReadContract } from "wagmi";
import { carPurchaseRegistryAddress, carPurchaseRegistryAbi, Purchase } from "../../lib/contracts";

export default function OrdersPage() {
    const { data: purchaseCount } = useReadContract({
        address: carPurchaseRegistryAddress,
        abi: carPurchaseRegistryAbi,
        functionName: "getPurchaseCount",
    });

    // For demo, show first purchase if any
    const { data: firstPurchase } = useReadContract({
        address: carPurchaseRegistryAddress,
        abi: carPurchaseRegistryAbi,
        functionName: "getPurchase",
        args: purchaseCount ? [0n] : undefined,
        query: {
            enabled: !!purchaseCount && (purchaseCount as bigint) > 0n,
        },
    });

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
                <p className="text-gray-500 mt-1">Track vehicles currently in transit and view purchase history.</p>
            </div>

            {/* Purchase History */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Purchase History</h2>
                {!(purchaseCount as bigint) || (purchaseCount as bigint) === 0n ? (
                    <p className="text-gray-500">No purchases yet.</p>
                ) : (
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-600">Total purchases: {(purchaseCount as bigint)?.toString()}</p>
                        {firstPurchase ? (
                            <div className="mt-2">
                                <p><strong>Car:</strong> {(firstPurchase as Purchase).carName}</p>
                                <p><strong>Model:</strong> {(firstPurchase as Purchase).carModel}</p>
                                <p><strong>Delivery Days:</strong> {(firstPurchase as Purchase).deliveryDays.toString()}</p>
                                <p><strong>Timestamp:</strong> {new Date(Number((firstPurchase as Purchase).timestamp) * 1000).toLocaleString()}</p>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>

            {/* In Transit Orders */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Vehicles in Transit</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {demoOrdersInTransit.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Image Section */}
                            <div className="h-48 bg-gray-100 relative">
                                <img
                                    src={order.image}
                                    alt={order.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 backdrop-blur-md">
                                        In Transit
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">{order.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {order.year} {order.model}
                                    </p>
                                    <p className="text-sm font-medium text-emerald-600 mt-1">
                                        Delivery expected in {order.expectedInDays} days
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-6 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                                    <DeliveryProgress currentStopIndex={order.currentStopIndex} stops={order.routeStops} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
