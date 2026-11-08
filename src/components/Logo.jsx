import { usePersonalizacion } from '../context/usePersonalizacion.js'

/**
 * Logo del sitio. Muestra el archivo elegido en el panel "Personalizar"
 * (por defecto public/img/logo.png). Se usa en el navbar y en el hero.
 */
function Logo({ className = '', alt = 'AND Supermercados' }) {
  const { logo } = usePersonalizacion()

  return <img src={`${import.meta.env.BASE_URL}img/${logo}`} alt={alt} className={className} />
}

export default Logo
