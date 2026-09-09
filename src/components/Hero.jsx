import { Link } from 'react-router-dom'

// Composant Hero de la page d'accueil
// Design : 2 colonnes sur desktop, empilé sur mobile
function Hero() {
  // Données de démonstration pour le visuel (pas de vrais clients)
  const demoStats = [
    {
      label: 'Projets réalisés',
      value: '+10',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
      ),
    },
    {
      label: 'Responsive',
      value: '100%',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Disponibilité',
      value: '24/7',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ]

  // Projets personnels / démonstration uniquement — ne pas présenter comme des clients réels
  const demoProjects = [
    { label: 'Site E-commerce MADA SHOP', status: 'En production', color: 'green' },
    { label: 'App Gestion Hôtel Fandresena', status: 'Développement', color: 'blue' },
    { label: 'Dashboard Analytics', status: 'Planification', color: 'yellow' },
  ]

  const statusStyles = {
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Fond décoratif léger */}
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%233b82f6%22 fill-opacity=%220.04%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-blue-100 opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-100 opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Colonne texte */}
          <div className="animate-fade-in-up min-w-0 text-center lg:text-left">
            <span className="mb-6 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
              MADA DIGITAL AGENCY — Madagascar
            </span>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Transformons vos idées
              <br />
              <span className="text-blue-600">en solutions digitales</span>
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl lg:mx-0">
              Nous accompagnons les entreprises dans leur transformation numérique
              grâce à des solutions web modernes et performantes.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                to="/services"
                className="group inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
              >
                Découvrir nos services
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border-2 border-blue-600 bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl"
              >
                Demander un devis
              </Link>
            </div>

            {/* Preuves visuelles */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500 lg:justify-start">
              {['100% Responsive', 'Performance optimisée', 'Sécurité renforcée'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne visuel : mockup dashboard */}
          <div className="animate-fade-in-up min-w-0" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-400 opacity-20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
                {/* Barre navigateur */}
                <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <div className="ml-4 min-w-0 flex-1 truncate font-mono text-sm text-gray-500">
                    dashboard.mada-digital.mg
                  </div>
                </div>

                <div className="space-y-4 p-6 sm:p-8">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {demoStats.map((stat) => (
                      <div key={stat.label} className="rounded-xl bg-blue-50 p-3 text-center sm:p-4">
                        <div className="mb-1 flex justify-center">{stat.icon}</div>
                        <div className="text-2xl font-bold text-blue-600 sm:text-3xl">{stat.value}</div>
                        <div className="text-xs text-gray-500 sm:text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Liste projets démo */}
                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    {demoProjects.map((project) => (
                      <div key={project.label} className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 p-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </div>
                          <span className="min-w-0 truncate font-medium text-gray-900">{project.label}</span>
                        </div>
                        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[project.color]}`}>
                          {project.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Badge flottant — largeur auto pour éviter tout dépassement */}
              <div className="animate-bounce-slow absolute -bottom-6 right-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:right-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Lancement rapide</div>
                    <div className="text-sm text-gray-500">Délai moyen : 2 semaines</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
