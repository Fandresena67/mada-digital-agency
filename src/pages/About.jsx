import { Link } from 'react-router-dom'

// Page À propos — présentation de l'agence.
// Contenu honnête : aucun client, chiffre, membre d'équipe,
// certification ou récompense inventé.

// ---------------------------------------------------------------------------
// Données : 3 valeurs de la mission
// ---------------------------------------------------------------------------
const missionValues = [
  {
    title: 'Simplicité',
    description: 'Des solutions claires, faciles à comprendre et à utiliser.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description: 'Des technologies modernes au service de vos idées.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Adaptabilité',
    description: 'Des solutions ajustées aux objectifs de chaque projet.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H2m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
]

// ---------------------------------------------------------------------------
// Données : 4 valeurs de l'agence
// ---------------------------------------------------------------------------
const values = [
  {
    number: '01',
    title: 'Qualité',
    description:
      'Nous accordons une attention particulière à la clarté, au design et à la qualité du résultat final.',
  },
  {
    number: '02',
    title: 'Écoute',
    description:
      'Nous cherchons à comprendre les besoins avant de proposer une solution.',
  },
  {
    number: '03',
    title: 'Transparence',
    description:
      'Nous privilégions une communication claire sur les possibilités et les limites du projet.',
  },
  {
    number: '04',
    title: 'Évolution',
    description:
      'Une solution digitale doit pouvoir évoluer avec les besoins du projet.',
  },
]

// ---------------------------------------------------------------------------
// Données : méthode de travail en 4 étapes
// ---------------------------------------------------------------------------
const methodSteps = [
  { number: '01', title: 'Écouter', description: 'Comprendre le besoin et les objectifs.' },
  { number: '02', title: 'Planifier', description: 'Définir les fonctionnalités et la structure du projet.' },
  { number: '03', title: 'Réaliser', description: 'Développer une solution moderne et responsive.' },
  { number: '04', title: 'Améliorer', description: 'Corriger, optimiser et faire évoluer la solution.' },
]

// ---------------------------------------------------------------------------
// Données : domaines d'expertise (uniquement ceux déjà présents sur le site)
// ---------------------------------------------------------------------------
const expertise = [
  'Création de sites web',
  'E-commerce',
  'Applications web',
  'Applications mobiles',
  'Solutions Cloud',
  'Cybersécurité',
  'Automatisation',
]

function About() {
  return (
    <div>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-100 opacity-40 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
                À propos de nous
              </span>
              <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                Une agence digitale tournée vers vos projets
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600 lg:mx-0">
                MADA DIGITAL AGENCY accompagne la création de solutions
                digitales modernes, accessibles et adaptées aux besoins de
                chaque projet.
              </p>
            </div>
            {/* Visuel abstrait : fenêtre d'agence digitale */}
            <div className="mx-auto w-full max-w-md" aria-hidden="true">
              <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-lg font-bold text-white">
                    M
                  </div>
                  <div>
                    <div className="h-3.5 w-40 rounded-full bg-gray-800" />
                    <div className="mt-2 h-3 w-28 rounded-full bg-blue-200" />
                  </div>
                </div>
                <div className="mb-2 h-3 w-full rounded-full bg-gray-100" />
                <div className="mb-6 h-3 w-4/6 rounded-full bg-gray-100" />
                <div className="flex gap-3">
                  <div className="h-10 flex-1 rounded-xl bg-blue-600" />
                  <div className="h-10 flex-1 rounded-xl border-2 border-blue-200" />
                </div>
                <div className="absolute -bottom-5 -right-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg sm:-right-5">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Notre mission */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
                Notre mission
              </span>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Notre mission
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Notre mission est de transformer les idées en solutions
                digitales utiles, modernes et simples à utiliser. Nous
                privilégions une approche claire, progressive et adaptée aux
                objectifs de chaque projet.
              </p>
              <div className="space-y-5">
                {missionValues.map((value) => (
                  <div key={value.title} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Visuel : carte checklist */}
            <div className="relative" aria-hidden="true">
              <div className="pointer-events-none absolute -top-8 right-0 h-48 w-48 rounded-full bg-blue-100 opacity-50 blur-3xl" />
              <div className="relative rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="mb-6 text-sm font-semibold uppercase tracking-wide text-gray-400">
                  Ce qui guide nos projets
                </div>
                <ul className="space-y-4">
                  {[
                    'Des interfaces claires et modernes',
                    'Un code propre et maintenable',
                    'Un suivi après la livraison',
                    'Une communication simple et directe',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100">
                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="font-medium text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Notre vision */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 px-6 py-12 text-center sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-100">
                Notre vision
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Notre vision
              </h2>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-blue-100">
                Nous souhaitons contribuer à une transformation numérique plus
                accessible en développant des expériences digitales modernes
                et adaptées aux réalités des projets locaux et internationaux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Nos valeurs */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Nos valeurs
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Ce qui guide notre travail
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {values.map((value) => (
              <div
                key={value.number}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg sm:p-8"
              >
                <div className="mb-4 text-4xl font-bold text-blue-100 transition-colors duration-300 group-hover:text-blue-200">
                  {value.number}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Notre méthode de travail */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Méthode de travail
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Comment nous avançons ensemble
            </h2>
          </div>
          {/* Horizontale sur desktop (ligne de liaison), verticale sur mobile */}
          <ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="absolute left-0 right-0 top-8 hidden border-t-2 border-dashed border-blue-200 lg:block" aria-hidden="true" />
            {methodSteps.map((step) => (
              <li key={step.number} className="relative rounded-2xl border border-gray-200 bg-white p-6 text-center sm:p-8">
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white shadow-lg">
                  {step.number}
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

      {/* 6. Domaines d'expertise */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Expertise
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Nos domaines d’expertise
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {expertise.map((item) => (
              <Link
                key={item}
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-3 font-medium text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA final */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border-[24px] border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full border-[32px] border-white/10" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-100">
                Travaillons ensemble
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Vous avez un projet digital ?
              </h2>
              <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-blue-100">
                Échangeons sur votre idée et voyons comment construire une
                solution adaptée à vos besoins.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl sm:w-auto"
                >
                  Nous contacter
                </Link>
                <Link
                  to="/services"
                  className="inline-flex w-full items-center justify-center rounded-xl border-2 border-white/60 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 sm:w-auto"
                >
                  Voir nos services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
