/**
 * Iconos de trazo (estilo "line art") para el filtro de categorías.
 */
const DIBUJOS = {
  Todas: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </>
  ),
  Lácteos: (
    <>
      <path d="M8 3h8l2 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7l2-4z" />
      <path d="M6 7h12" />
      <path d="M10 14h4" />
    </>
  ),
  Panadería: (
    <>
      <path d="M4.5 11a3.5 3.5 0 0 1 1.5-6.4 8 8 0 0 1 12 0A3.5 3.5 0 0 1 19.5 11v8a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-8z" />
      <path d="M9 12.5v3M12 12.5v3M15 12.5v3" />
    </>
  ),
  Bebidas: (
    <>
      <path d="M6 8h12l-1.5 12a1 1 0 0 1-1 .9h-7a1 1 0 0 1-1-.9L6 8z" />
      <path d="M5 8h14" />
      <path d="M12 8V3l3-1" />
    </>
  ),
  Carnes: (
    <>
      <path d="M9.5 14.5C7.5 11 9 5.5 14.5 4.2c4.2-1 6.8 3 5.2 7C18.3 14.8 13.5 16.5 9.5 14.5z" />
      <path d="M9.5 14.5 6.5 17.5" />
      <path d="M13 8.5c1.4-.4 2.8.1 3.3 1.5" />
      <circle cx="5" cy="17.3" r="1.4" />
      <circle cx="6.7" cy="19" r="1.4" />
    </>
  ),
  Limpieza: (
    <>
      <path d="M6 21v-8a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v8H6z" />
      <path d="M9 11V8h5v3" />
      <path d="M9 8V6h6l3-1.5" />
      <path d="M19 8.5h2M19 11.5h2" />
    </>
  ),
}

function IconoCategoria({ nombre, className = 'h-7 w-7' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {DIBUJOS[nombre] ?? DIBUJOS.Todas}
    </svg>
  )
}

export default IconoCategoria
