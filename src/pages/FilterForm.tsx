import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { useState, FormEvent } from "react";

type FilterFormProps = {
    id?: string;
    clientDNIs: string[];
    ordersNumbers: number[];
    onSubmit: (filterField: string, filterValue: string) => void;
};

type FilterBy = "OrderNumber" | "ClientDNI";

export function FilterForm({
    id,
    clientDNIs,
    ordersNumbers,
    onSubmit,
}: FilterFormProps) {
    const [filterField, setFilterField] = useState<FilterBy>("OrderNumber");
    const [filterValue, setFilterValue] = useState<string>("");

    function handleFilterBy({}, newFilterBy: FilterBy | null) {
        if (newFilterBy === null) return;

        setFilterValue("");
        setFilterField(newFilterBy);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        onSubmit(filterField, filterValue);
    }

    return (
        <Box id={id} component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <FormControl margin="normal" fullWidth>
                <ToggleButtonGroup
                    color="primary"
                    value={filterField}
                    onChange={handleFilterBy}
                    exclusive
                >
                    <ToggleButton value="OrderNumber">
                        Order Number
                    </ToggleButton>

                    <ToggleButton value="ClientDNI">Client DNI</ToggleButton>
                </ToggleButtonGroup>
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <InputLabel>
                    {filterField === "OrderNumber"
                        ? "Order Number"
                        : "Client DNI"}
                </InputLabel>

                <Select
                    label={
                        filterField === "OrderNumber"
                            ? "Order Number"
                            : "Client DNI"
                    }
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                >
                    {(filterField === "OrderNumber"
                        ? ordersNumbers
                        : clientDNIs
                    ).map((v, i) => (
                        <MenuItem key={i} value={String(v)}>
                            {v}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
