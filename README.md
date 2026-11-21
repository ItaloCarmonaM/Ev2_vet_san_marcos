# Veterinaria San Marcos

Proyecto del **Grupo 2**: plataforma web para la gestión integral de una clínica veterinaria, con frontend desarrollado en React e integrado con una API RESTful desplegada en AWS EC2.

## Enlaces del proyecto y despliegue
- **Repositorio Frontend:** https://github.com/ItaloCarmonaM/Ev2_vet_san_marcos
- **Repositorio Backend:** https://github.com/Matiasytorres/backend_vet_san_marcos
- **Documentación API (Swagger):** http://3.229.45.167:3000/api/docs/
- **Aplicación Frontend (AWS EC2):** http://54.81.168.243:5173
- **API Base URL (AWS EC2):** `http://3.229.45.167:3000/api/v1`

## Integrantes
- Ítalo Carmona (it.carmona@duocuc.cl), cuenta de GitHub `ItaloCarmonaM`
- Camilo Peña (ca.penag@duocuc.cl), cuentas de GitHub `lokiinsano` y `archivohtml`
- Matías Yañez (mat.yanezt@duocuc.cl), cuenta de GitHub `Matiasytorres`

## Caso Veterinaria San Marcos
Sistema web para una clínica veterinaria de mascotas domésticas que atiende perros, gatos, conejos y aves.
Permite el registro e inicio de sesión mediante JWT, reserva de horas con validación de disponibilidad en tiempo real, y gestión diferenciada por roles (`dueno_mascota`, `recepcionista` y `administrador`).

## Tecnologías
- React 19 + Vite
- Axios (cliente HTTP con interceptores JWT y manejo centralizado de errores)
- React Bootstrap / Bootstrap 5
- React Router DOM 7 (navegación y rutas protegidas por rol)
- Leaflet + OpenStreetMap (mapa de ubicación)
- Vitest + Testing Library + jsdom (pruebas) y cobertura con `@vitest/coverage-v8`
- oxlint (análisis estático)

## Funcionalidades implementadas

### Sitio público y cliente (`dueno_mascota`)
- **Inicio** (`/`): presentación de la veterinaria, cifras, servicios destacados y mapa con la ubicación de la clínica (Leaflet, Rancagua).
- **Servicios** (`/servicios`): catálogo conectado a la base de datos con búsqueda por texto (sin distinguir mayúsculas ni tildes) y filtro por categoría.
- **Categorías** (`/categorias`) y **Detalle de servicio** (`/servicio/:codigo`).
- **Solicitar cita** (`/solicitar-cita` y `/solicitar-cita/:codigo`): formulario conectado a `/citas` y `/citas/ocupadas` con validaciones de horario y bloqueo automático de bloques ya reservados.
- **Cita confirmada** (`/cita-confirmada`): resumen con fecha, hora, precio y estado, considerando recargo por atención de urgencia fuera de horario.
- **Mis citas** (`/mis-citas`): listado de citas propias del cliente autenticado.
- **Mis vacunas** (`/mis-vacunas`): historial de vacunación de las mascotas con alertas según estado (*Al día*, *Próxima a vencer* dentro de 30 días y *Vencida*).
- **Login** (`/login`) y **Registro** (`/registro`): autenticación contra `/auth/login` y `/auth/register` con persistencia de sesión mediante token JWT.

### Vista de personal (`recepcionista` y `administrador`)
- **Administrar citas** (`/admin/citas`): listado general de citas y cambio de estado (`Pendiente` → `Confirmada` → `Completada`, o `Cancelada`) con validación de conflicto horario (HTTP 409).
- **Panel del veterinario** (`/veterinario`): agenda de citas pendientes y confirmadas desde hoy, y buscador de pacientes por nombre o dueño.
- **Ficha del paciente** (`/veterinario/paciente/:id`): datos del paciente, historial de atenciones, tabla de vacunas con alertas y formulario para registrar nuevas atenciones.

### Vista de administración (`administrador`)
- **Administrar servicios** (`/admin/servicios`): CRUD completo conectado a `/servicios` con código correlativo generado en backend (`SRV-XXX`), validaciones y confirmación antes de eliminar.
- **Administrar usuarios** (`/admin/usuarios`): creación de usuarios, listado desde `/usuarios`, cambio de rol y activación/desactivación de cuentas.

## Arquitectura e integración con Backend
- **Atomic Design**: componentes organizados en `atoms`, `molecules`, `organisms`, `templates` y `pages`.
- **Capa de servicios (`src/services`)**: comunicación con la API REST mediante Axios (`api.js`, `authService.js`, `servicioService.js`, `citaService.js`, `usuarioService.js` y `errores.js`).
- **Estado global (`src/context`)**: `AuthContext`, `ServiciosContext`, `CitasContext` y `PacientesContext`, sincronizados con los endpoints de la API.
- **Control de acceso (`src/routes/RutaProtegida.jsx`)**: protección de rutas según autenticación y rol del usuario (`dueno_mascota`, `recepcionista`, `administrador`).

## Estructura del proyecto
```text
src/
├── components/
│   ├── atoms/        Boton, CampoTexto, AreaTexto, Casilla, Selector, Icono, EtiquetaEspecie, EtiquetaEstadoCita, EtiquetaEstadoVacuna, Alerta, Cargando
│   ├── molecules/    CampoFormulario, SelectorFechaHora, BuscadorServicios, BuscadorPacientes, TarjetaServicio, FilaCita, FilaTablaCita,
│   │                 FilaPaciente, FilaVacuna, DatosPaciente, AlertaVacunas
│   ├── organisms/    Navbar, Footer, FormularioLogin, FormularioRegistro, FormularioServicio, FormularioSolicitudCita, FormularioAtencion,
│   │                 FormularioUsuario, ListaServicios, ListaMisCitas, TablaCitas, TablaUsuarios, TablaPacientes, TablaVacunas, HistorialAtenciones, MapaUbicacion
│   └── templates/    PlantillaPublica, PlantillaAdmin
├── context/          AuthContext, ServiciosContext, CitasContext, PacientesContext
├── dto/              AuthDto, UsuarioDto
├── hooks/            useAuth, useServicios, useCitas, usePacientes, useTituloPagina
├── pages/            páginas de la aplicación (y pruebas *.test.jsx)
├── routes/           RutaProtegida
├── services/         api, authService, servicioService, citaService, usuarioService, errores
├── testUtils/        renderEnRuta
└── utils/            horario, precios, formato, validaciones, validacionesCita, codigos, vacunas, pacientes, sesion
```

## Configuración y ejecución local
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Configurar la variable de entorno creando un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_API_URL=[http://3.229.45.167:3000/api/v1](http://3.229.45.167:3000/api/v1)
   ```
3. Levantar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Pruebas
Se utiliza Vitest con Testing Library (`jsdom`).

```bash
npm run test:run   # ejecuta todas las pruebas una vez
npm test           # modo watch
npm run test:cov   # pruebas + reporte de cobertura (carpeta coverage/)
```

Qué cubren:
- **Utilidades**: horario, precios, formato, validaciones y validaciones de cita.
- **Componentes**: EtiquetaEspecie, TarjetaServicio y FormularioLogin.
- **Páginas**: Login, Servicios, SolicitarCita, AdminCitas y AdminServicios.

## Aportes por integrante
Según los commits del repositorio hasta el 21-11-2026 (76 en total).

| Integrante | Commits | Aportes principales |
|---|---|---|
| Ítalo Carmona | 23 | Estructura inicial, Navbar, plantilla pública, rutas y router, autenticación y sesión JWT, rutas protegidas por rol, gestión de usuarios, contextos, Mis citas, mapa con Leaflet, alertas de vacunación y vista del veterinario |
| Matías Yañez | 18 | Átomos de etiquetas, FilaCita, página de Servicios, flujo de Solicitar cita y Cita confirmada, Categorías y Detalle de servicio, configuración de Vitest, pruebas de utilidades, integración con API REST para servicios y citas |
| Camilo Peña | 35 | Utilidades (horario, validaciones, precios, formato), catálogo de servicios desde el Excel, ListaServicios, Selector, Icono y SelectorFechaHora, registro, vista de administración, estilos, pruebas de páginas, corrección de errores y README |

## Bitácora de cambios
Registro de los 76 commits del repositorio hasta el 21-11-2026, ordenado por fecha (formato dd-mm-aaaa).
Las fechas pueden diferir en un día de las que muestra GitHub, según la zona horaria.
Los commits de las cuentas `Camilo` y `archivohtml` corresponden a Camilo Peña.

### 21-09-2026 (1 commit)
- `1842d1a` **Ítalo Carmona**: Inicialización proyecto veterinaria San Carlos

### 22-09-2026 (3 commits)
- `e9c7928` **Ítalo Carmona**: Creación de README. Implementación básica de estructura página de inicio de sesión con dos átomos
- `1bd29f3` **Ítalo Carmona**: Corrección detalles de visualización README
- `132d287` **Ítalo Carmona**: Corrección README with detailed project information

### 05-10-2026 (13 commits)
- `17499e3` **Ítalo Carmona**: Se cambió estructura de botón e InputTexto para seguir estructura recomendada
- `2f6ef72` **Matías Yañez**: Atomos etiquetaestadocita y etiquetaespecie
- `58c05d9` **Ítalo Carmona**: Se corrigieron problemas con las importaciones
- `aef2ae1` **Camilo Peña**: feat(atoms): agrega Selector con props id, name y className
- `e34cfde` **Camilo Peña**: feat(atoms): agrega Icono con className e ícono por defecto
- `67cb4a9` **Camilo Peña**: feat(molecules): CampoFormulario acepta Selector con tipo select y className
- `27e300b` **Ítalo Carmona**: Creación moleculas BuscadorServicios y TarjetaServicio
- `cb37ec5` **Camilo Peña**: feat(atoms): Selector soporta opciones deshabilitadas
- `3ecf5b5` **Camilo Peña**: feat(molecules): SelectorFechaHora bloquea horas ocupadas y muestra mensajes
- `4d2926f` **Camilo Peña**: feat(pages): agrega página Solicitar cita
- `cecb1fc` **Camilo Peña**: Revert "feat(pages): agrega página Solicitar cita"
- `5fabfc4` **Ítalo Carmona**: Creación NavBar
- `c8797ce` **Camilo Peña** (`archivohtml`): Merge branch 'main' into feature/footer-lista-utils

### 06-10-2026 (11 commits)
- `157153c` **Matías Yañez**: feat(molecules): agrega componente FilaCita para mostrar detalles de citas
- `a6bb58d` **Camilo Peña** (`archivohtml`): feat: agrega utils (horario, validaciones, precios y formato)
- `4e60612` **Camilo Peña** (`archivohtml`): feat: agrega catálogo de servicios desde el Excel
- `c924a18` **Camilo Peña** (`archivohtml`): feat: agrega organismo Footer
- `fa033bb` **Camilo Peña** (`archivohtml`): feat: agrega organismo ListaServicios con búsqueda y filtro por categoría
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

### 22-10-2026 (2 commits)
- `7115dae` **Ítalo Carmona**: Agregación de mapa con Leaflet, alertas de vacunación y vista veterinario
- `fe776b4` **Camilo Peña**: docs: actualiza README con funcionalidades, pruebas y bitácora de commits

### 25-10-2026 (1 commit)
- `246203c` **Ítalo Carmona**: Ingreso de coverage a .gitignore y corrección menor a vite.config.js

### 26-10-2026 (2 commits)
- `51fafb8` **Matías Yañez**: Update Readme
- `98990ef` **Matías Yañez**: Revise README for project details and contributions

### 16-11-2026 (1 commit)
- `ea8f84f` **Ítalo Carmona**: Adición enlace a backend en README

### 17-11-2026 (1 commit)
- `3cb015a` **Ítalo Carmona**: Corrección de props a elementos con prop desestructurado

### 20-11-2026 (2 commits)
- `c602ed8` **Ítalo Carmona**: Sesión, login, registro y rutas por rol
- `01e9819` **Ítalo Carmona**: Implementación gestión de usuarios, incluyendo dto, páginas y componentes para su visualización.

### 21-11-2026 (5 commits)
- `b1fe364` **Matías Yañez**: Actualizar la URL de la API en el archivo .env.example
- `a644731` **Matías Yañez**: Agregar servicio para la gestión de servicios: listar, crear, actualizar y eliminar
- `0342d19` **Matías Yañez**: Implementar gestión de citas: cargar, crear y cambiar estado de citas con manejo de errores y carga
- `549f9d8` **Matías Yañez**: Implementar gestión de servicios: recargar, agregar, actualizar y eliminar servicios con manejo de errores y estado de carga
- `61b08aa` **Matías Yañez**: Refactor gestión de citas y componentes relacionados: se agregan funciones para obtener información de citas, se mejora el manejo de estados y se optimizan los componentes para mostrar datos de manera más clara.

## Material complementario
Carpeta de Drive con documentos del semestre (ERS, documento de integración, manual de usuario y otros):
https://drive.google.com/drive/folders/1SsGsFhoXDgW7NzIUshiqj-TcnYFCs1jn?usp=sharing