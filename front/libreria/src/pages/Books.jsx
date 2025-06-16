import { useEffect } from "react";
import { useAuth } from "../context/Context";
import BookCard from "./components/BookCard";

function Books() {
  
    const { book, allBooks } = useAuth();

    useEffect(() => {
        allBooks();
    }, []);

  return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {book && book.length > 0 ? (
            book.map((item) => (
              <BookCard key={item.id} book={item} />
            ))
          ) : (
            <p>No hay libros disponibles.</p>
          )}

        </div>
  );
}

export default Books;
