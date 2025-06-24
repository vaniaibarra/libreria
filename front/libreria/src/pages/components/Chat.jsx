import { useEffect, useState } from "react";
import { useAuth } from "../../context/Context";

function Chat({ receptor }) {
  const {
    usuario, // el usuario logueado
    conversacionAct,
    iniciarConversacion,
    cargarMnsje,
    enviarMnsje,
    mensajes,
  } = useAuth();

  const [nuevoMensaje, setNuevoMensaje] = useState("");

  // Iniciar o cargar conversación
  useEffect(() => {
    if (usuario && receptor) {
      iniciarConversacion(usuario.id, receptor.id);
    }
  }, [usuario, receptor]);

  // Cargar mensajes cuando se tenga una conversación activa
  useEffect(() => {
    if (conversacionAct?.id) {
      cargarMnsje(conversacionAct.id);
    }
  }, [conversacionAct]);

  const handleEnviarMensaje = async (e) => {
    e.preventDefault();
    if (nuevoMensaje.trim() !== "") {
      await enviarMnsje(conversacionAct.id, usuario.id, nuevoMensaje);
      setNuevoMensaje("");
    }
  };

    console.log("Mensajes en Chat:", mensajes);

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Chat con {receptor?.username}</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-4 bg-gray-50 rounded">
        {mensajes
        .filter(msg => msg && msg.remitente_id !== undefined)
        .map(msg => (
            <div
            key={msg.id}
            className={`mb-2 p-2 rounded ${
                msg.remitente_id === usuario.id ? "bg-blue-200 text-right ml-auto" : "bg-gray-300 text-left mr-auto"
            } max-w-[80%]`}
            >
            {msg.contenido}
            </div>
        ))}


      </div>
      <form onSubmit={handleEnviarMensaje} className="flex gap-2">
        <input
          type="text"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 border rounded px-2 py-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Chat;
