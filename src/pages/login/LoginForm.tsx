import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useSignIn } from "react-auth-kit";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const LoginSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .min(1, { message: "Username is required" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(1, { message: "Password is required" }),
});

type LoginInput = z.infer<typeof LoginSchema>;

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
    const signIn = useSignIn();

    const onSubmit: SubmitHandler<LoginInput> = async function (data) {
        try {
            const response = await axios({
                method: "post",
                url: "/api/auth/login",
                baseURL: "https://localhost:7247/",
                headers: {
                    "Content-Type": "application/json",
                },
                data,
            });

            const token = response.data as string;

            signIn({
                token: token,
                expiresIn: 60,
                tokenType: "Bearer",
                authState: { username: data.username },
            });
            onSuccess();
        } catch (e) {
            console.error(e);

            if (!isAxiosError(e) || (!e.response && !e.request)) {
                toast.error(
                    "An unexpected error has occurred. Please wait a moment and try again",
                );
                return;
            }

            if (e.response) {
                toast.error(
                    e.response.status === 401 ? "Unauthorized" : e.message,
                );
            } else if (e.request) {
                toast.error(
                    "Server could not be contacted. Please wait a moment and try again",
                );
            }
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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
