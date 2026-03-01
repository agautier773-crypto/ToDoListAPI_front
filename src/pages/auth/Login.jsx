import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import apiFetch from "../../services/api";

export default function Login() {
    const [form, setForm] = useState({username: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify(form),
            });
            alert("Status reçu : " + res.status);
            if (!res.ok) throw new Error();
            const data = await res.json();
            localStorage.setItem("token", data.token);
            navigate("/taches");
        } catch {
            alert("Erreur réelle : " + err.message);
            alert("Identifiants invalides");
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        className="form-control"
                        placeholder="Username"
                        onChange={(e) => setForm({...form, username: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({...form, password: e.target.value})}
                />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Se connecter</button>
                    <p className="p-2">Pas de compte ? <Link to="/register">S'inscrire</Link></p>
                </div>
            </form>
        </div>
    );
}
