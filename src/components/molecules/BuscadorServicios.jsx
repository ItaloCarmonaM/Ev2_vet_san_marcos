import CampoTexto from "../atoms/CampoTexto";
import Boton from "../atoms/Boton";
import Icono from "../atoms/Icono";

function BuscadorServicios(props) {
  function handleSubmit(e) {
    e.preventDefault();
    if (props.onBuscar) {
      props.onBuscar(props.valor);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="buscador-servicios" role="search">
      <label htmlFor="buscadorServicios" className="visually-hidden">
        Buscar servicio
      </label>

      <div className="input-group">
        <span className="input-group-text">
          <Icono nombre="buscar" tamano={18} />
        </span>
        <CampoTexto
          id="buscadorServicios"
          name="buscadorServicios"
          tipo="search"
          placeholder="Buscar servicio por nombre..."
          valor={props.valor}
          onChange={props.onChange}
        />
        <Boton tipo="submit" texto="Buscar" variante="primary" />
      </div>
    </form>
  );
}

export default BuscadorServicios;