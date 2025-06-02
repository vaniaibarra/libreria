function BookDetail({ book }) {
  if (!book) {
    return <p>No se encontró el libro.</p>;
  }

  return (
    <>
      <div className="flex gap-4">
        <div>
          <img src={book.img} alt={book.title} className="w-48 h-auto object-cover" />
        </div>
        <div>
          <p className="text-xl font-bold">{book.title}</p>
          <p className="text-gray-700">{book.author}</p>
          <p className="text-gray-500">{book.year}</p>
        </div>
      </div>
      <div className="mt-4">
        <p>{book.description}</p>
      </div>
    </>
  );
}
export default BookDetail;