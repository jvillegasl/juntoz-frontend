import axios from "axios";

type LoginData = {
    username: string;
    password: string;
};

export async function login(data: LoginData) {
    const response = await axios({
        method: "post",
        url: "/api/auth/login",
        baseURL: import.meta.env.VITE_BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
        },
        data,
    });

    const token = response.data as string;

    return token;
}
