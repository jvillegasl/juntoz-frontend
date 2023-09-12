import { IOrder } from "@/interfaces";
import axios from "axios";

export async function getOrder(id: string) {
    const response = await axios<IOrder>({
        method: "get",
        url: `/api/orders/${id}`,
        baseURL: import.meta.env.VITE_BACKEND_URL,
    });

    return response.data;
}
