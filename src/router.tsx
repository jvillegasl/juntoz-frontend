import { createBrowserRouter } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import Root from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";
import RootLayout from "./pages/Layout";
import Details from "./pages/details";

export const router = createBrowserRouter([
    {
        element: (
            <RequireAuth loginPath="/login">
                <RootLayout />
            </RequireAuth>
        ),
        children: [
            {
                path: "/details/:id",
                element: <Details />,
            },
            {
                path: "/",
                element: <Root />,
            },
        ],
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
