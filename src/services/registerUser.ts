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
        baseURL: "https://localhost:7247/",
        headers: {
            "Content-Type": "application/json",
        },
        data,
    });
}
