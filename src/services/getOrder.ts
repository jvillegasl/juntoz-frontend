import { IOrder } from "@/interfaces";
import axios from "axios";

export async function getOrder(id: string) {
    const response = await axios<IOrder>({
        method: "get",
        url: `/api/orders/${id}`,
        baseURL: "https://localhost:7247/",
    });

    return response.data;
}
