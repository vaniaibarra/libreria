import { useAuth } from "../context/Context";
import Books from "./Books";
import FiltroTienda from "./components/FiltroTienda";

function BookStore() {

  const { usuario } = useAuth();
  if(!usuario) {
    return <div className="text-center mt-10 text-red-500 font-bold"> Debes inicial sesión para ver la tienda de libros</div>
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Tienda de Libros</h1>
      
      <Books/>
    </div>
  );
}

export default BookStore;
