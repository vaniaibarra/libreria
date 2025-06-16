import { useState } from "react";
import { useAuth } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function Edit(){

    const [components, setComponents] = useState({
    avatar: {},
    username: "",
    descripcion: "",
    region: "",
    ciudad: ""
})

const { editProfile } = useAuth();
const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value, files } = e.target;
  setComponents((prev) => ({
    ...prev,
    [name]: files ? files[0] : value, 
  }));
};


const handleSubmit = async (e) => {
  e.preventDefault();

    try {
        await editProfile(components);
        alert("Perfil modificado con éxito");
        navigate('/profile');
        window.location.reload();
    } catch (error) {
        alert(error.messagge || "Error al modificar el perfil");
    }
};


    return(
        <>
            <div className=" m-20">
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <input type="file" name="avatar" onChange={handleChange} />
                    <div>
                        <p>Nombre de usuario</p>
                        <input name="username" onChange={handleChange} placeholder="user" className="border-2 rounded-sm" />
                    </div>
                    <div>
                        <p>Región</p>
                        <input name="region" onChange={handleChange} placeholder="RM" className="border-2 rounded-sm" />
                    </div>
                    <div>
                        <p>Ciudad</p>
                        <input name="ciudad" onChange={handleChange} placeholder="Santiago" className="border-2 rounded-sm" />
                    </div>
                    <div>
                        <p>Descripción</p>
                        <input 
                        name="descripcion" 
                        onChange={handleChange} 
                        placeholder="Tu descripción" 
                        className="border-2 rounded-sm w-100 h-50 inline-block align-text-top" />
                    </div>
                    <div className="m-10 flex gap-5">
                        <button type="submit" className="bg-blue-600 text-white rounded-sm p-2 w-1/5">
                            Guardar
                        </button>
                        <Link to="/profile" className="bg-blue-600 text-white text-center rounded-sm p-2 w-1/5">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Edit;