import { useEffect } from "react";
import { useAuth } from "../context/Context";
import BookCard from "./components/BookCard";
import Chat from "./components/Chat";
import { useState } from "react";

function Books({onVerDetalle}) {
  
    const { book, allBooks, usuario, iniciarConversacion, cargarMnsje, conversacionAct, mensajes } = useAuth();
    
    const [mostrarChat, setMostrarChat] = useState(false);
    const [usuarioReceptor, setUsuarioReceptor] = useState(null);

    useEffect(() => {
        allBooks();
    }, []);

    


  const handleConsultar = async (bookSeleccionado) => {
  
    if (usuario.id === bookSeleccionado.usuario_id) return;

  try {
    setUsuarioReceptor({
      id: bookSeleccionado.usuario_id,
      username: bookSeleccionado.username || "Usuario",
    });

    const conversacion = await iniciarConversacion(usuario.id, bookSeleccionado.usuario_id);
    
    console.log("Conversación iniciada:", conversacion);


    if (!conversacion || !conversacion.id) {
      console.error("Conversación no creada correctamente.");
      return;
    }

    await cargarMnsje(conversacion.id);
    setMostrarChat(true);
  } catch (error) {
    console.error("Error al iniciar conversación:", error);
  }
};


  const cerrarChat = () => {
    setMostrarChat(false);
  };

  return (
    <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
            {book && book.length > 0 ? (
            book.map((item) => (
              <BookCard key={item.id} book={item} onVerDetalle={onVerDetalle} onConsultar={handleConsultar}/>
            ))
          ) : (
            <p>No hay libros disponibles.</p>
          )}

        </div>
        {mostrarChat && conversacionAct && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg relative w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={cerrarChat}
            >
              ×
            </button>
            <Chat
              conversacionId={conversacionAct.id}
              receptor={usuarioReceptor}
              mensajes={mensajes}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;
