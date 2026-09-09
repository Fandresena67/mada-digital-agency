import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { path: '/', label: 'Accueil' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'À propos' },
  { path: '/projects', label: 'Réalisations' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // Ombre renforcée après le début du défilement (effet léger, sans animation).
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fermer le menu mobile avec la touche Échap (accessibilité clavier).
  useEffect(() => {
    if (!isOpen) return undefined
    const handleKey = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2.5 rounded-lg transition-opacity hover:opacity-90"
            aria-label="MADA DIGITAL AGENCY — Accueil"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-extrabold text-white" aria-hidden="true">
              M
            </span>
            <span className="whitespace-nowrap text-base font-extrabold tracking-tight text-gray-900 sm:text-lg lg:text-xl">
              MADA <span className="text-blue-600">DIGITAL</span> AGENCY
            </span>
          </NavLink>

          {/* Navigation desktop : à partir de lg pour éviter tout chevauchement */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `relative py-2 text-[15px] font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-blue-600 after:transition-transform after:duration-300 hover:text-blue-700 ${
                    isActive ? 'text-blue-700 after:scale-x-100' : 'text-gray-700 after:scale-x-0'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className="ml-1 whitespace-nowrap rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
            >
              Demander un devis
            </NavLink>
          </div>

          {/* Bouton hamburger : sous lg uniquement */}
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:hidden"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu mobile */}
        {isOpen && (
          <div id="menu-mobile" className="animate-slide-down border-t border-gray-100 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 font-medium transition-colors duration-200 hover:bg-gray-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className="mt-2 rounded-xl bg-blue-600 px-4 py-3.5 text-center font-semibold text-white shadow-md transition-colors duration-300 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Demander un devis
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
