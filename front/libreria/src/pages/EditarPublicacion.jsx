import { useState, useEffect } from "react";
import { useAuth } from "../context/Context";
import { useNavigate, Link, useParams } from "react-router-dom";

function EditarPublicacion(){

    const [ components, setComponents ] = useState({
        img: null,
        nombre: "",
        autor: "",
        idioma: "",
        genero: "",
        precio: "",
        descripcion: ""
    });

    const [preview, setPreview] = useState(null);

    const { modificarPublicacion, generos, libroPorId } = useAuth();
    const { book } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value, files} = e.target;

        if(name === "img" && files[0]){
            const file = files[0];
            setComponents((prev) => ({...prev, img: file}));
            setPreview(URL.createObjectURL(file));
        }else{
            setComponents((prev) => ({
                ...prev, [name]: files ? files[0] : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await modificarPublicacion({...components, id});
            alert("Publicación modificada con éxito!");
            navigate('/profile');
        } catch (error) {
            alert(error.message || "Error al modificar publicación");
        }
    }

   useEffect(() => {
  if (book && book.id) {
    setComponents({
      img: null,
      nombre: book.nombre || "",
      autor: book.autor || "",
      idioma: book.idioma || "",
      genero: book.genero || "",
      precio: book.precio || "",
      descripcion: book.descripcion || ""
    });
  }
}, [book]);



useEffect(() => {
  if (id) {
    libroPorId(id);
  }
}, [id]);





    return(
        <>
            <div className=" m-20">
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    {preview && (
                    <div>
                        <p>Vista previa:</p>
                        <img src={preview} alt="img" className="w-40 h-40 object-cover border rounded-full" />
                    </div>
                    )}
                    <input type="file" name="img" onChange={handleChange} />
                    <div>
                        <p>Título</p>
                        <input name="nombre" onChange={handleChange}  value={components.nombre} className="border-2 rounded-sm placeholder-black" />
                    </div>
                    <div>
                        <p>Autor</p>
                        <input name="autor" onChange={handleChange} value={components.autor} className="border-2 rounded-sm placeholder-black" />
                    </div>
                    <div>
                        <p>Idioma</p>
                        <input name="idioma" onChange={handleChange} value={components.idioma} className="border-2 rounded-sm placeholder-black" />
                    </div>
                    <div>
                        <p>Género</p>
                        <select name="genero" value={components.genero} onChange={handleChange} className="border-2 rounded-sm">
                        <option value="">Todos</option>
                        {
                        generos.map((g) => (
                            <option key={g.id} value={g.id}>
                            {g.genero}
                            </option>
                        ))
                        }
                        </select>
                    </div>
                    <div>
                        <p>Precio</p>
                        <input name="precio" onChange={handleChange} value={components.precio} className="border-2 rounded-sm placeholder-black" />
                    </div>
                    <div>
                        <p>Descripción</p>
                        <input 
                        name="descripcion" 
                        onChange={handleChange} 
                        value={components.descripcion} 
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

export default EditarPublicacion;