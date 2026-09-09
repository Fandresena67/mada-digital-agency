import { NavLink } from 'react-router-dom'

// Coordonnées alignées sur la page Contact : aucune adresse,
// aucun téléphone ni horaire inventé. Pas de liens sociaux :
// aucune URL réelle n'existe pour le moment (aucun lien mort).
const contactInfo = [
  {
    label: 'Email',
    text: 'fandresenanatolo@gmail.com',
    href: 'mailto:fandresenanatolo@gmail.com',
    icon: (
      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Disponibilité',
    text: 'Disponible pour échanger sur vos projets digitaux.',
    href: null,
    icon: (
      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Zone',
    text: 'Madagascar — Projets à distance',
    href: null,
    icon: (
      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const quickLinks = [
  { path: '/', label: 'Accueil' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'À propos' },
  { path: '/projects', label: 'Réalisations' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
]

const services = [
  'Création de sites web',
  'E-commerce',
  'Applications web',
  'Applications mobiles',
  'Solutions Cloud',
  'Cybersécurité',
  'Automatisation',
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="mb-4 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              MADA <span className="text-blue-400">DIGITAL</span> AGENCY
            </p>
            <p className="mb-6 max-w-xs leading-relaxed text-gray-400">
              Nous accompagnons les entreprises dans leur transformation
              numérique grâce à des solutions web modernes et performantes.
            </p>
          </div>

          <nav aria-label="Liens rapides">
            <h2 className="mb-4 text-lg font-semibold text-white">Liens rapides</h2>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className="transition-colors hover:text-blue-400">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Nos services">
            <h2 className="mb-4 text-lg font-semibold text-white">Nos services</h2>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <NavLink to="/services" className="transition-colors hover:text-blue-400">
                    {service}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Contact</h2>
            <ul className="space-y-4">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="break-all transition-colors hover:text-blue-400"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-400">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-gray-400">
              © {currentYear} MADA DIGITAL AGENCY. Tous droits réservés.
            </p>
            <p className="text-sm text-gray-500">
              Transformons vos idées en solutions digitales
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
