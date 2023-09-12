import { getOrder } from "@/services";
import { Box, TextField } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

type DetailsParams = {
    id: string;
};

export default function Details() {
    const { id } = useParams<DetailsParams>() as DetailsParams;
    const {
        data: order,
        isLoading,
        error,
    } = useQuery(["order", id], () => getOrder(id));

    if (isLoading) return <h2>Loading...</h2>;

    if (error) return <h2>There was an error while fetching the data.</h2>;

    if (!order) return <h2>Order not found</h2>;

    return (
        <Box component="form">
            <TextField
                id="id"
                margin="normal"
                variant="standard"
                label="ID"
                defaultValue={order.Id}
                inputProps={{ readOnly: true }}
                fullWidth
            />

            <TextField
                id="orderNumber"
                margin="normal"
                variant="standard"
                label="Order Number"
                defaultValue={order.OrderNumber}
                inputProps={{ readOnly: true }}
                fullWidth
            />

            <TextField
                id="clientDNI"
                margin="normal"
                variant="standard"
                label="Client DNI"
                defaultValue={order.ClientDNI}
                inputProps={{ readOnly: true }}
                fullWidth
            />

            <TextField
                id="description"
                margin="normal"
                variant="standard"
                label="Description"
                defaultValue={order.Description}
                inputProps={{ readOnly: true }}
                fullWidth
            />
        </Box>
    );
}
