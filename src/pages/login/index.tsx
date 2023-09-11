import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { Box, Container, Link, Typography } from "@mui/material";

export default function Login() {
    const navigate = useNavigate();

    function handleSuccess() {
        navigate("/");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                <LoginForm onSuccess={handleSuccess} />

                <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
            </Box>
        </Container>
    );
}
