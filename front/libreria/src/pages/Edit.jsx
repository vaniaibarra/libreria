import { useState } from "react";
import { useAuth } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function Edit(){

const [components, setComponents] = useState({
    avatar: null,
    username: "",
    descripcion: "",
    region: "",
    ciudad: ""
})

const [preview, setPreview] = useState(null);


const { editProfile } = useAuth();
const { usuario } = useAuth();
const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if(name === "avatar" && files[0]){
    const file = files[0];
    setComponents((prev) => ({...prev, avatar: file}));
    setPreview(URL.createObjectURL(file));
  }else{
    setComponents((prev) => ({
    ...prev,
    [name]: files ? files[0] : value, 
  }));
}
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
                    {preview && (
                    <div>
                        <p>Vista previa:</p>
                        <img src={preview} alt="Avatar" className="w-40 h-40 object-cover border rounded-full" />
                    </div>
                    )}
                    <input type="file" name="avatar" onChange={handleChange} />
                    <div>
                        <p>Nombre de usuario</p>
                        <input name="username" onChange={handleChange} value={usuario.username} className="border-2 rounded-sm placeholder-black" />
                    </div>
                    <div>
                        <p>Región</p>
                        <input name="region" onChange={handleChange} placeholder={usuario.region} className="border-2 rounded-sm placeholder-black" />
                    </div>
                    <div>
                        <p>Ciudad</p>
                        <input name="ciudad" onChange={handleChange} placeholder={usuario.ciudad} className="border-2 rounded-sm placeholder-black" />
                    </div>
                    <div>
                        <p>Descripción</p>
                        <input 
                        name="descripcion" 
                        onChange={handleChange} 
                        placeholder={usuario.descripcion} 
                        className="border-2 rounded-sm w-100 h-50 inline-block align-text-top placeholder-black" />
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