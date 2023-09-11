import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.scss";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "react-auth-kit";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider authType="localstorage" authName="_token">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    theme="colored"
                    pauseOnHover
                    pauseOnFocusLoss
                    closeOnClick
                />
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>,
);
