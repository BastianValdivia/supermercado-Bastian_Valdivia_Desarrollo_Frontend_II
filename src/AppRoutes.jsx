import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import RutaProtegida from './components/RutaProtegida.jsx'

// Lazy loading: cada pantalla se descarga solo cuando se visita su ruta.
const ListaArticulos = lazy(() => import('./pages/ListaArticulos.jsx'))
const AgregarArticulo = lazy(() => import('./pages/AgregarArticulo.jsx'))
const Inventario = lazy(() => import('./pages/Inventario.jsx'))
const DetalleArticulo = lazy(() => import('./pages/DetalleArticulo.jsx'))
const Carrito = lazy(() => import('./pages/Carrito.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))

// Suspense por pantalla: mientras carga, solo cambia el contenido; la
// navbar y el footer (del Layout) se mantienen en pantalla.
function conCarga(pantalla) {
  return (
    <Suspense fallback={<p className="p-10 text-center text-muted">Cargando...</p>}>
      {pantalla}
    </Suspense>
  )
}

/**
 * Todas las rutas de la aplicación, en un único archivo.
 *
 *   /                 Nuestros Productos: lista + filtro por categoría + búsqueda
 *   /articulos/:id    detalle de un artículo (parámetro dinámico)
 *   /carrito          carrito de compras
 *   /login            acceso privado (login simulado del administrador)
 *   /agregar          formulario para agregar un artículo (solo administrador)
 *   /inventario       tabla con todos los artículos del inventario (solo administrador)
 */
function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={conCarga(<ListaArticulos />)} />
        <Route path="articulos/:id" element={conCarga(<DetalleArticulo />)} />
        <Route path="carrito" element={conCarga(<Carrito />)} />
        <Route path="login" element={conCarga(<Login />)} />

        {/* Rutas protegidas: sin sesión de administrador redirigen a /login */}
        <Route element={<RutaProtegida />}>
          <Route path="agregar" element={conCarga(<AgregarArticulo />)} />
          <Route path="inventario" element={conCarga(<Inventario />)} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
