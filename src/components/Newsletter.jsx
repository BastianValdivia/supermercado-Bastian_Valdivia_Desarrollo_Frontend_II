import { useRef, useState } from 'react'

// Validación estandar de formato de correo (no hay backend que la confirme).
const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Banda de newsletter sobre el footer.
 * No hay backend: al enviar un correo válido solo se abre un modal de éxito.
 */
function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [emailEnviado, setEmailEnviado] = useState('')
  const modalRef = useRef(null)

  function manejarEnvio(evento) {
    evento.preventDefault()
    const valor = email.trim()

    if (!valor) {
      setError('Ingresa tu correo electrónico.')
      return
    }
    if (!FORMATO_EMAIL.test(valor)) {
      setError('Ingresa un correo válido, por ejemplo nombre@correo.com.')
      return
    }

    setError('')
    setEmailEnviado(valor)
    setEmail('')
    modalRef.current?.showModal()
  }

  function cerrarModal() {
    modalRef.current?.close()
  }

  // Un clic sobre el fondo oscuro (el propio <dialog>) cierra el modal.
  function manejarClicEnModal(evento) {
    if (evento.target === modalRef.current) cerrarModal()
  }

  return (
    <section aria-labelledby="titulo-newsletter" className="mt-12 bg-accent">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="text-primary-dark">
          <h2 id="titulo-newsletter" className="text-2xl font-extrabold uppercase leading-none sm:text-3xl">
            Newsletter
          </h2>
          <p className="mt-1 text-base font-bold leading-tight sm:text-lg">
            ¡No te pierdas nuestras mejores ofertas solo para ti!
          </p>
        </div>

        <form onSubmit={manejarEnvio} noValidate className="w-full md:max-w-md">
          <label htmlFor="newsletter-email" className="sr-only">
            Correo electrónico
          </label>
          <div className="flex overflow-hidden rounded-full bg-surface shadow-sm focus-within:ring-2 focus-within:ring-primary-dark">
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'newsletter-error' : undefined}
              className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-ink placeholder:text-muted/80 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary px-5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-primary-dark focus:outline-none focus-visible:bg-primary-dark sm:px-7"
            >
              Suscribirme
            </button>
          </div>
          {error && (
            <p id="newsletter-error" role="alert" className="mt-2 pl-5 text-sm font-semibold text-primary-dark">
              {error}
            </p>
          )}
        </form>
      </div>

      {/* Modal de éxito (simulado). <dialog> ya maneja Esc y el foco. */}
      <dialog
        ref={modalRef}
        onClick={manejarClicEnModal}
        aria-labelledby="titulo-modal-newsletter"
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-card border border-line bg-surface p-0 text-ink shadow-xl backdrop:bg-ink/60"
      >
        <div className="px-6 py-8 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-primary">
            <svg
              viewBox="0 0 24 24"
              className="h-9 w-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <h3 id="titulo-modal-newsletter" className="mt-4 text-xl font-extrabold text-primary-dark">
            ¡Suscripción exitosa!
          </h3>
          <p className="mt-2 text-sm text-muted">
            Gracias por unirte. Enviaremos nuestras mejores ofertas a{' '}
            <strong className="break-all font-bold text-ink">{emailEnviado}</strong>.
          </p>
          <button type="button" onClick={cerrarModal} className="btn btn-primary mt-6 w-full">
            Entendido
          </button>
        </div>
      </dialog>
    </section>
  )
}

export default Newsletter
