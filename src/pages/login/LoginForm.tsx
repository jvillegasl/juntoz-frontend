import { LoginInput, LoginSchema, useLogin } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

type LoginFormProps = {
    onSuccess: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
    });

    const { onLogin } = useLogin({ onSuccess });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onLogin)}
            sx={{ mt: 1 }}
            noValidate
        >
            <TextField
                id="username"
                type="text"
                label="Username"
                margin="normal"
                error={!!errors.username}
                helperText={!!errors.username && errors.username.message}
                autoFocus
                fullWidth
                {...register("username")}
            />

            <TextField
                id="password"
                type="password"
                label="Password"
                margin="normal"
                error={!!errors.password}
                helperText={!!errors.password && errors.password.message}
                fullWidth
                {...register("password")}
            />

            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
            >
                {isSubmitting ? (
                    <CircularProgress color="inherit" size={24} />
                ) : (
                    "Submit"
                )}
            </Button>
        </Box>
    );
}
