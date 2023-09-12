import { IOrder } from "@/interfaces";
import axios from "axios";

export async function getOrders() {
    const response = await axios<IOrder[]>({
        method: "get",
        url: "/api/orders",
        baseURL: import.meta.env.VITE_BACKEND_URL,
    });

    return response.data;
}
