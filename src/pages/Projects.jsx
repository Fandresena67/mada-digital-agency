import { useState } from 'react'
import { Link } from 'react-router-dom'

// Page Réalisations — portfolio de projets personnels / de démonstration.
// IMPORTANT : aucun client ni résultat commercial inventé.
// Les boutons "Voir le projet" restent en interne (/projects) car
// aucune URL publique réelle n'existe pour ces projets de démonstration.

// ---------------------------------------------------------------------------
// Données : 5 projets (descriptions détaillées propres à cette page)
// ---------------------------------------------------------------------------
const projects = [
  {
    title: 'Fandresena Hôtel',
    category: 'Réservation / Web',
    filter: 'web',
    type: 'Projet personnel / démonstration',
    description:
      'Application web de réservation permettant de présenter des hébergements et de gérer une demande de réservation à travers une interface moderne.',
    technologies: ['React', 'JavaScript', 'Node.js'],
    gradient: 'from-amber-500 to-orange-600',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5h1.5a1.5 1.5 0 013 0V21M9 7h6" />
      </svg>
    ),
  },
  {
    title: 'MADA SHOP',
    category: 'E-commerce',
    filter: 'ecommerce',
    type: 'Projet personnel / démonstration',
    description:
      'Interface e-commerce moderne conçue pour présenter des produits et proposer une expérience de navigation simple et responsive.',
    technologies: ['React', 'Tailwind CSS', 'JavaScript'],
    gradient: 'from-emerald-500 to-teal-600',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    title: 'Weather App',
    category: 'Application web',
    filter: 'application',
    type: 'Projet personnel / démonstration',
    description:
      'Application météo utilisant une API pour afficher les informations météorologiques selon la localisation recherchée.',
    technologies: ['JavaScript', 'API', 'HTML', 'CSS'],
    gradient: 'from-sky-500 to-blue-600',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: 'Todo List',
    category: 'Application web',
    filter: 'application',
    type: 'Projet personnel / démonstration',
    description:
      'Application de gestion de tâches permettant d’organiser les tâches dans différents états et de suivre leur évolution.',
    technologies: ['JavaScript', 'LocalStorage', 'HTML', 'CSS'],
    gradient: 'from-violet-500 to-purple-600',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Application de gestion',
    category: 'Gestion',
    filter: 'gestion',
    type: 'Projet personnel / démonstration',
    description:
      'Application web de démonstration destinée à illustrer la conception d’une interface de gestion simple et structurée.',
    technologies: ['JavaScript', 'Technologies web'],
    gradient: 'from-slate-600 to-slate-800',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

const filters = [
  { key: 'all', label: 'Tous' },
  { key: 'web', label: 'Web' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'application', label: 'Application' },
  { key: 'gestion', label: 'Gestion' },
]

// ---------------------------------------------------------------------------
// Données : technologies réellement utilisées (descriptions factuelles,
// sans affirmation de niveau d'expertise)
// ---------------------------------------------------------------------------
const skills = [
  { name: 'HTML', description: 'Structure des pages et des interfaces des projets.' },
  { name: 'CSS', description: 'Mise en forme et adaptation visuelle des pages.' },
  { name: 'JavaScript', description: 'Interactions et logique des applications réalisées.' },
  { name: 'React', description: 'Construction d’interfaces à base de composants réutilisables.' },
  { name: 'Node.js', description: 'Logique côté serveur explorée dans les projets web.' },
  { name: 'Tailwind CSS', description: 'Stylisation rapide et responsive des interfaces.' },
  { name: 'APIs', description: 'Récupération de données externes, comme la météo.' },
  { name: 'LocalStorage', description: 'Sauvegarde locale des données dans le navigateur.' },
]

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const countFor = (key) =>
    key === 'all' ? projects.length : projects.filter((p) => p.filter === key).length

  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.filter === activeFilter)

  return (
    <div>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-100 opacity-40 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="min-w-0 text-center lg:text-left">
              <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
                Nos réalisations
              </span>
              <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                Des projets qui donnent vie aux idées
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600 lg:mx-0">
                Découvrez une sélection de projets personnels et de
                démonstration réalisés pour explorer différentes solutions
                digitales et technologies web.
              </p>
            </div>
            {/* Visuel SVG : éditeur de code */}
            <div className="mx-auto w-full max-w-md min-w-0" aria-hidden="true">
              <div className="rounded-2xl bg-gray-900 p-6 shadow-xl sm:p-8">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <div className="ml-3 font-mono text-xs text-gray-400">projet.jsx</div>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="h-3 w-2/3 rounded bg-blue-400" />
                  <div className="ml-4 h-3 w-1/2 rounded bg-gray-600" />
                  <div className="ml-4 h-3 w-3/4 rounded bg-emerald-400" />
                  <div className="ml-4 h-3 w-1/3 rounded bg-gray-600" />
                  <div className="h-3 w-1/2 rounded bg-violet-400" />
                  <div className="ml-4 h-3 w-2/3 rounded bg-gray-600" />
                  <div className="h-3 w-1/4 rounded bg-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 + 3. Filtres et grille des projets */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filtres : défilement interne sur mobile, sans scroll global */}
          <div className="mb-10 sm:mb-12">
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
              {filters.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveFilter(item.key)}
                  aria-pressed={activeFilter === item.key}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    activeFilter === item.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item.label}
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${activeFilter === item.key ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {countFor(item.key)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {visibleProjects.map((project) => (
              <article
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" aria-hidden="true" />
                  <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10" aria-hidden="true" />
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    {project.icon}
                  </div>
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-2 inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {project.type}
                  </span>
                  <h2 className="mb-2 text-xl font-semibold text-gray-900">
                    {project.title}
                  </h2>
                  <p className="mb-4 leading-relaxed text-gray-600">
                    {project.description}
                  </p>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/projects"
                    className="mt-auto inline-flex w-fit items-center rounded-lg font-semibold text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Voir le projet
                    <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}

            {/* Carte CTA : complète la grille et invite au contact.
                Affichée quel que soit le filtre actif. */}
            <article className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 shadow-sm sm:p-8">
              <h2 className="mb-3 text-xl font-semibold text-white">
                Votre projet ici ?
              </h2>
              <p className="mb-6 leading-relaxed text-blue-100">
                Vous avez une idée à transformer en solution digitale ?
                Présentez-nous votre besoin et échangeons ensemble.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition-all duration-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
              >
                Demander un devis
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Compétences mobilisées */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Savoir-faire
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Compétences mobilisées
            </h2>
            <p className="text-lg text-gray-600">
              Les technologies réellement utilisées dans la réalisation de ces projets.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <h3 className="mb-2 font-semibold text-gray-900">{skill.name}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border-[24px] border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full border-[32px] border-white/10" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-100">
                Votre projet
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Votre prochaine idée peut devenir une solution digitale
              </h2>
              <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-blue-100">
                Vous avez un projet à développer ? Échangeons sur vos besoins
                et construisons une solution adaptée.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl sm:w-auto"
                >
                  Demander un devis
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

export default Projects
