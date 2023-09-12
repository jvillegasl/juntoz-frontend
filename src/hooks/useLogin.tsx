import { login } from "@/services";
import { isAxiosError } from "axios";
import { useSignIn } from "react-auth-kit";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export const LoginSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .min(1, { message: "Username is required" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(1, { message: "Password is required" }),
});

export type LoginInput = z.infer<typeof LoginSchema>;

type UseLoginProps = {
    onSuccess: () => void;
};

export function useLogin({ onSuccess }: UseLoginProps) {
    const signIn = useSignIn();

    const onLogin: SubmitHandler<LoginInput> = async function (data) {
        try {
            const token = await login(data);

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

    return { onLogin };
}
