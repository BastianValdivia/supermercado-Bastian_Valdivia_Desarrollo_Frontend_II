import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSesion } from '../context/useSesion.js'

/**
 * Agrupa las rutas que solo puede ver el administrador.
 * Sin sesión, redirige a /login y recuerda la pantalla pedida para volver
 * a ella después de ingresar.
 */
function RutaProtegida() {
  const { esAdmin } = useSesion()
  const location = useLocation()

  if (!esAdmin) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default RutaProtegida
