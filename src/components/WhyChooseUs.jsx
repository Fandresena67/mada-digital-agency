// Section "Pourquoi nous choisir ?" de la page d'accueil
// Disposition volontairement différente des Services : visuel à gauche, contenu à droite
const advantages = [
  {
    title: 'Solutions modernes',
    description:
      'Utilisation de technologies modernes pour créer des solutions adaptées aux besoins actuels.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Design professionnel',
    description:
      'Des interfaces modernes, claires et agréables à utiliser.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    title: 'Responsive',
    description:
      'Des solutions adaptées aux smartphones, tablettes et ordinateurs.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Performance',
    description:
      'Des interfaces rapides et optimisées pour offrir une bonne expérience utilisateur.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Accompagnement',
    description:
      'Une approche basée sur l’écoute et la compréhension des besoins du projet.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Sécurité',
    description:
      'Prise en compte des bonnes pratiques de sécurité lors de la conception.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
]

// Barres de progression décoratives pour le visuel de gauche (valeurs illustratives)
const skills = [
  { label: 'Design & ergonomie', value: 95 },
  { label: 'Performance', value: 90 },
  { label: 'Sécurité', value: 88 },
]

function WhyChooseUs() {
  return (
    <section className="overflow-hidden bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Colonne visuelle */}
          <div className="animate-fade-in-up relative">
            <div className="pointer-events-none absolute -left-8 -top-8 h-48 w-48 rounded-full bg-blue-100 opacity-50 blur-3xl" />
            <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
              <span className="mb-2 block text-sm font-semibold uppercase tracking-wide text-blue-600">
                Notre méthode
              </span>
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                La qualité au cœur de chaque projet
              </h3>

              <ul className="mb-8 space-y-4">
                {['Écoute de vos besoins', 'Design soigné et moderne', 'Suivi après livraison'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-5 border-t border-gray-100 pt-6">
                {skills.map((skill) => (
                  <div key={skill.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">{skill.label}</span>
                      <span className="font-bold text-blue-600">{skill.value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                        style={{ width: `${skill.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badge flottant */}
            <div className="animate-bounce-slow absolute -bottom-6 right-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-xl sm:right-6">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-500">Sur mesure</div>
            </div>
          </div>

          {/* Colonne contenu */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Pourquoi nous choisir
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Une approche pensée pour votre réussite
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-gray-600">
              Nous combinons technologie, créativité et compréhension de vos
              besoins pour créer des solutions digitales utiles, modernes et
              performantes.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {advantages.map((advantage) => (
                <div
                  key={advantage.title}
                  className="group rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 transition-colors duration-300 group-hover:bg-blue-100">
                    {advantage.icon}
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    {advantage.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
