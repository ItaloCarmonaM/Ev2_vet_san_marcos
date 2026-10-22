import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const iconoClinica = L.divIcon({
  className: "marcador-clinica",
  html: `
    <svg width="30" height="45" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#1e7a68"/>
      <circle cx="12" cy="12" r="5" fill="#ffffff"/>
    </svg>`,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40],
});

// Props opcionales: latitud, longitud
function MapaUbicacion(props) {
  const latitud = props.latitud ?? -34.1701;
  const longitud = props.longitud ?? -70.7444;
  const contenedor = useRef(null);

  useEffect(() => {
    const mapa = L.map(contenedor.current).setView([latitud, longitud], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapa);

    L.marker([latitud, longitud], { icon: iconoClinica })
      .addTo(mapa)
      .bindPopup("<b>Veterinaria San Marcos</b><br>Rancagua, Chile")
      .openPopup();

    // Al salir de la página (o en la segunda pasada de StrictMode) se destruye el mapa
    return () => mapa.remove();
  }, [latitud, longitud]);

  return (
    <div
      ref={contenedor}
      className="mapa-ubicacion"
      role="region"
      aria-label="Mapa con la ubicación de la Veterinaria San Marcos en Rancagua"
    />
  );
}

export default MapaUbicacion;