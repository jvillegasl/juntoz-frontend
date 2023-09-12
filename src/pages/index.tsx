import { OrdersTable } from "./OrdersTable";
import { OrdersFilter } from "./OrdersFilter";
import { useOrders } from "@/hooks";

export default function Root() {
    const {
        filteredOrders,
        clientDNIs,
        orderNumbers,
        setFilter,
        isLoading,
        error,
    } = useOrders();

    function handleFitler(field?: string, value?: string) {
        if (!field || !value) return;

        setFilter({ field, value });
    }

    if (isLoading || !filteredOrders) return <h1>Loading</h1>;

    if (error) return <h1>Fetching failed</h1>;

    return (
        <>
            <OrdersFilter
                clientDNIs={clientDNIs}
                ordersNumbers={orderNumbers}
                onFilter={handleFitler}
            />

            <OrdersTable orders={filteredOrders} />
        </>
    );
}
