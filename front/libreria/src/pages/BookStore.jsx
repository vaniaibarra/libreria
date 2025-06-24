import { useState } from "react";
import { useAuth } from "../context/Context";
import Books from "./Books";
import FiltroTienda from "./components/FiltroTienda";
import BookDetail from "./components/BookDetail";

function BookStore() {

  const { usuario, libroPorId, book } = useAuth();

  const [bookSeleccionado, setBookSeleccionado] = useState(null);




  const verDetalle = (book) => {
    setBookSeleccionado(book)
  };

  const cerrarDetalle = () => {
    setBookSeleccionado(null);
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Tienda de Libros</h1>
      <div className="flex">
        <FiltroTienda/>
        <Books onVerDetalle={verDetalle} />
      </div>

      {bookSeleccionado && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg relative">
            <button
              onClick={cerrarDetalle}
              className="absolute top-2 right-2 text-xl font-bold"
            >
              ×
            </button>
            <BookDetail book={bookSeleccionado} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BookStore;
