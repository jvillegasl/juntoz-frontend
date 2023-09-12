import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const LoginSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .min(1, { message: "Username is required" }),
    email: z
        .string({ required_error: "Email is required" })
        .min(1, { message: "Email is required" })
        .email({ message: "Provided email is not in a valid format." }),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" }),
});

type LoginInput = z.infer<typeof LoginSchema>;

type RegisterFormProps = {
    onSuccess: () => void;
};

export function RegisterForm({ onSuccess }: RegisterFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<LoginInput> = async function (data) {
        try {
            await axios({
                method: "post",
                url: "/api/auth/register",
                baseURL: "https://localhost:7247/",
                headers: {
                    "Content-Type": "application/json",
                },
                data,
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
                toast.error(e.response.data.message ?? e.message);
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
                id="email"
                type="email"
                label="Email"
                margin="normal"
                error={!!errors.email}
                helperText={!!errors.email && errors.email.message}
                fullWidth
                {...register("email")}
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
