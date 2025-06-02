import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="border-2 p-4">
      <div>
        <img src={book.img} alt={book.name} />
      </div>
      <div>
        <p>{book.name}</p>
        <p>{book.price}</p>
      </div>
      <div>
        <Link to={`/books/${book.id}`}>
          <button>Detalle libro</button>
        </Link>
        <button>Comprar</button>
      </div>
    </div>
  );
}

export default BookCard;
