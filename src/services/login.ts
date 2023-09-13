import axios from "axios";

type LoginData = {
    username: string;
    password: string;
};

type LoginResponse = {
    token: string;
    expiresIn: number;
};

export async function login(data: LoginData) {
    const response = await axios<LoginResponse>({
        method: "post",
        url: "/api/auth/login",
        baseURL: import.meta.env.VITE_BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
        },
        data,
    });

    return response.data;
}
