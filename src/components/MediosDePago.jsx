/**
 * Medios de pagos
 * Son insignias SVG simples dentro de una pastilla blanca para que los
 * colores de cada marca se vean bien sobre el verde oscuro del footer.
 */
const MEDIOS = [
  {
    nombre: 'Visa',
    logo: (
      <text x="32" y="26" textAnchor="middle" fontSize="19" fontWeight="900" fontStyle="italic" fill="#1A1F71" fontFamily="Arial, sans-serif">
        VISA
      </text>
    ),
  },
  {
    nombre: 'Mastercard',
    logo: (
      <>
        <circle cx="26" cy="20" r="11" fill="#EB001B" />
        <circle cx="38" cy="20" r="11" fill="#F79E1B" />
        <path d="M32 11.2a11 11 0 0 1 0 17.6a11 11 0 0 1 0-17.6z" fill="#FF5F00" />
      </>
    ),
  },
  {
    nombre: 'American Express',
    logo: (
      <>
        <rect x="8" y="9" width="48" height="22" rx="3" fill="#2E77BC" />
        <text x="32" y="25" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">
          AMEX
        </text>
      </>
    ),
  },
  {
    nombre: 'PayPal',
    logo: (
      <text x="32" y="25" textAnchor="middle" fontSize="14" fontWeight="800" fontStyle="italic" fontFamily="Arial, sans-serif">
        <tspan fill="#003087">Pay</tspan>
        <tspan fill="#009CDE">Pal</tspan>
      </text>
    ),
  },
  {
    nombre: 'Apple Pay',
    logo: (
      <>
        {/* Manzana simple: cuerpo + hoja */}
        <path
          d="M17 14.2c-1.2-.9-3.2-.9-4.4.2-1.8 1.6-1.4 5.2.200 7.4.7 1 1.4 1.6 2.2 1.6.7 0 1-.4 2-.4s1.3.4 2 .4c.8 0 1.6-.7 2.2-1.6.5-.7.8-1.4.9-1.6-1.8-.8-2.2-3.6-.3-4.8-.9-1.1-2.4-1.4-3.5-.6-.4.3-.9.4-1.3.4z"
          fill="#111"
        />
        <path d="M17.2 10.2c-.9.1-1.8.8-2.2 1.7 1 0 2-.6 2.4-1.5.1-.1-.1-.2-.2-.2z" fill="#111" />
        <text x="40" y="25" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111" fontFamily="Arial, sans-serif">
          Pay
        </text>
      </>
    ),
  },
  {
    nombre: 'Google Pay',
    logo: (
      <text x="32" y="25" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif">
        <tspan fill="#4285F4">G</tspan>
        <tspan fill="#5F6368"> Pay</tspan>
      </text>
    ),
  },
]

function MediosDePago() {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Medios de pago aceptados">
      {MEDIOS.map((medio) => (
        <li key={medio.nombre}>
          <svg
            viewBox="0 0 64 40"
            role="img"
            aria-label={medio.nombre}
            className="h-10 w-16 rounded-md bg-white shadow-sm"
          >
            <title>{medio.nombre}</title>
            {medio.logo}
          </svg>
        </li>
      ))}
    </ul>
  )
}

export default MediosDePago
