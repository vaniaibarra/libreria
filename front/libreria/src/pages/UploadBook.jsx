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
    img: null,
  });

  const { newBook } = useAuth();
  const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value, files } = e.target;
  setBookInfo((prev) => ({
    ...prev,
    [name]: files ? files[0] : value,
  }));
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
    <div className="m-7">
        <p>Publica tu libro</p>
        <form onSubmit={handleSubmit} className="mt-5 flex">
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
              <input name="genero" onChange={handleChange} className="border-2 rounded-sm" />
            </div>
            <div>
              <p>Precio</p>
              <input name="precio" onChange={handleChange} className="border-2 rounded-sm" />
            </div>
            <div>
              <p>Descripción</p>
              <input name="descripcion" onChange={handleChange} className="border-2 rounded-sm" />
            </div>
          </div>
          <div className="flex flex-col">
            <p>Imagen</p>
            <input type="file" name="img" onChange={handleChange} />
            <button type="submit" className="bg-blue-600 text-white rounded-sm p-2 w-1/5">Subir libro</button>
            <button
              type="button" 
              onClick={() => navigate("/profile")}
              className="bg-gray-400 text-white rounded-sm p-2 w-1/5 mt-2"
            >
              Cancelar
            </button>

          </div>
        </form>
      </div>
    </>
  );
}

export default UploadBook;
