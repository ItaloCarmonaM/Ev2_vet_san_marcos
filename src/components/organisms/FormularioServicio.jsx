import { useState } from "react";

const VACIO = { nombre: "", categoria: "", precio: "", descripcion: "" };

export default function FormularioServicio({ servicio, onGuardar, onCancelar }) {
  const [valores, setValores] = useState(servicio ?? VACIO);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = {};
    if (!valores.nombre.trim()) nuevos.nombre = "Ingresa el nombre del servicio.";
    if (!(Number(valores.precio) > 0)) nuevos.precio = "Ingresa un precio mayor a 0.";
    setErrores(nuevos);

    if (Object.keys(nuevos).length === 0) {
      onGuardar({ ...valores, precio: Number(valores.precio) });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="campo">
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" value={valores.nombre} onChange={handleChange} />
        {errores.nombre && <span role="alert" className="error">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label htmlFor="categoria">Categoría</label>
        <input id="categoria" name="categoria" value={valores.categoria} onChange={handleChange} />
      </div>

      <div className="campo">
        <label htmlFor="precio">Precio</label>
        <input id="precio" name="precio" type="number" value={valores.precio} onChange={handleChange} />
        {errores.precio && <span role="alert" className="error">{errores.precio}</span>}
      </div>

      <div className="campo">
        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" name="descripcion" value={valores.descripcion} onChange={handleChange} />
      </div>

      <button type="submit">{servicio ? "Guardar cambios" : "Agregar servicio"}</button>
      {servicio && (
        <button type="button" onClick={onCancelar}>Cancelar</button>
      )}
    </form>
  );
}