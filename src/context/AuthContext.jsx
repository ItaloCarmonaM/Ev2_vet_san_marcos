import { createContext, useEffect, useState } from "react";
import * as authService from "../services/authService";
import { configurarAlVencerSesion } from "../services/api";
import { guardarToken, leerToken, borrarToken } from "../utils/sesion";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(Boolean(leerToken()));
  const [sesionVencida, setSesionVencida] = useState(false);

  useEffect(() => {
    configurarAlVencerSesion(() => {
      setUsuario(null);
      setSesionVencida(true);
    });
    return () => configurarAlVencerSesion(null);
  }, []);

  useEffect(() => {
    if (!leerToken()) return;
    let activo = true;
    authService
      .obtenerPerfil()
      .then((perfil) => { if (activo) setUsuario(perfil); })
      .catch(() => { /* 401: el interceptor ya limpió; sin red: se reintenta al recargar */ })
      .finally(() => { if (activo) setCargando(false); });
    return () => { activo = false; };
  }, []);

  async function iniciarSesion(dto) {
    const { accessToken } = await authService.login(dto);
    guardarToken(accessToken);
    try {
      const perfil = await authService.obtenerPerfil();
      setUsuario(perfil);
      setSesionVencida(false);
      return perfil;
    } catch (error) {
      borrarToken();
      throw error;
    }
  }

  function cerrarSesion() {
    borrarToken();
    setUsuario(null);
    setSesionVencida(false);
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, sesionVencida, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}