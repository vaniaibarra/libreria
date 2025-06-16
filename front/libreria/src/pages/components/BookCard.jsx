import { Link } from "react-router-dom";
import format from "../../utils/format";

function BookCard({ book }) {
  return (
    <div className="border-2 p-4 max-w-sm flex flex-col items-center">
      <div>
        <img src={`http://localhost:3000/uploads/${book.img}`} 
        alt={book.nombre} />
      </div>
      <div>
        <p>{book.nombre}</p>
        <p>{format(Number(book.precio))}</p>
      </div>
      <div className="flex gap-2 justify-center">
        <button
        className="bg-blue-300 p-1 rounded-sm">
          Detalle
        </button>
        <button
        className="bg-blue-300 p-1 rounded-sm">
          Comprar
        </button>
      </div>
    </div>
  );
}

export default BookCard;
