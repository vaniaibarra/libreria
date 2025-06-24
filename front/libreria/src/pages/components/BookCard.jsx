import { Link, Navigate, useNavigate } from "react-router-dom";
import format from "../../utils/format";
import { useAuth } from "../../context/Context";
import { useEffect } from "react";

function BookCard({ book, onVerDetalle, onConsultar }) {
  
  const { usuario, userBooks } = useAuth();
  const navigate = useNavigate();
  const handleEditar = (book) => {
    navigate(`/editarPublicacion/${book.id}`);
  }




  return (
    <div className="border p-4 max-w-sm flex flex-col items-center rounded shadow-md w-80 space-y-4">
      <div>
        <img 
        src={`http://localhost:3000/uploads/${book.img}`} 
        alt={book.nombre}
        className="object-cover"
        />
      </div>
      <div>
        <div>
          <p>{book.nombre}</p>
          <p>{format(Number(book.precio))}</p>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            className="bg-blue-300 p-1 rounded-sm"
            onClick={() => onVerDetalle(book)}
          >
            Detalle
          </button>
          <button 
          className="bg-blue-300 p-1 rounded-sm"
          onClick={() => onConsultar(book)}>Consultar</button>
          {String(usuario?.id) === String(book.usuario_id) && (
              <button className="bg-blue-300 p-1 rounded-sm" onClick={() => handleEditar(book)}>Editar</button>
            )}

        </div>
      </div>
    </div>
  );
}

export default BookCard;
