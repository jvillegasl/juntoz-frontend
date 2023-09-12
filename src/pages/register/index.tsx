import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import { Box, Container, Link, Typography } from "@mui/material";

export default function Register() {
    const navigate = useNavigate();

    function handleSuccess() {
        navigate("/login");
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
                    Register
                </Typography>

                <RegisterForm onSuccess={handleSuccess} />

                <Link href="/register" variant="body2">
                    {"Already have an account? Login"}
                </Link>
            </Box>
        </Container>
    );
}
