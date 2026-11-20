import { useEffect, useState } from "react";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import FormularioUsuario from "../components/organisms/FormularioUsuario";
import TablaUsuarios from "../components/organisms/TablaUsuarios";
import Cargando from "../components/atoms/Cargando";
import Alerta from "../components/atoms/Alerta";
import { useAuth } from "../hooks/useAuth";
import {
  listarUsuarios,
  crearUsuario,
  cambiarRolUsuario,
  cambiarEstadoUsuario,
} from "../services/usuarioService";
import { crearUsuarioRequestDto } from "../dto/UsuarioDto";
import { obtenerMensajeError } from "../services/errores";

export default function AdminUsuarios() {
  const { usuario: yo } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorLista, setErrorLista] = useState("");
  const [exito, setExito] = useState("");
  const [errorAccion, setErrorAccion] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    let activo = true;
    async function cargar() {
      try {
        const datos = await listarUsuarios();
        if (activo) setUsuarios(datos);
      } catch (e) {
        if (activo) setErrorLista(obtenerMensajeError(e));
      } finally {
        if (activo) setCargando(false);
      }
    }
    cargar();
    return () => { activo = false; };
  }, []);

  function reemplazar(actualizado) {
    setUsuarios((anteriores) => anteriores.map((u) => (u.id === actualizado.id ? actualizado : u)));
  }

  // Ejecuta una acción de la API y muestra el éxito o el error. Devuelve el resultado o null.
  async function ejecutar(accion, mensajeExito) {
    setExito("");
    setErrorAccion("");
    try {
      const resultado = await accion();
      setExito(mensajeExito);
      return resultado;
    } catch (e) {
      setErrorAccion(obtenerMensajeError(e));
      return null;
    }
  }

  async function crear(formulario) {
    setGuardando(true);
    const creado = await ejecutar(
      () => crearUsuario(crearUsuarioRequestDto(formulario)),
      "Usuario creado correctamente."
    );
    setGuardando(false);
    if (creado) setUsuarios((anteriores) => [...anteriores, creado]);
    return Boolean(creado);
  }

  async function cambiarRol(id, rol) {
    if (!rol) return;
    const actualizado = await ejecutar(() => cambiarRolUsuario(id, rol), "Rol actualizado.");
    if (actualizado) reemplazar(actualizado);
  }

  async function alternarEstado(u) {
    const actualizado = await ejecutar(
      () => cambiarEstadoUsuario(u.id, !u.activo),
      u.activo ? "Usuario desactivado." : "Usuario reactivado."
    );
    if (actualizado) reemplazar(actualizado);
  }

  return (
    <PlantillaAdmin titulo="Administrar usuarios">
      {exito && <Alerta variante="success" texto={exito} />}
      {errorAccion && <Alerta texto={errorAccion} />}

      <section className="mb-5">
        <h2 className="h4 fw-bold mb-3">Nuevo usuario</h2>
        <FormularioUsuario onGuardar={crear} guardando={guardando} />
      </section>

      <section>
        <h2 className="h4 fw-bold mb-3">Usuarios registrados</h2>
        {cargando ? (
          <Cargando texto="Cargando usuarios..." />
        ) : errorLista ? (
          <Alerta texto={errorLista} />
        ) : (
          <TablaUsuarios
            usuarios={usuarios}
            idActual={yo?.id}
            onCambiarRol={cambiarRol}
            onAlternarEstado={alternarEstado}
          />
        )}
      </section>
    </PlantillaAdmin>
  );
}