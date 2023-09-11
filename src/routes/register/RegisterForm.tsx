import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
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
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<LoginInput> = async function (data) {
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
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" {...register("email")} />
                    {!!errors.email && <p>{errors.email.message}</p>}
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
