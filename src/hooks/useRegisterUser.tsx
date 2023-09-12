import { registerUser } from "@/services";
import { isAxiosError } from "axios";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export const RegisterSchema = z.object({
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

export type RegisterInput = z.infer<typeof RegisterSchema>;

type UserRegisterUserProps = {
    onSuccess: () => void;
};

export function useRegisterUser({ onSuccess }: UserRegisterUserProps) {
    const onRegister: SubmitHandler<RegisterInput> = async function (data) {
        try {
            await registerUser(data);

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

    return { onRegister };
}
