import { useState } from "react";
import { useAuth } from "../context/Context";
import { useNavigate } from "react-router-dom";

function UploadBook() {
  const [bookInfo, setBookInfo] = useState({
    nombre: "",
    autor: "",
    idioma: "",
    genero: "",
    precio: "",
    descripcion: "",
    img: null
  });

  const [preview, setPreview] = useState(null)

  const { newBook } = useAuth();
  const { generos } = useAuth();
  const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value, files } = e.target;
  if(name === "img" && files[0]){
    const file = files[0];
    setBookInfo((prev) => ({...prev, img: file}));
    setPreview(URL.createObjectURL(file));
  }else{
    setBookInfo((prev) => ({
    ...prev,
    [name]: files ? files[0] : value,
  }));
  }
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
    !bookInfo.nombre ||
    !bookInfo.autor ||
    !bookInfo.idioma ||
    !bookInfo.genero ||
    !bookInfo.precio ||
    !bookInfo.descripcion ||
    !bookInfo.img
  ) {
    alert("Por favor, completa todos los campos incluyendo la imagen.");
    return;
  }

    try {
      await newBook(bookInfo);
      alert("Libro publicado con éxito!")
      navigate('/profile');
    } catch (error) {
      alert(error.message || "Error al publicar el libro");
    }
  };

  return (
    <>
    <div className="m-7 ml-75 justify-center">
        <p>Publica tu libro</p>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="flex gap-50">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <p>Nombre del libro</p>
              <input name="nombre" onChange={handleChange} className="border-2 rounded-sm" />
            </div>
            <div>
              <p>Autor/a</p>
              <input name="autor" onChange={handleChange} className="border-2 rounded-sm" />
            </div>
            <div>
              <p>Idioma</p>
              <input name="idioma" onChange={handleChange} className="border-2 rounded-sm" />
            </div>
            <div>
              <p>Género</p>
              <select name="genero" value={bookInfo.genero} onChange={handleChange} className="border-2 rounded-sm">
                <option>Todos</option>
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
              <input name="precio" onChange={handleChange} className="border-2 rounded-sm" />
            </div>
            <div>
              <p>Descripción</p>
              <input name="descripcion" onChange={handleChange} className="border-2 rounded-sm" />
            </div>
            <div className="flex flex-col">
              <button type="submit" className="bg-blue-600 text-white rounded-sm p-2">Subir libro</button>
              <button
                type="button" 
                onClick={() => navigate("/profile")}
                className="bg-gray-400 text-white rounded-sm p-2 mt-2"
              >
                Cancelar
              </button>
          </div>
          </div>
          <div className="flex flex-col">
            <p>Imagen</p>
            {preview && (
              <div>
                <p>Vista previa:</p>
                <img src={preview} alt="img" className="w-sm"/>
              </div>
            )}
            <input type="file" name="img" onChange={handleChange} />

          </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UploadBook;
