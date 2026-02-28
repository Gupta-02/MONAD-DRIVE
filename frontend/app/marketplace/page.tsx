"use client";

import { useState } from "react";
import { usePurchaseCar } from "@/lib/usePurchaseCar";
import { demoVehicles } from "@/lib/demoVehicles";
import { Button } from "@/components/Button";
import { useWaitForTransactionReceipt } from "wagmi";

export default function MarketplacePage() {
    const { purchaseCar } = usePurchaseCar();
    const [pendingTx, setPendingTx] = useState<string | null>(null);

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: pendingTx as `0x${string}` | undefined,
    });

    const handlePurchase = async (vehicle: typeof demoVehicles[0]) => {
        try {
            const hash = await purchaseCar(vehicle.name, vehicle.model, 7); // default 7 days delivery
            setPendingTx(hash);
        } catch (error) {
            console.error("Purchase failed:", error);
            alert("Purchase failed. Check console for details.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Car Marketplace</h1>

            {pendingTx && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-blue-800">
                        Transaction {isConfirming ? "pending..." : isConfirmed ? "confirmed!" : "failed"}
                    </p>
                    <a
                        href={`https://testnet.monadexplorer.com/tx/${pendingTx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        View on Explorer
                    </a>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demoVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{vehicle.name}</h2>
                            <p className="text-gray-600 mb-2">{vehicle.model} - {vehicle.year}</p>
                            <p className="text-lg font-bold text-green-600 mb-2">{vehicle.priceLabel}</p>
                            {vehicle.mileage && <p className="text-sm text-gray-500">Mileage: {vehicle.mileage}</p>}
                            <Button
                                onClick={() => handlePurchase(vehicle)}
                                disabled={isConfirming}
                                className="w-full mt-4"
                            >
                                {isConfirming ? "Processing..." : "Purchase Car"}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}