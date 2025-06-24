import { useState } from "react";
import { useAuth } from "../../context/Context";
import { useEffect } from "react";

function FiltroTienda() {
  const [filtrosTienda, setFiltrosTienda] = useState({
    autor: "",
    precioMin: "",
    precioMax: "",
    genero: "",
    idioma: "",
  });

  const { filtros } = useAuth();
  const {  generos, librosFiltrados } = useAuth();

  const handleBuscar = (e) => {
    librosFiltrados(filtrosTienda)
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltrosTienda((prev) => ({ ...prev, [name]: value }));
  };

  const handleLimpiarFiltros = () => {
    setFiltrosTienda({
      autor: "",
      precioMin: "",
      precioMax: "",
      genero: "",
      idioma: "",
    });
    librosFiltrados({}); 
  };



  return (
    <div className="p-5 border rounded shadow-md w-80 space-y-4 flex flex-col gap-3">
      <div>
        <label className="block font-semibold">Autor</label>
        <select name="autor" value={filtrosTienda.autor} onChange={handleChange} className="w-full border p-1 rounded">
          <option value="">Todos</option>
          {filtros.autor.map((autor) => (
            <option key={autor} value={autor}>
              {autor}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div>
          <p>Precio mínimo:</p>
          <input name="precioMin" value={filtrosTienda.precio} onChange={handleChange} className="w-full border p-1 rounded"/>
        </div>
        <div>
          <p>Precio máximo:</p>
          <input name="precioMax" value={filtrosTienda.precio} onChange={handleChange} className="w-full border p-1 rounded"/>
        </div>
      </div>

      <div>
        <label className="block font-semibold">Género</label>
        <select name="genero" value={filtrosTienda.genero} onChange={handleChange} className="w-full border p-1 rounded">
          <option value="">Todas</option>
          {Array.isArray(generos) &&
           generos.map((g) => (
            <option key={g.id} value={g.id}>
              {g.genero}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold">Idioma</label>
        <select name="idioma" value={filtrosTienda.idioma} onChange={handleChange} className="w-full border p-1 rounded">
          <option value="">Todos</option>
          {filtros.idioma.map((idioma) => (
            <option key={idioma} value={idioma}>
              {idioma}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center flex flex-col gap-3">
        <button onClick={handleBuscar} className="bg-green-500 text-white p-1 rounded-sm">
          Aplicar filtro
        </button>
        <button onClick={handleLimpiarFiltros} className="bg-gray-400 text-white px-4 py-1 rounded">
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}

export default FiltroTienda;
