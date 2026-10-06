import React, { useState } from 'react';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import BuscadorServicios from '../components/molecules/BuscadorServicios';
import ListaServicios from '../components/organisms/ListaServicios';
import serviciosData from '../data/servicios';

function Servicios() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const serviciosFiltrados = serviciosData.filter((servicio) => {
    const coincideTexto = servicio.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase()) || 
      servicio.descripcion
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria = categoriaSeleccionada === '' || 
      servicio.categoria === categoriaSeleccionada;

    return coincideTexto && coincideCategoria;
  });

  const manejarSeleccionarServicio = (servicio) => {
    alert(`Has seleccionado el servicio: ${servicio.nombre}`);
  };

  return (
    <PlantillaPublica>
      <div className="container py-4">
        <header className="mb-4 text-center">
          <h1 className="fw-bold text-primary">Nuestros Servicios Médicos</h1>
          <p className="text-muted fs-5">
            Conoce nuestras prestaciones para el cuidado y salud integral de tu mascota.
          </p>
        </header>

        <section className="mb-4">
          <BuscadorServicios
            busqueda={busqueda}
            onBusquedaChange={(e) => setBusqueda(e.target.value)}
            categoria={categoriaSeleccionada}
            onCategoriaChange={(e) => setCategoriaSeleccionada(e.target.value)}
          />
        </section>

        <section>
          <ListaServicios
            servicios={serviciosFiltrados}
            onSeleccionarServicio={manejarSeleccionarServicio}
          />
        </section>
      </div>
    </PlantillaPublica>
  );
}

export default Servicios;