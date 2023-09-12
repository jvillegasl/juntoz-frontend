import { getOrder } from "@/services";
import {
    Box,
    CircularProgress,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
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
                    Loading order...
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

    if (!order) {
        return (
            <Typography marginY={8} fontWeight={500} fontStyle="italic">
                The requested order was not found.
            </Typography>
        );
    }

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
