import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function UploadBook() {
  const [formData, setFormData] = useState({
    nombre: "",
    autor: "",
    idioma: "",
    precio: "",
    descripcion: "",
    archivo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, archivo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("autor", formData.autor);
    data.append("idioma", formData.idioma);
    data.append("precio", formData.precio);
    data.append("descripcion", formData.descripcion);
    data.append("archivo", formData.archivo);

     try {
      const response = await axiosInstance.post("/stats", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Libro subido correctamente");
      console.log(response.data); 
    } catch (error) {
      console.error(error);
      alert("Error al subir el libro");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <p>Nombre del libro</p>
      <input name="nombre" onChange={handleChange} />

      <p>Autor/a</p>
      <input name="autor" onChange={handleChange} />

      <p>Idioma</p>
      <input name="idioma" onChange={handleChange} />

      <p>Precio</p>
      <input name="precio" onChange={handleChange} />

      <p>Descripción</p>
      <input name="descripcion" onChange={handleChange} />

      <p>Archivo</p>
      <input type="file" onChange={handleFileChange} />

      <button type="submit">Subir libro</button>
    </form>
  );
}

export default UploadBook;
