import { Link } from 'react-router-dom'

// Page Services — présentation détaillée de nos 7 domaines d'intervention.
// Contenu réaliste, adapté à une jeune agence : aucune certification,
// aucun client ni résultat commercial inventé.

// ---------------------------------------------------------------------------
// Données : 7 services (mêmes intitulés que sur la page d'accueil)
// ---------------------------------------------------------------------------
const services = [
  {
    title: 'Création de sites web',
    description:
      'Nous créons des sites vitrines modernes et rapides pour présenter votre activité, vos services et vos coordonnées de manière claire et professionnelle.',
    points: [
      'Sites vitrine et pages de présentation',
      'Design responsive adapté aux mobiles',
      'Structure claire, pensée pour vos visiteurs',
    ],
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    title: 'E-commerce',
    description:
      'Nous mettons en place des boutiques en ligne simples et efficaces pour présenter vos produits et permettre à vos clients de commander facilement.',
    points: [
      'Catalogue produits clair et organisé',
      'Panier et parcours de commande simplifiés',
      'Interface facile à gérer au quotidien',
    ],
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    title: 'Applications web',
    description:
      'Nous développons des applications web sur mesure : outils de gestion, tableaux de bord ou espaces réservés, adaptés au fonctionnement de votre entreprise.',
    points: [
      'Outils de gestion adaptés à vos besoins',
      'Tableaux de bord et suivi d’activité',
      'Espaces utilisateurs avec connexion',
    ],
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Applications mobiles',
    description:
      'Nous concevons des applications mobiles simples et intuitives, pensées pour une utilisation quotidienne sur smartphone.',
    points: [
      'Interfaces mobiles fluides et intuitives',
      'Fonctionnalités adaptées à vos besoins',
      'Tests sur différents appareils',
    ],
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Solutions Cloud',
    description:
      'Nous vous aidons à mettre vos outils en ligne : hébergement, mise en ligne et solutions accessibles depuis n’importe quel appareil connecté.',
    points: [
      'Hébergement et mise en ligne',
      'Accès depuis tous vos appareils',
      'Solutions évolutives selon vos besoins',
    ],
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: 'Cybersécurité',
    description:
      'Nous appliquons les bonnes pratiques de sécurité dès la conception : protection des formulaires, des données et des accès de vos applications.',
    points: [
      'Bonnes pratiques dès la conception',
      'Formulaires et données protégés',
      'Mises à jour et suivi régulier',
    ],
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Automatisation',
    description:
      'Nous automatisons vos tâches répétitives — saisie, rappels, organisation — pour vous faire gagner du temps et réduire les erreurs.',
    points: [
      'Analyse de vos tâches répétitives',
      'Outils et scripts sur mesure',
      'Gain de temps au quotidien',
    ],
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

// ---------------------------------------------------------------------------
// Données : notre approche en 4 étapes
// ---------------------------------------------------------------------------
const steps = [
  {
    number: '01',
    title: 'Comprendre',
    description:
      'Nous analysons vos besoins, vos objectifs et les contraintes de votre projet.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Concevoir',
    description:
      'Nous définissons une structure claire et une expérience utilisateur adaptée.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Développer',
    description:
      'Nous transformons la conception en une solution web moderne et responsive.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Accompagner',
    description:
      'Nous restons disponibles pour les améliorations et les évolutions du projet.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
]

// ---------------------------------------------------------------------------
// Données : 4 avantages
// ---------------------------------------------------------------------------
const advantages = [
  {
    title: 'Design moderne',
    description: 'Des interfaces actuelles, claires et agréables à utiliser.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: 'Responsive',
    description: 'Un affichage parfait sur mobile, tablette et ordinateur.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Performance',
    description: 'Des pages rapides et optimisées pour vos visiteurs.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Accompagnement',
    description: 'Une écoute attentive, avant, pendant et après le projet.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

function Services() {
  return (
    <div>
      {/* 1. Hero compact */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-100 opacity-40 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
                Nos services
              </span>
              <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                Des solutions digitales adaptées à vos besoins
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600 lg:mx-0">
                De la création de sites web aux solutions cloud et à
                l’automatisation, nous concevons des outils modernes pour
                accompagner vos projets.
              </p>
            </div>
            {/* Visuel SVG abstrait : composition digitale */}
            <div className="mx-auto w-full max-w-md" aria-hidden="true">
              <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="mb-4 h-4 w-3/4 rounded-full bg-blue-600" />
                <div className="mb-2 h-3 w-full rounded-full bg-gray-100" />
                <div className="mb-6 h-3 w-5/6 rounded-full bg-gray-100" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 rounded-xl bg-blue-50" />
                  <div className="h-16 rounded-xl bg-blue-100" />
                  <div className="h-16 rounded-xl bg-blue-50" />
                </div>
                <div className="absolute -bottom-5 -right-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg sm:-right-5">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services principaux */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Nos 7 domaines d’expertise
            </h2>
            <p className="text-lg text-gray-600">
              Chaque service est pensé pour répondre concrètement aux besoins
              de votre projet.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {services.map((service) => (
              <article
                key={service.title}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl sm:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-colors duration-300 group-hover:bg-blue-100">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mb-5 leading-relaxed text-gray-600">
                  {service.description}
                </p>
                <ul className="mb-6 space-y-3">
                  <li className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                    Ce que nous proposons
                  </li>
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-gray-700">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-auto inline-flex items-center font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  Demander un devis
                  <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </article>
            ))}

            {/* Carte CTA : complète la grille (7 + 1 = 8) */}
            <article className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 shadow-sm sm:p-8">
              <h3 className="mb-3 text-xl font-semibold text-white">
                Un projet en tête ?
              </h3>
              <p className="mb-6 leading-relaxed text-blue-100">
                Discutons de vos besoins : nous vous aiderons à choisir la
                solution la plus adaptée.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition-all duration-300 hover:bg-blue-50"
              >
                Demander un devis
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 3. Notre approche */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Notre approche
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Un projet mené étape par étape
            </h2>
            <p className="text-lg text-gray-600">
              Une méthode simple et transparente, du premier échange jusqu’au suivi.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step) => (
              <li
                key={step.number}
                className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
              >
                <div className="mb-4 text-4xl font-bold text-blue-100 transition-colors duration-300 group-hover:text-blue-200">
                  {step.number}
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-colors duration-300 group-hover:bg-blue-100">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Pourquoi nous choisir */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Pourquoi nous choisir
            </h2>
            <p className="text-lg text-gray-600">
              Des engagements simples, appliqués à chaque projet.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {advantages.map((advantage) => (
              <div
                key={advantage.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-colors duration-300 group-hover:bg-blue-100">
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
      </section>

      {/* 5. CTA final */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border-[24px] border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full border-[32px] border-white/10" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-100">
                Un projet en tête ?
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Construisons votre prochaine solution digitale
              </h2>
              <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-blue-100">
                Parlons de vos besoins et imaginons ensemble une solution
                adaptée à votre projet.
              </p>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl sm:w-auto"
              >
                Demander un devis
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
