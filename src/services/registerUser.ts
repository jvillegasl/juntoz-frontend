import axios from "axios";

type RegisterData = {
    username: string;
    email: string;
    password: string;
};

export async function registerUser(data: RegisterData) {
    return await axios({
        method: "post",
        url: "/api/auth/register",
        baseURL: import.meta.env.VITE_BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
        },
        data,
    });
}
