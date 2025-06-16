import { Link } from "react-router-dom";
import { useAuth } from "../context/Context";
import LibrosUsuario from "../components/LibrosUsuario";

function Profile() {

    const { usuario } = useAuth();

  return (
    <div className="w-5xl mx-auto pt-6 ml-50">
      <div className="flex items-center gap-6 mb-6">
        <img
          src={`http://localhost:3000/uploads/${usuario.avatar}`}
          alt="Avatar"
          style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%" }}
        />


        <div>
          <div className="flex gap-4 mb-5">
            <p className="text-2xl font-semibold">{usuario.username}</p>
            <Link className="bg-blue-300 p-1 rounded-sm" to="/edit">Editar perfil</Link>
            <Link className="bg-blue-300 p-1 rounded-sm" to="/upload">Publicar libro</Link>
          </div>

          <div>
            <p>{usuario.ciudad}, {usuario.region}</p>
            <p className="text-gray-600 mt-2 max-w-md">{usuario.descripcion}</p>
          </div>
        </div>
      </div>
      <div>
        <LibrosUsuario/>
      </div>

    </div>
  );
}

export default Profile;
