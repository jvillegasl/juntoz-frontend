import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "react-auth-kit";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider authType="localstorage" authName="_token">
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
);
