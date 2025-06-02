import { useState } from "react";
import { useAuth } from "../context/Context";
import { Link } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", contraseña: "" });
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      alert("Inicio de sesión exitoso");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className=" m-15 pt-4 flex gap-20">
        <div className="w-3/5">
            <form onSubmit={handleSubmit}
            className="flex flex-col gap-5">
                <div>
                    <p className="font-bold text-2xl font-mono">Inicia sesión</p>
                </div>
                <div className="flex flex-col gap-5 m-3">
                    <div>
                    <p>Email</p>
                    <input name="email" onChange={handleChange} placeholder="example@gmail.com" 
                    className="border-2 rounded-sm"/>
                </div>
                <div>
                    <p>Contaseña</p>
                    <input name="contraseña" type="password" onChange={handleChange} placeholder="********" 
                    className="border-2 rounded-sm" />
                </div>
                <div className="flex flex-col gap-5">
                    <button type="submit" className="bg-blue-600 text-white rounded-sm p-2 w-1/5">Iniciar sesión</button>
                    <div className="flex gap-1">
                        <p>¿No tienes cuenta?</p>
                        <Link to="/register" className="text-blue-500">Regístrate</Link>
                    </div>
                </div>
                </div>
            </form>
        </div>
        <div>
            <img
            src="/img/login.png"
            className="w-220"/>
        </div>
    </div>
  );
}

export default Login;
