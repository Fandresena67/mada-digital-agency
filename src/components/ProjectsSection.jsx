import { useState } from 'react'
import { Link } from 'react-router-dom'

// IMPORTANT : projets personnels / de démonstration.
// Ils illustrent notre savoir-faire et ne doivent jamais être
// présentés comme des commandes de vrais clients.
const projects = [
  {
    title: 'Fandresena Hôtel',
    category: 'Réservation / Web',
    filter: 'web',
    description:
      'Application web de réservation d’hôtel moderne et responsive.',
    technologies: ['React', 'JavaScript', 'Node.js'],
    gradient: 'from-amber-500 to-orange-600',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5h1.5a1.5 1.5 0 013 0V21M9 7h6" />
      </svg>
    ),
  },
  {
    title: 'MADA SHOP',
    category: 'E-commerce',
    filter: 'ecommerce',
    description:
      'Interface moderne de boutique en ligne permettant de présenter des produits.',
    technologies: ['React', 'Tailwind CSS', 'JavaScript'],
    gradient: 'from-emerald-500 to-teal-600',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    title: 'Weather App',
    category: 'Application web',
    filter: 'application',
    description:
      'Application météo utilisant une API pour afficher les conditions météorologiques.',
    technologies: ['JavaScript', 'API', 'HTML', 'CSS'],
    gradient: 'from-sky-500 to-blue-600',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: 'Todo List',
    category: 'Application web',
    filter: 'application',
    description:
      'Application de gestion des tâches avec organisation et statistiques.',
    technologies: ['JavaScript', 'LocalStorage', 'HTML', 'CSS'],
    gradient: 'from-violet-500 to-purple-600',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Application de gestion',
    category: 'Gestion',
    filter: 'gestion',
    description:
      'Application permettant de gérer des informations de manière structurée.',
    technologies: ['JavaScript', 'Technologies web'],
    gradient: 'from-slate-600 to-slate-800',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all')

  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.filter === activeFilter)

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Nos réalisations
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Des projets qui donnent vie aux idées
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez quelques projets web et applications développés pour
            démontrer notre savoir-faire dans le domaine du digital.
          </p>
          <p className="mt-3 text-sm text-gray-400">
            Projets personnels et de démonstration — vitrine de notre savoir-faire.
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-10 flex flex-wrap justify-center gap-3 sm:mb-12">
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveFilter(item.key)}
              aria-pressed={activeFilter === item.key}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeFilter === item.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Grille des projets */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visibleProjects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Visuel */}
              <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10" />
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  {project.icon}
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800">
                  {project.category}
                </span>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {project.title}
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600">
                  {project.description}
                </p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  to="/projects"
                  className="inline-flex items-center font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  Voir le projet
                  <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
          >
            Voir toutes nos réalisations
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
