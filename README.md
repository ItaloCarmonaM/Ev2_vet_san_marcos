# Grupo 2

## Integrantes
- Ítalo Carmona (it.carmona@duocuc.cl)
- Camilo Peña (ca.penag@duocuc.cl)
- Matías Yañez (mat.yanezt@duocuc.cl)

## Caso Veterinaria San Marcos
Este consta de una veterinaria de mascotas domésticas que acepta perros, gatos, conejos y aves.
Permite inicio de sesión y gestión de citas personales por parte de los clientes.
Cuenta con una vista para veterinario y recepcionista, los cuales pueden comprobar las citas pendientes,
historial de pacientes y agendar nuevas citas.

## Tecnologías
- React 19 + Vite
- React Bootstrap / Bootstrap 5
- React Router DOM 7 (navegación entre páginas)
- Leaflet + OpenStreetMap (mapa de ubicación)
- Vitest + Testing Library + jsdom (pruebas) y cobertura con `@vitest/coverage-v8`
- oxlint (análisis estático)

## Funcionalidades implementadas

### Sitio público (cliente)
- **Inicio** (`/`): presentación de la veterinaria, cifras, servicios destacados y mapa con la ubicación de la clínica (Leaflet, Rancagua).
- **Servicios** (`/servicios`): catálogo con búsqueda por texto (sin distinguir mayúsculas ni tildes, también en observaciones) y filtro por categoría.
- **Categorías** (`/categorias`) y **Detalle de servicio** (`/servicio/:codigo`).
- **Solicitar cita** (`/solicitar-cita` y `/solicitar-cita/:codigo`): formulario con validaciones (domingos no se atiende, no se permiten fechas pasadas y las horas ocupadas se bloquean). El servicio llega preseleccionado si se entra desde una tarjeta.
- **Cita confirmada** (`/cita-confirmada`): resumen con fecha, hora, precio y estado. Considera el recargo de la consulta de urgencia fuera de horario.
- **Mis citas** (`/mis-citas`): listado de citas del cliente.
- **Mis vacunas** (`/mis-vacunas`): historial de vacunación de las mascotas con alertas según estado (*Al día*, *Próxima a vencer* dentro de 30 días y *Vencida*).
- **Login** (`/login`) y **Registro** (`/registro`) con validación de correo, teléfono chileno y contraseñas.

### Vista del veterinario
- **Panel del veterinario** (`/veterinario`): agenda de citas pendientes y confirmadas desde hoy, y buscador de pacientes por nombre o dueño.
- **Ficha del paciente** (`/veterinario/paciente/:id`): datos del paciente, historial de atenciones, tabla de vacunas con alertas y formulario para registrar una nueva atención (motivo, diagnóstico, medicamentos), con opción de agendar un control de seguimiento.

### Vista de administración
- **Administrar servicios** (`/admin/servicios`): CRUD de servicios con validaciones y confirmación antes de eliminar.
- **Administrar citas** (`/admin/citas`): cambio de estado de cada cita (Pendiente → Confirmada → Completada, o Cancelada).

### Arquitectura y datos
- Componentes organizados con **Atomic Design** (átomos, moléculas, organismos, plantillas y páginas).
- Estado global con **Context API**: `ServiciosContext`, `CitasContext` y `PacientesContext`, con sus hooks `useServicios`, `useCitas` y `usePacientes`.
- Los datos son simulados y viven en memoria (`src/data`), por lo que se reinician al recargar la página. No hay backend.
- Utilidades puras y probadas en `src/utils`: horario, precios, formato, validaciones, códigos de servicio, vacunas y pacientes.

## Estructura del proyecto
```
src/
├── components/
│   ├── atoms/        Boton, CampoTexto, AreaTexto, Casilla, Selector, Icono, EtiquetaEspecie, EtiquetaEstadoCita, EtiquetaEstadoVacuna
│   ├── molecules/    CampoFormulario, SelectorFechaHora, BuscadorServicios, BuscadorPacientes, TarjetaServicio, FilaCita, FilaTablaCita,
│   │                 FilaPaciente, FilaVacuna, DatosPaciente, AlertaVacunas
│   ├── organisms/    Navbar, Footer, FormularioLogin, FormularioRegistro, FormularioServicio, FormularioSolicitudCita, FormularioAtencion,
│   │                 ListaServicios, ListaMisCitas, TablaCitas, TablaPacientes, TablaVacunas, HistorialAtenciones, MapaUbicacion
│   └── templates/    PlantillaPublica, PlantillaAdmin
├── context/          ServiciosContext, CitasContext, PacientesContext
├── data/             servicios, citas, pacientes, perfiles
├── hooks/            useServicios, useCitas, usePacientes, useTituloPagina
├── pages/            páginas de la aplicación (y sus pruebas *.test.jsx)
├── testUtils/        renderEnRuta (ayuda para probar páginas con router)
└── utils/            horario, precios, formato, validaciones, validacionesCita, codigos, vacunas, pacientes
```

## Cómo ejecutar el proyecto
```
npm install
npm run dev
```

## Pruebas
Se usa Vitest con Testing Library. Actualmente hay **13 archivos de prueba y 56 pruebas**, todas en verde.

```
npm run test:run   # corre todas las pruebas una vez
npm test           # modo watch
npm run test:cov   # pruebas + reporte de cobertura (carpeta coverage/)
```

Qué cubren:
- **Utilidades**: horario, precios, formato, validaciones y validaciones de cita.
- **Componentes**: EtiquetaEspecie, TarjetaServicio y FormularioLogin.
- **Páginas**: Login, Servicios, SolicitarCita, AdminCitas y AdminServicios (validaciones, navegación y flujos completos).

## Errores corregidos durante las pruebas
- `Servicios.jsx` tenía la función `manejarSeleccionarServicio` declarada dos veces. La segunda, que solo mostraba un `alert`, pisaba a la que navegaba, y "Solicitar cita" no llevaba al formulario.
- Los servicios iniciales de `AdminServicios` no tenían `especie` ni `duracion`, así que no se podían editar y guardar.

## Bitácora de cambios
Registro de los 63 commits del repositorio, ordenado por fecha (formato dd-mm-aaaa).

### 21-09-2026 (1 commit)
- `1842d1a` **Ítalo Carmona**: Inicialización proyecto veterinaria San marcos

### 22-09-2026 (3 commits)
- `e9c7928` **Ítalo Carmona**: Creación de README. Implementación básica de estructura página de inicio de sesión con dos átomos
- `1bd29f3` **Ítalo Carmona**: Corrección detalles de visualización README
- `132d287` **Ítalo Carmona**: Corrección README with detailed project information

### 05-10-2026 (13 commits)
- `17499e3` **Ítalo Carmona**: Se cambió estructura de botón e InputTexto para seguir estructura recomendada
- `2f6ef72` **Matías Yañez**: Atomos etiquetaestadocita y etiquetaespecie
- `58c05d9` **Ítalo Carmona**: Se corrigieron problemas con las importaciones
- `aef2ae1` **Camilo Peña**: feat(atoms):  agrega Selector con props id, name y className
- `e34cfde` **Camilo Peña**: feat(atoms): agrega Icono con className e ícono por defecto
- `67cb4a9` **Camilo Peña**: feat(molecules): CampoFormulario acepta Selector con tipo select y className
- `27e300b` **Ítalo Carmona**: Creación moleculas BuscadorServicios y TarjetaServicio
- `cb37ec5` **Camilo Peña**: feat(atoms): Selector soporta opciones deshabilitadas
- `3ecf5b5` **Camilo Peña**: feat(molecules): SelectorFechaHora bloquea horas ocupadas y muestra mensajes
- `4d2926f` **Camilo Peña**: feat(pages): agrega página Solicitar cita
- `cecb1fc` **Camilo Peña**: Revert "feat(pages): agrega página Solicitar cita"
- `5fabfc4` **Ítalo Carmona**: Creación NavBar
- `c8797ce` **archivohtml**: Merge branch 'main' into feature/footer-lista-utils

### 06-10-2026 (11 commits)
- `157153c` **Matías Yañez**: feat(molecules): agrega componente FilaCita para mostrar detalles de citas
- `a6bb58d` **archivohtml**: feat: agrega utils (horario, validaciones, precios y formato)
- `4e60612` **archivohtml**: feat: agrega catálogo de servicios desde el Excel
- `c924a18` **archivohtml**: feat: agrega organismo Footer
- `fa033bb` **archivohtml**: feat: agrega organismo ListaServicios con búsqueda y filtro por categoría
- `21b8926` **Matías Yañez**: feat(organisms): agrega componente Footer con información de contacto y horario
- `24925b2` **Ítalo Carmona**: Correcciones menores de dependencias, creación plantilla pública
- `6e26f82` **Ítalo Carmona**: Creación de rutas y corrección del main para mostrar las páginas
- `8ecb632` **Matías Yañez**: feat: agrega página de Servicios con búsqueda y filtrado
- `a6010b3` **Ítalo Carmona**: Correcciones en código CampoTexto, ListaServicios e implementación de página Servicios mediante el navegador
- `13d85a0` **Ítalo Carmona**: Implementación de estilos mediante App.css y correcciones menores a el estilo del footer

### 13-10-2026 (6 commits)
- `7bc9a14` **Ítalo Carmona**: navegación con router, validaciones, hook de título y login
- `f12c5ef` **Camilo Peña**: feat: formulario de registro con validación y navegación al login
- `714c690` **Matías Yañez**: feat: agrega componentes FormularioSolicitudCita y SolicitarCita
- `230f2e3` **Matías Yañez**: feat: agrega componente CitaConfirmada para mostrar detalles de la cita solicitada
- `549e1c7` **Matías Yañez**: feat: agrega rutas para SolicitarCita y CitaConfirmada en App.jsx; implementa navegación en Servicios
- `de1285d` **Matías Yañez**: feat: actualiza navegación en TarjetaServicio para incluir código de servicio en la ruta de SolicitarCita

### 15-10-2026 (18 commits)
- `b16e7ad` **Camilo Peña**: feat(registro): agrega código de FormularioRegistro con validaciones
- `077e50b` **Camilo Peña**: feat(registro): agrega página Registro con redirección a /login
- `63e5f61` **Camilo Peña**: feat(admin): agrega PlantillaAdmin con navegación
- `ef4697f` **Camilo Peña**: feat(admin): agrega FormularioServicio con validaciones
- `3d5fc81` **Camilo Peña**: feat(admin): agrega TablaCitas con cambio de estado
- `df7d58c` **Camilo Peña**: feat(admin): agrega página AdminServicios con CRUD
- `84488e3` **Camilo Peña**: feat(admin): agrega página AdminCitas
- `39dc66e` **Camilo Peña**: feat(admin): agrega rutas de registro y administración
- `c7965cc` **Camilo Peña**: fix(citas): agrega validacionesCita que faltaba en el repo
- `10e7c7d` **Camilo Peña**: feat(registro): agrega enlace al login desde Registro
- `9f01121` **Camilo Peña**: feat(login): agrega enlace al registro desde Login
- `0a7c561` **Camilo Peña**: feat(navbar): agrega enlace a la vista de administración
- `bc1d53d` **Camilo Peña**: style(admin): agrega estilos de tablas y formularios globales en App.css
- `02e45a4` **Camilo Peña**: style(forms): iguala el tamaño de los formularios a la tarjeta del login
- `a9e4ebb` **Camilo Peña**: style(admin): usa Navbar y estilos de la veterinaria en PlantillaAdmin
- `2814c39` **Camilo Peña**: style(admin): aplica estilos de la veterinaria a servicios y citas
- `97d9f24` **Camilo Peña**: style: agrega estilos de admin, formularios y enlaces en App.css
- `610d97d` **Camilo Peña**: style(registro): aplica el estilo de tarjeta del login al registro

### 16-10-2026 (1 commit)
- `b3cb34f` **Ítalo Carmona**: Implementación organismos TablaCitas, ListaMisCitas y FormularioRegistro y correcciones menores

### 19-10-2026 (6 commits)
- `ddecf05` **Matías Yañez**: Se agrego vite config, package.json y setupTests
- `3810c72` **Matías Yañez**: test: agrega pruebas unitarias para EtiquetaEspecie, TarjetaServicio, horario y precios
- `ae4c25c` **Matías Yañez**: feat: agrega páginas de Categorías y Detalle Servicio a la aplicación
- `e8178b0` **Camilo Peña**: test: agrega pruebas de Login, SolicitarCita y AdminCitas
- `288cd19` **Camilo Peña**: fix: elimina función duplicada en Servicios y agrega especie y duración a servicios iniciales de AdminServicios
- `5eab87b` **Camilo Peña**: test: agrega pruebas de Servicios y AdminServicios; fix: datos iniciales de AdminServicios

### 20-10-2026 (2 commits)
- `7339ad2` **Ítalo Carmona**: Correcciones menores a la estructura del proyecto
- `cb5cff2` **Ítalo Carmona**: Correcciones en lógica del código y limpieza de redundancias

### 21-10-2026 (1 commit)
- `e3fb97d` **Ítalo Carmona**: Contexto de citas y servicio. páginas MisCitas y detalle

### 22-10-2026 (1 commit)
- `7115dae` **Ítalo Carmona**: Agregación de mapa con Leaflet, alertas de vacunación y vista veterinario

## Material complementario
Carpeta de Drive con documentos del semestre (ERS y otros):
https://drive.google.com/drive/folders/1SsGsFhoXDgW7NzIUshiqj-TcnYFCs1jn?usp=sharing
