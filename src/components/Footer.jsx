import { Link } from 'react-router-dom'
import { useSesion } from '../context/useSesion.js'
import MediosDePago from './MediosDePago.jsx'

function Footer() {
  const { esAdmin } = useSesion()

  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.4fr]">
        <div>
          <p className="text-xl font-extrabold tracking-tight">
            AND <span className="text-accent">Supermercados</span>
          </p>
          <p className="mt-1 text-sm text-white/75">Tu cadena de confianza</p>
        </div>

        <nav aria-label="Enlaces del pie de página">
          <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Navegación</h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-white/85">
            <li><Link className="hover:text-accent" to="/">Nuestros Productos</Link></li>
            <li><Link className="hover:text-accent" to="/carrito">Carrito</Link></li>
            <li>
              {esAdmin ? (
                <Link className="hover:text-accent" to="/agregar">Agregar artículo</Link>
              ) : (
                <Link className="hover:text-accent" to="/login">Acceso privado</Link>
              )}
            </li>
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Medios de pago</h2>
          <div className="mt-3">
            <MediosDePago />
          </div>
        </div>
      </div>
      <p className="border-t border-white/15 py-4 text-center text-xs text-white/60">
        Bastian Valdivia - Desarrollo Frontend II
      </p>
    </footer>
  )
}

export default Footer
