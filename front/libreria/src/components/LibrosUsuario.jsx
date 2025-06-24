import { useEffect, useState } from "react";
import { useAuth } from "../context/Context";
import BookCard from "../pages/components/BookCard";
import BookDetail from "../pages/components/BookDetail";

function LibrosUsuario(){

    const { book, userBooks, usuario, booksDelUsuario } = useAuth();
    const [bookSeleccionado, setBookSeleccionado] = useState(null);

    useEffect(() => {
        if(usuario){
            userBooks();
        }
    }, [usuario]);
    
    const verDetalle = (book) => {
    setBookSeleccionado(book)
  };

  const cerrarDetalle = () => {
    setBookSeleccionado(null);
  }


    return(
        <>
            <div className="grid grid-cols-4 gap-x-80">
            {booksDelUsuario?.map((book) => (
                <BookCard key={book.id} book={book} onVerDetalle={verDetalle}/>
            ))}
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
        </>
    )
}

export default LibrosUsuario;