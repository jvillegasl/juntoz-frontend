import { IOrder } from "@/interfaces";
import axios from "axios";

export async function getOrders() {
    const response = await axios<IOrder[]>({
        method: "get",
        url: "/api/orders",
        baseURL: "https://localhost:7247/",
    });

    return response.data;
}
