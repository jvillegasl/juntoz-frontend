import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";

export default function Login() {
    const navigate = useNavigate();

    function handleSuccess() {
        navigate("/");
    }

    return <LoginForm onSuccess={handleSuccess} />;
}
