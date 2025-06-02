import { useState } from "react";

function FiltroTienda() {
  const [filtros, setFiltros] = useState({
    autor: "",
    año: "",
    precio: "",
    categoria: "",
    idioma: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 border rounded shadow-md w-80 space-y-4">
      <div>
        <label className="block font-semibold">Autor</label>
        <select name="autor" value={filtros.autor} onChange={handleChange} className="w-full border p-1 rounded">
          <option value="">Todos</option>
          <option value="autor1">Autor 1</option>
          <option value="autor2">Autor 2</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">Año</label>
        <input
          name="año"
          value={filtros.año}
          onChange={handleChange}
          placeholder="Ej. 1990"
          className="w-full border p-1 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Precio</label>
        <select name="precio" value={filtros.precio} onChange={handleChange} className="w-full border p-1 rounded">
          <option value="">Todos</option>
          <option value="menor50">Menor a $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="mayor100">Mayor a $100</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">Categoría</label>
        <select name="categoria" value={filtros.categoria} onChange={handleChange} className="w-full border p-1 rounded">
          <option value="">Todas</option>
          <option value="ficcion">Ficción</option>
          <option value="no-ficcion">No ficción</option>
          <option value="poesia">Poesía</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">Idioma</label>
        <select name="idioma" value={filtros.idioma} onChange={handleChange} className="w-full border p-1 rounded">
          <option value="">Todos</option>
          <option value="es">Español</option>
          <option value="en">Inglés</option>
          <option value="fr">Francés</option>
        </select>
      </div>
    </div>
  );
}

export default FiltroTienda;
