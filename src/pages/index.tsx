import { OrdersTable } from "./OrdersTable";
import { OrdersFilter } from "./OrdersFilter";
import { useOrders } from "@/hooks";
import { CircularProgress, Grid, Typography } from "@mui/material";

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

    if (isLoading) {
        return (
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap={8}
                sx={{ my: 16 }}
            >
                <CircularProgress size={64} />

                <Typography fontWeight={500} fontStyle="italic">
                    Loading orders...
                </Typography>
            </Grid>
        );
    }

    if (error) {
        return (
            <Typography
                color="red"
                marginY={8}
                fontWeight={500}
                fontStyle="italic"
            >
                We're sorry but something went wrong. Please try again in a few
                minutes.
            </Typography>
        );
    }

    if (filteredOrders.length === 0) {
        return (
            <Typography marginY={8} fontWeight={500} fontStyle="italic">
                No orders were found.
            </Typography>
        );
    }

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
