// Section Statistiques de la page d'accueil
// IMPORTANT : chiffres de démonstration pour le design du site,
// à ne pas présenter comme des statistiques commerciales réelles.
const stats = [
  {
    value: '10+',
    label: 'Projets réalisés',
    icon: (
      <svg className="h-6 w-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      </svg>
    ),
  },
  {
    value: '7',
    label: 'Domaines d’expertise',
    icon: (
      <svg className="h-6 w-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    value: '100%',
    label: 'Responsive',
    icon: (
      <svg className="h-6 w-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    value: '24/7',
    label: 'Disponibilité',
    icon: (
      <svg className="h-6 w-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 py-16 sm:py-20">
      {/* Décorations subtiles */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-100">
            Nos chiffres
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Des solutions pensées pour faire la différence
          </h2>
          <p className="text-lg leading-relaxed text-blue-100">
            Notre objectif est de créer des expériences digitales modernes,
            accessibles et adaptées aux besoins de chaque projet.
          </p>
        </div>

        {/* Statistiques : 2 colonnes mobile/tablette, 4 desktop */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-2xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 sm:p-8"
            >
              <div className="mb-4 flex justify-center">{stat.icon}</div>
              <div className="mb-2 text-4xl font-bold text-white sm:text-5xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium uppercase tracking-wide text-blue-100 sm:text-base sm:normal-case sm:tracking-normal">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mention discrète */}
        <p className="mt-8 text-center text-xs text-blue-200/70">
          Chiffres de démonstration — à des fins de présentation du design.
        </p>
      </div>
    </section>
  )
}

export default StatsSection
