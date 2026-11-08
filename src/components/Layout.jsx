import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import FranjaPromo from './FranjaPromo.jsx'
import PasosRetiro from './PasosRetiro.jsx'
import Newsletter from './Newsletter.jsx'

// Pantallas donde no se muestra contenido promocional (franja, pasos de retiro
// y newsletter): son para el administrador o para ingresar, no para comprar.
const RUTAS_SIN_PROMOCION = ['/agregar', '/inventario', '/login']

/**
 * Layout común: navbar + franja promocional + contenido de la ruta (<Outlet />) + pasos de retiro + newsletter + footer.
 * Todas las pantallas de AppRoutes se renderizan dentro de este marco. Las
 * secciones promocionales se ocultan en RUTAS_SIN_PROMOCION.
 */
function Layout() {
  const { pathname } = useLocation()
  // Se ignora una barra final ("/agregar/") para comparar la ruta.
  const mostrarPromocion = !RUTAS_SIN_PROMOCION.includes(pathname.replace(/\/$/, '') || '/')

  // Al cambiar de pantalla, volver al inicio de la página.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {mostrarPromocion && <FranjaPromo />}
      <main className="flex-1">
        <Outlet />
      </main>
      {mostrarPromocion && <PasosRetiro />}
      {mostrarPromocion && <Newsletter />}
      <Footer />
    </div>
  )
}

export default Layout
