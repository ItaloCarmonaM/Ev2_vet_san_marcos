import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import { CATEGORIAS } from "../../data/servicios";
import { campoObligatorio, validarPrecio } from "../../utils/validaciones";

const OPCIONES_CATEGORIA = CATEGORIAS.map((c) => ({ valor: c, texto: c }));

const VACIO = {
  nombre: "",
  categoria: "",
  especie: "",
  duracion: "",
  precio: "",
  observaciones: "",
};

function valoresDe(servicio) {
  if (!servicio) return VACIO;
  return {
    nombre: servicio.nombre,
    categoria: servicio.categoria,
    especie: servicio.especie,
    duracion: servicio.duracion,
    precio: String(servicio.precio),
    observaciones: servicio.observaciones || "",
  };
}

function FormularioServicio(props) {
  const editando = Boolean(props.servicio);
  const [valores, setValores] = useState(valoresDe(props.servicio));
  const [errores, setErrores] = useState({});

  function manejarCambio(e) {
    const { name, value } = e.target;
    setValores((anterior) => ({ ...anterior, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nuevos = {
      nombre: campoObligatorio(valores.nombre, "El nombre"),
      categoria: campoObligatorio(valores.categoria, "La categoría"),
      especie: campoObligatorio(valores.especie, "La especie"),
      duracion: campoObligatorio(valores.duracion, "La duración"),
      precio: validarPrecio(valores.precio),
    };
    setErrores(nuevos);

    const hayErrores = Object.values(nuevos).some((mensaje) => mensaje !== "");
    if (hayErrores || !props.onGuardar) return;

    props.onGuardar({
      ...props.servicio,
      nombre: valores.nombre.trim(),
      categoria: valores.categoria,
      especie: valores.especie.trim(),
      duracion: valores.duracion.trim(),
      precio: Number(valores.precio),
      observaciones: valores.observaciones.trim(),
    });

    if (!editando) setValores(VACIO);
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 tarjeta-login mb-4" noValidate>
      <h2 className="titulo-login mb-3 text-center fw-bold">
        {editando ? "Editar servicio" : "Nuevo servicio"}
      </h2>

      <CampoFormulario id="nombre" name="nombre" etiqueta="Nombre del servicio"
        placeholder="Ej: Consulta general" valor={valores.nombre}
        onChange={manejarCambio} error={errores.nombre} />
      <CampoFormulario id="categoria" name="categoria" etiqueta="Categoría" tipo="select"
        opciones={OPCIONES_CATEGORIA} placeholder="Selecciona una categoría"
        valor={valores.categoria} onChange={manejarCambio} error={errores.categoria} />
      <CampoFormulario id="especie" name="especie" etiqueta="Especie"
        placeholder="Ej: Perro / Gato" valor={valores.especie}
        onChange={manejarCambio} error={errores.especie} />
      <CampoFormulario id="duracion" name="duracion" etiqueta="Duración"
        placeholder="Ej: 30 min" valor={valores.duracion}
        onChange={manejarCambio} error={errores.duracion} />
      <CampoFormulario id="precio" name="precio" etiqueta="Precio (CLP)" tipo="number"
        placeholder="12000" valor={valores.precio}
        onChange={manejarCambio} error={errores.precio} />
      <CampoFormulario id="observaciones" name="observaciones" etiqueta="Observaciones"
        placeholder="Opcional" valor={valores.observaciones}
        onChange={manejarCambio} />

      <div className="d-flex gap-2 mt-2">
        <Boton
          tipo="submit"
          texto={editando ? "Guardar cambios" : "Agregar servicio"}
          variante="primary"
          className="flex-grow-1"
        />
        {editando && props.onCancelar && (
          <Boton texto="Cancelar" variante="outline-primary" onClick={props.onCancelar} />
        )}
      </div>
    </form>
  );
}

export default FormularioServicio;