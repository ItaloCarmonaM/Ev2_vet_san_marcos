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

  const campo = (name, etiqueta, placeholder, tipo = "text") => (
    <div className="campo-grupo mb-3">
      <label htmlFor={name} className="etiqueta-campo">
        {etiqueta}
      </label>
      {tipo === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          placeholder={placeholder}
          className="form-control campo-input"
          value={valores[name]}
          onChange={handleChange}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={tipo}
          placeholder={placeholder}
          className={`form-control campo-input ${errores[name] ? "is-invalid" : ""}`}
          value={valores[name]}
          onChange={handleChange}
        />
      )}
      {errores[name] && <div role="alert">{errores[name]}</div>}
    </div>
  );

  return (
    <div className="card tarjeta-login mb-4">
      <div className="card-body p-4">
        <h2 className="titulo-login fw-bold text-center mb-4">
          {servicio ? "Editar Servicio" : "Nuevo Servicio"}
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {campo("nombre", "Nombre del servicio", "Ej: Vacunación")}
          {campo("categoria", "Categoría", "Ej: Prevención")}
          {campo("precio", "Precio (CLP)", "12000", "number")}
          {campo("descripcion", "Descripción", "Describe brevemente el servicio", "textarea")}
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1">
              {servicio ? "Guardar cambios" : "Agregar servicio"}
            </button>
            {servicio && (
              <button type="button" className="btn btn-outline-primary" onClick={onCancelar}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}