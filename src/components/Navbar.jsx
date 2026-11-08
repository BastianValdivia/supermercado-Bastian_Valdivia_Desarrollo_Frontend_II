import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useInventario } from '../context/useInventario.js'
import { useSesion } from '../context/useSesion.js'
import { usePersonalizacion } from '../context/usePersonalizacion.js'
import Logo from './Logo.jsx'
import Button from './ui/Button.jsx'
import PanelPersonalizar from './PanelPersonalizar.jsx'

const ENLACES = [
  { to: '/', texto: 'Nuestros Productos', end: true },
  { to: '/agregar', texto: 'Agregar artículo', soloAdmin: true },
  { to: '/inventario', texto: 'Inventario', soloAdmin: true },
  { to: '/carrito', texto: 'Carrito' },
]

// Logo que activa el tema navideño (cielo azul degradado + nieve)
const LOGO_NAVIDENO = 'logo-5.png'

// Copos generados una sola vez para la animación
const COPOS = Array.from({ length: 24 }, (_, i) => {
  // ~1 de cada 4 copos será grande
  const esGrande = Math.random() < 0.25

  return {
    id: i,
    left: `${Math.random() * 100}%`,
    size: esGrande
      ? `${16 + Math.random() * 10}px` // grandes: 16 a 26px
      : `${5 + Math.random() * 9}px`, // normales: 5 a 14px
    duration: `${5 + Math.random() * 8}s`,
    delay: `${Math.random() * -12}s`,
    opacity: 0.4 + Math.random() * 0.6,
  }
})

function Navbar() {
  const { carrito } = useInventario()
  const { esAdmin, cerrarSesion } = useSesion()
  const { logo } = usePersonalizacion()

  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  // Solo con el logo-5.png se activa el cielo navideño con nieve.
  // Con cualquier otro logo se usa el fondo blanco por defecto.
  const temaNavideno = logo === LOGO_NAVIDENO

  const unidadesEnCarrito = carrito.reduce(
    (total, linea) => total + linea.cantidad,
    0
  )

  const enlacesVisibles = ENLACES.filter(
    (enlace) => !enlace.soloAdmin || esAdmin
  )

  // Estilos del botón según el tema.
  // En el tema navideño el fondo es transparente (!bg-transparent) para que
  // el texto blanco se vea sobre el cielo azul.
  const estiloBoton = temaNavideno
    ? '!border-white/40 !bg-transparent !text-white hover:!bg-white/10 hover:!text-white'
    : ''

  function manejarCierreDeSesion() {
    cerrarSesion()
    setMenuAbierto(false)
    navigate('/')
  }

  return (
    <header
      className={`sticky top-0 z-20 border-b backdrop-blur ${
        temaNavideno
          ? 'border-white/20 bg-gradient-to-b from-[#0b1f7a] via-[#17409a] to-[#2f63c4]'
          : 'border-line bg-surface/95'
      }`}
    >
      {/* Animación de nieve (solo tema navideño) */}
      {temaNavideno && (
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          {COPOS.map((copo) => (
            <span
              key={copo.id}
              className="absolute top-[-12px] animate-caer-nieve text-white"
              style={{
                left: copo.left,
                fontSize: copo.size,
                opacity: copo.opacity,
                animationDuration: copo.duration,
                animationDelay: copo.delay,
              }}
            >
              ❄
            </span>
          ))}
        </div>
      )}

      <nav
        aria-label="Navegación principal"
        className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-2"
      >
        <Link
          to="/"
          aria-label="AND Supermercados, ir al inicio"
          onClick={() => setMenuAbierto(false)}
        >
          <Logo
            alt="AND Supermercados, tu cadena de confianza"
            className="h-14 w-auto"
          />
        </Link>

        <button
          type="button"
          className={`rounded-lg border p-2 md:hidden ${
            temaNavideno
              ? 'border-white/30 text-white hover:bg-white/10'
              : 'border-line text-ink hover:text-primary'
          }`}
          aria-label="Abrir o cerrar el menú"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuAbierto ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <ul
          id="menu-principal"
          className={`${
            menuAbierto ? 'flex' : 'hidden'
          } absolute left-0 right-0 top-full z-20 flex-col gap-1 border-b px-4 py-3 shadow-md md:static md:flex md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:bg-none md:p-0 md:shadow-none ${
            temaNavideno
              ? 'border-white/20 bg-gradient-to-b from-[#2f63c4] to-[#17409a]'
              : 'border-line bg-surface'
          }`}
        >
          {enlacesVisibles.map((enlace) => (
            <li key={enlace.to}>
              <NavLink
                to={enlace.to}
                end={enlace.end}
                onClick={() => setMenuAbierto(false)}
                className={({ isActive }) =>
                  `nav-link flex items-center gap-2 ${
                    temaNavideno ? '!text-white hover:!text-sky-200' : ''
                  } ${isActive ? 'nav-link-activo' : ''}`
                }
              >
                {enlace.texto}

                {enlace.to === '/carrito' && unidadesEnCarrito > 0 && (
                  <span
                    className="inline-flex min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-primary-dark"
                    aria-label={`${unidadesEnCarrito} unidades en el carrito`}
                  >
                    {unidadesEnCarrito}
                  </span>
                )}
              </NavLink>
            </li>
          ))}

          <li className="mt-1 md:mt-0">
            <PanelPersonalizar estiloBoton={estiloBoton} />
          </li>

          <li className="mt-1 md:ml-1 md:mt-0">
            {esAdmin ? (
              <Button
                variant="outline"
                className={`w-full md:w-auto ${estiloBoton}`}
                onClick={manejarCierreDeSesion}
              >
                Cerrar sesión
              </Button>
            ) : (
              <Button
                variant="outline"
                to="/login"
                className={`w-full md:w-auto ${estiloBoton}`}
                onClick={() => setMenuAbierto(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                </svg>
                Acceso privado
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar