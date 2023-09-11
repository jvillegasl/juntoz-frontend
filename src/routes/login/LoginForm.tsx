import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { SubmitHandler, useForm } from "react-hook-form";
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
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
    });
    const signIn = useSignIn();

    const onSubmit: SubmitHandler<LoginInput> = async function (data) {
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
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        {...register("username")}
                    />
                    {!!errors.username && <p>{errors.username.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password")}
                    />
                    {!!errors.password && <p>{errors.password.message}</p>}
                </div>
            </div>

            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}
