import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Article as DetailsIcon } from "@mui/icons-material";

import { IOrder } from "@/interfaces";

type OrdersTableProps = {
    orders: IOrder[];
};

export function OrdersTable({ orders }: OrdersTableProps) {
    return (
        <TableContainer>
            <Table sx={{ tableLayout: "auto" }}>
                <TableHead>
                    <TableRow>
                        <TableCell
                            align="center"
                            width="min-content"
                            sx={{ whiteSpace: "pre" }}
                        >
                            Order #
                        </TableCell>

                        <TableCell width="100%">Description</TableCell>

                        <TableCell align="center" sx={{ whiteSpace: "pre" }}>
                            Client DNI
                        </TableCell>

                        <TableCell align="center" sx={{ whiteSpace: "pre" }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {orders.map((order, i) => (
                        <TableRow key={i}>
                            <TableCell
                                align="center"
                                width="min-content"
                                sx={{ whiteSpace: "pre" }}
                            >
                                {order.OrderNumber}
                            </TableCell>

                            <TableCell width="100%">
                                {order.Description}
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ whiteSpace: "pre" }}
                            >
                                {order.ClientDNI}
                            </TableCell>

                            <TableCell align="center">
                                <IconButton
                                    href={`/details/${order.Id}`}
                                    color="primary"
                                    size="medium"
                                >
                                    <DetailsIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
