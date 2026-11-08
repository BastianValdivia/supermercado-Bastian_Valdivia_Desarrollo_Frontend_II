import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSesion } from '../context/useSesion.js'
import { CREDENCIALES_DEMO } from '../data/credencialesDemo.js'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/ui/Button.jsx'

/**
 * Pantalla: acceso privado (login simulado del administrador).
 * Los campos vienen con las credenciales de demostración ya escritas para
 * simplificar acceso (login simulado)
 */
function Login() {
  const { esAdmin, iniciarSesion } = useSesion()
  const location = useLocation()
  const [usuario, setUsuario] = useState(CREDENCIALES_DEMO.usuario)
  const [clave, setClave] = useState(CREDENCIALES_DEMO.clave)
  const [error, setError] = useState('')

  // Con sesión iniciada, vuelve a la pantalla que se pidió (o a "Agregar").
  if (esAdmin) {
    return <Navigate to={location.state?.from?.pathname ?? '/agregar'} replace />
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    if (!iniciarSesion(usuario, clave)) {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  return (
    <>
      <PageHero
        titulo="Acceso privado"
        migas={[{ texto: 'Inicio', to: '/' }, { texto: 'Acceso privado' }]}
      />

      <div className="mx-auto max-w-md px-4 py-10">
        <form onSubmit={manejarEnvio} noValidate className="tarjeta space-y-5 p-6 sm:p-8">
          <p className="rounded-lg bg-primary-soft p-3 text-sm text-primary-dark">
            <span className="font-bold">Acceso de demostración.</span> Usuario{' '}
            <code className="font-bold">{CREDENCIALES_DEMO.usuario}</code> y contraseña{' '}
            <code className="font-bold">{CREDENCIALES_DEMO.clave}</code>. La autenticación es
            simulada: solo separa quién puede cargar productos.
          </p>

          <div>
            <label htmlFor="usuario" className="etiqueta">Usuario</label>
            <input
              id="usuario"
              name="usuario"
              type="text"
              autoComplete="username"
              value={usuario}
              onChange={(e) => { setUsuario(e.target.value); setError('') }}
              className="campo"
            />
          </div>

          <div>
            <label htmlFor="clave" className="etiqueta">Contraseña</label>
            <input
              id="clave"
              name="clave"
              type="password"
              autoComplete="current-password"
              value={clave}
              onChange={(e) => { setClave(e.target.value); setError('') }}
              className="campo"
            />
          </div>

          {error && (
            <p className="mensaje-error" role="alert">{error}</p>
          )}

          <Button type="submit" className="w-full">Ingresar</Button>
        </form>
      </div>
    </>
  )
}

export default Login
