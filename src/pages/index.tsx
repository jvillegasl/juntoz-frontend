import { useQuery } from "react-query";

import { getOrders } from "@/services";
import { OrdersTable } from "./OrdersTable";

export default function Root() {
    const { data: orders, isLoading, error } = useQuery("orders", getOrders);

    if (isLoading || !orders) return <h1>Loading</h1>;

    if (error) return <h1>Fetching failed</h1>;

    return <OrdersTable orders={orders} />;
}
