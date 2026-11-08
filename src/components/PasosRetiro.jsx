// Pasos del retiro en tienda: edita los textos aquí sin tocar el diseño.
const PASOS = [
  {
    titulo: 'Compra online',
    texto: (
      <>
        Selecciona <strong className="font-bold text-ink">"Retiro en tienda"</strong> y realiza tu compra.
      </>
    ),
    icono: (
      <>
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M2.5 3.5h3l2.3 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20.5 8H6.2" />
      </>
    ),
  },
  {
    titulo: 'Confirmación',
    texto: (
      <>
        Espera el <strong className="font-bold text-ink">correo de confirmación</strong> para saber cuándo retirar.
      </>
    ),
    icono: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 7l8.5 6 8.5-6" />
      </>
    ),
  },
  {
    titulo: 'Retiro',
    texto: (
      <>
        Pasa por la tienda elegida con tu <strong className="font-bold text-ink">documento de identidad y medio de pago</strong>.
      </>
    ),
    icono: (
      <>
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
        <circle cx="12" cy="10" r="2.3" />
      </>
    ),
  },
]

/**
 * Sección "Retira tu compra en 3 simples pasos". Va sobre el newsletter.
 * Usa solo colores del tema, así que sigue a la paleta elegida.
 */
function PasosRetiro() {
  return (
    <section aria-labelledby="titulo-pasos-retiro" className="mx-auto mt-12 max-w-5xl px-4">
      <div className="tarjeta px-4 py-8 sm:px-8">
        <h2
          id="titulo-pasos-retiro"
          className="text-center text-lg font-extrabold uppercase tracking-tight text-ink sm:text-2xl"
        >
          Retira tu compra en 3 simples pasos
        </h2>

        <ol className="relative mt-8 grid gap-8 md:grid-cols-3 md:gap-4">
          {/* Línea que une los círculos (solo escritorio) */}
          <span
            aria-hidden="true"
            className="absolute left-[16.6%] right-[16.6%] top-10 hidden h-px bg-line md:block"
          />

          {PASOS.map((paso, indice) => (
            <li key={paso.titulo} className="relative flex flex-col items-center text-center">
              <div className="relative">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-surface text-primary">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {paso.icono}
                  </svg>
                </span>
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-dark text-xs font-bold text-white">
                  {indice + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-primary">{paso.titulo}</h3>
              <p className="mt-1 max-w-[16rem] text-sm leading-snug text-muted">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default PasosRetiro
