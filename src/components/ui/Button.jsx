import { Link } from 'react-router-dom'

// Cada variante apunta a una clase definida con @apply en src/index.css.
const VARIANTES = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  outline: 'btn-outline',
}

/**
 * Botón reutilizable.
 *  - variant: 'primary' | 'accent' | 'outline'
 */
function Button({ variant = 'primary', to, className = '', children, ...props }) {
  const clases = `btn ${VARIANTES[variant]} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={clases} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={clases} {...props}>
      {children}
    </button>
  )
}

export default Button
