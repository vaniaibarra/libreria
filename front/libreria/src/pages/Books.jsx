import BookCard from "./components/BookCard";

function Books({ books }) {
  return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
  );
}

export default Books;
