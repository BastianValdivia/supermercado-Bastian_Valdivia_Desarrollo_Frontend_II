import { formatearPrecio } from '../utils/formato.js'

// Textos de la franja: cámbialos aquí sin tocar el diseño.
const COMPRA_MINIMA_DESPACHO_GRATIS = 30000
const MENSAJE_APARTE = 'Retira en tienda o pide a domicilio'

/**
 * Franja promocional de poca altura que va justo debajo del navbar.
 * Usa los colores del tema (degradado verde + acento naranja), así que si
 * cambia la paleta en theme.css, la franja cambia con ella.
 */
function FranjaPromo() {
  return (
    <aside
      aria-label="Promoción"
      className="bg-gradient-to-r from-primary-dark to-primary text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2">
        <p className="flex items-center gap-2 text-lg font-bold leading-none sm:text-2xl">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 shrink-0 text-white/70 sm:h-8 sm:w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 6.5A1.5 1.5 0 0 1 3.5 5H14v11H2V6.5z" />
            <path d="M14 8.5h4l3 3.5v4h-7V8.5z" />
            <circle cx="6.5" cy="17.5" r="2" />
            <circle cx="17.5" cy="17.5" r="2" />
          </svg>
          <span>
            Despacho <span className="font-extrabold uppercase text-accent">gratis</span>
          </span>
        </p>

        <p className="text-center text-xs leading-tight text-white/90 sm:text-sm">
          En compras sobre{' '}
          <span className="rounded-full bg-white/15 px-2 py-0.5 font-bold text-white">
            {formatearPrecio(COMPRA_MINIMA_DESPACHO_GRATIS)}
          </span>
          <span className="hidden sm:inline"> · {MENSAJE_APARTE}</span>
        </p>
      </div>
    </aside>
  )
}

export default FranjaPromo
