import { getOrders } from "@/services";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

export function useOrders() {
    const { data: orders, isLoading, error } = useQuery("orders", getOrders);

    const [filter, setFilter] = useState<{ field: string; value: string }>();

    const filteredOrders = useMemo(() => {
        if (!orders) return [];

        if (!filter) return orders;

        return orders.filter((order) => {
            const value = String(order[filter.field as keyof typeof order]);

            return value === filter.value;
        });
    }, [orders, filter]);

    const clientDNIs = useMemo(() => {
        if (!orders) return [];

        const DNIs = orders.map((order) => order.ClientDNI);

        return Array.from(new Set(DNIs));
    }, [orders]);

    const orderNumbers = useMemo(() => {
        if (!orders) return [];

        return orders.map((order) => order.OrderNumber);
    }, [orders]);

    return {
        orders,
        filter,
        setFilter,
        filteredOrders,
        isLoading,
        error,
        clientDNIs,
        orderNumbers,
    };
}
