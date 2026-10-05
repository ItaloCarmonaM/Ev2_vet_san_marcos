import { useState } from "react";
import { Link } from "react-router-dom";
import FormularioSolicitudCita from "../components/organisms/FormularioSolicitudCita";
import EtiquetaEstadoCita from "../components/atoms/EtiquetaEstadoCita";
import EtiquetaEspecie from "../components/atoms/EtiquetaEspecie";
import Icono from "../components/atoms/Icono";

// TEMPORAL: reemplazar por los servicios reales cuando estén listos (ListaServicios)
const SERVICIOS = [
  { valor: "consulta", texto: "Consulta general" },
  { valor: "vacunacion", texto: "Vacunación" },
  { valor: "desparasitacion", texto: "Desparasitación" },
  { valor: "control", texto: "Control preventivo" },
];

function SolicitarCita() {
  // TEMPORAL: sin backend, las citas se guardan solo en memoria
  const [citas, setCitas] = useState([]);
  const [ultima, setUltima] = useState(null);

  function guardarCita(datos) {
    setCitas([...citas, datos]);
    setUltima(datos);
  }

  function nombreServicio(valor) {
    const encontrado = SERVICIOS.find((s) => s.valor === valor);
    return encontrado ? encontrado.texto : valor;
  }

  return (
    <div className="container py-4" style={{ maxWidth: 720 }}>
      <Link to="/" className="small">
        ← Volver al inicio de sesión
      </Link>

      <h2 className="my-3">
        <Icono nombre="calendario" tamano={26} className="me-2" />
        Solicitar cita
      </h2>

      {ultima && (
        <div className="alert alert-success">
          Cita registrada para <strong>{ultima.mascota}</strong>{" "}
          <EtiquetaEspecie especie={ultima.especie} /> el {ultima.fecha} a las{" "}
          {ultima.hora} <EtiquetaEstadoCita estado="pendiente" />
        </div>
      )}

      <FormularioSolicitudCita
        servicios={SERVICIOS}
        ocupadas={citas}
        onEnviar={guardarCita}
      />

      {citas.length > 0 && (
        <div className="mt-5">
          <h5>Citas solicitadas en esta sesión</h5>
          <ul className="list-group">
            {citas.map((c, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>{c.mascota}</strong> <EtiquetaEspecie especie={c.especie} />
                  <br />
                  <small>
                    {nombreServicio(c.servicio)} · {c.fecha} · {c.hora}
                  </small>
                </span>
                <EtiquetaEstadoCita estado="pendiente" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SolicitarCita;