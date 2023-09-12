import { Box, Container, Typography } from "@mui/material";
import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
    const { pathname } = useLocation();

    const title = useMemo(() => {
        if (pathname.startsWith("/details")) return "Order Details";

        return "Orders";
    }, [pathname]);

    return (
        <Container maxWidth="lg" sx={{ p: 4 }}>
            <Box component="header" sx={{ mb: 3 }}>
                <Typography component="h1" variant="h4">
                    {title}
                </Typography>
            </Box>

            <Box component="main" mx={{sm: 4}}> 
                <Outlet />
            </Box>
        </Container>
    );
}
