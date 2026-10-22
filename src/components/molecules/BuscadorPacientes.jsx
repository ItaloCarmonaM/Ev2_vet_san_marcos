import CampoTexto from "../atoms/CampoTexto";
import Icono from "../atoms/Icono";

function BuscadorPacientes(props) {
  return (
    <form className="buscador-servicios mb-3" role="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="buscadorPacientes" className="visually-hidden">
        Buscar paciente
      </label>
      <div className="input-group">
        <span className="input-group-text">
          <Icono nombre="buscar" tamano={18} />
        </span>
        <CampoTexto
          id="buscadorPacientes"
          name="buscadorPacientes"
          tipo="search"
          placeholder="Buscar por nombre de mascota o dueño..."
          valor={props.valor}
          onChange={props.onChange}
        />
      </div>
    </form>
  );
}

export default BuscadorPacientes;