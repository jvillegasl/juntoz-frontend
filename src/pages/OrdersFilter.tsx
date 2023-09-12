import { FilterList as FilterIcon } from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { FilterForm } from "./FilterForm";

type OrdersFilterProps = {
    clientDNIs: string[];
    ordersNumbers: number[];
    onFilter: (filterField: string, filterValue: string) => void;
};

export function OrdersFilter({
    clientDNIs,
    ordersNumbers,
    onFilter,
}: OrdersFilterProps) {
    const [open, setOpen] = useState<boolean>(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleFilter(field: string, value: string) {
        onFilter(field, value);
        handleClose();
    }

    return (
        <Box>
            <IconButton color="primary" size="medium" onClick={handleOpen}>
                <FilterIcon />
            </IconButton>

            <Dialog
                fullScreen={fullScreen}
                maxWidth="md"
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Filter</DialogTitle>

                <DialogContent>
                    <FilterForm
                        id="filter-form"
                        clientDNIs={clientDNIs}
                        ordersNumbers={ordersNumbers}
                        onSubmit={handleFilter}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>

                    <Button type="submit" form="filter-form">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
