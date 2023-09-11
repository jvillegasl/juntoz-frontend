import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";

export default function Register() {
    const navigate = useNavigate();

    function handleSuccess() {
        navigate("/login");
    }

    return <RegisterForm onSuccess={handleSuccess} />;
}
