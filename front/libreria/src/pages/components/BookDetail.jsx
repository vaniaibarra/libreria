import { useParams } from "react-router-dom";
import { useAuth } from "../../context/Context";
import { useEffect } from "react";
import format from "../../utils/format";

function BookDetail({book}) {
  const {generos} = useAuth();


  const generoNombre = generos.length
  ? generos.find(g => g.id === book.genero)?.genero || "Sin género"
  : "Cargando...";


  return (
      <div className="flex gap-4 w-2xl">
        <div className="flex gap-5">
          <div>
            <img src={`http://localhost:3000/uploads/${book.img}`} alt={book.nombre} className="w-48 h-auto object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">{book.nombre}</p>
            <p className="text-gray-700">{book.autor}</p>
            <p>{format(Number(book.precio))}</p>
            <p>{generoNombre}</p>
            <p>{book.descripcion}</p>
          </div>
        </div>
      </div>
  );
}
export default BookDetail;