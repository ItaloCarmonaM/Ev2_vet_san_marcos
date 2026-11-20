import axios from "axios";
import { leerToken, borrarToken } from "../utils/sesion";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = leerToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let alVencerSesion = null;
export function configurarAlVencerSesion(funcion) {
  alVencerSesion = funcion;
}

api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const esLogin = String(error.config?.url || "").includes("/auth/login");
    if (error.response?.status === 401 && !esLogin && leerToken()) {
      borrarToken();
      if (alVencerSesion) alVencerSesion();
    }
    return Promise.reject(error);
  }
);