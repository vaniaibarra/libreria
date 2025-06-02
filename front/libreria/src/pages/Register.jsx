import { useState } from "react";
import { useAuth } from "../context/Context";
import { Link } from "react-router-dom";

function Register () {
  const [credentials, setCredentials] = useState({
    nombre: "",
    apellido: "",
    email: "",
    username: "",
    ciudad: "",
    region: "",
    password: "",
    repetePassword: ""
  })
  const { register } = useAuth()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

   
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (credentials.password !== credentials.repetePassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await register(credentials);
      alert("Registro exitoso");
    } catch (error) {
      alert(error.message || "Error al registrarse");
    }
  };

  return(
    <>
      <div className="m-10 flex">
        <div className="w-3/5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <p className="font-bold text-2xl font-mono">Registrarse</p>
            </div>
            <div className="grid grid-cols-2 gap-3 m-5 ">
              <div>
                <p>Nombre</p>
                <input name="nombre" onChange={handleChange} placeholder="Juanito" 
                className="border-2 rounded-sm"/>
              </div>
              <div>
                <p>Apellido</p>
                <input name="apellido" type="email" onChange={handleChange} placeholder="perez" 
                className="border-2 rounded-sm" />
              </div>
              <div>
                <p>Correo</p>
                <input name="email" type="email" onChange={handleChange} placeholder="example@gmail.com" 
                className="border-2 rounded-sm" />
              </div>
              <div>
                <p>Nombre de usuario</p>
                <input name="username" type="text" onChange={handleChange} placeholder="username" 
                className="border-2 rounded-sm" />
              </div>
              <div>
                <p>Ciudad</p>
                <input name="ciudad" type="text" onChange={handleChange} placeholder="Viña del Mar" 
                className="border-2 rounded-sm" />
              </div>
              <div>
                <p>Región</p>
                <input name="region" type="text" onChange={handleChange} placeholder="Valparaíso" 
                className="border-2 rounded-sm" />
              </div>
              <div>
                <p>Contraseña</p>
                <input name="password" type="password" onChange={handleChange} placeholder="*******" 
                className="border-2 rounded-sm" />
              </div>
              <div>
                <p>Repetir contraseña</p>
                <input name="repetePassword" type="password" onChange={handleChange} placeholder="*******" 
                className="border-2 rounded-sm" />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <button type="submit" className="bg-blue-600 text-white rounded-sm p-2 w-1/5">Registrarse</button>
              <div className="flex gap-1">
                <p>¿Ya tienes cuenta?</p>
                <Link to="/login" className="text-blue-500">Inicia Sesión</Link>
              </div>
            </div>
          </form>
        </div>
        <div>
          <img
            src="/img/login.png"
            className="w-180"/>
        </div>
      </div>
    </>
  )

}

export default Register;