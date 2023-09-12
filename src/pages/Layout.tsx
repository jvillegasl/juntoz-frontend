import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSignOut } from "react-auth-kit";
import { Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
    const { pathname } = useLocation();
    const signOut = useSignOut();

    const title = useMemo(() => {
        if (pathname.startsWith("/details")) return "Order Details";

        return "Orders";
    }, [pathname]);

    function handleLogout() {
        signOut();
    }

    return (
        <Container maxWidth="lg" sx={{ p: 4 }}>
            <Box component="header" sx={{ mb: 3 }}>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography component="h1" variant="h4">
                            {title}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            color="warning"
                            variant="outlined"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box component="main" mx={{ sm: 4 }}>
                <Outlet />
            </Box>
        </Container>
    );
}
