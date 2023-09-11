import { createBrowserRouter } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import Root from "./routes";
import Login from "./routes/login";
import Register from "./routes/register";

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
