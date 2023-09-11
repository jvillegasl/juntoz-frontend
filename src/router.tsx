import { createBrowserRouter } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import Root from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <RequireAuth loginPath="/login">
                <Root />
            </RequireAuth>
        ),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);
