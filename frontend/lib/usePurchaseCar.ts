"use client";

import { useWriteContract } from "wagmi";
import { carPurchaseRegistryAddress, carPurchaseRegistryAbi } from "./contracts";

export function usePurchaseCar() {
    const { writeContractAsync } = useWriteContract();

    const purchaseCar = async (carName: string, carModel: string, deliveryDays: number) => {
        const hash = await writeContractAsync({
            address: carPurchaseRegistryAddress,
            abi: carPurchaseRegistryAbi,
            functionName: "purchaseCar",
            args: [carName, carModel, BigInt(deliveryDays)],
        });

        return hash; // tx hash
    };

    return { purchaseCar };
}