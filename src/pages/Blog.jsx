import { useState } from 'react'
import { Link } from 'react-router-dom'

// Page Blog — articles de démonstration (données statiques, aucun backend).
// IMPORTANT : contenu fictif de démonstration. Aucun faux auteur,
// commentaire, compteur de vues ou abonné. Les boutons "Lire l'article"
// affichent un message au lieu de mener vers des pages inexistantes.

// ---------------------------------------------------------------------------
// Données : 6 articles de démonstration
// ---------------------------------------------------------------------------
const articles = [
  {
    category: 'Développement Web',
    title: 'Pourquoi avoir un site web responsive est essentiel aujourd’hui',
    summary:
      'Découvrez pourquoi une expérience adaptée au mobile est devenue indispensable pour offrir une navigation agréable sur tous les appareils.',
    date: '10 mars 2026',
    gradient: 'from-blue-500 to-blue-700',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    category: 'JavaScript',
    title: 'JavaScript : comprendre son rôle dans le développement web moderne',
    summary:
      'Comprenez comment JavaScript permet de créer des interfaces web interactives et dynamiques.',
    date: '24 février 2026',
    gradient: 'from-amber-500 to-orange-600',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    category: 'React',
    title: 'Pourquoi utiliser React pour créer une application web',
    summary:
      'Découvrez les principes qui rendent React intéressant pour construire des interfaces modernes et réutilisables.',
    date: '12 février 2026',
    gradient: 'from-sky-500 to-cyan-600',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    category: 'Sécurité',
    title: 'Les bonnes pratiques essentielles pour sécuriser un site web',
    summary:
      'Quelques principes simples à prendre en compte pour améliorer la sécurité d’une application web.',
    date: '28 janvier 2026',
    gradient: 'from-emerald-500 to-teal-600',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    category: 'Performance',
    title: 'Comment améliorer les performances d’une application web',
    summary:
      'Découvrez plusieurs pistes pour rendre une application plus rapide et offrir une meilleure expérience utilisateur.',
    date: '15 janvier 2026',
    gradient: 'from-violet-500 to-purple-600',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    category: 'Transformation digitale',
    title: 'Transformer une idée en solution digitale',
    summary:
      'Les principales étapes pour passer d’une idée à une solution digitale structurée et adaptée à un besoin réel.',
    date: '6 janvier 2026',
    gradient: 'from-slate-600 to-slate-800',
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
]

const categories = [
  'Tous',
  'Développement Web',
  'JavaScript',
  'React',
  'Sécurité',
  'Performance',
  'Transformation digitale',
]

function Blog() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [articleNotice, setArticleNotice] = useState('')
  const [email, setEmail] = useState('')
  const [newsletterMessage, setNewsletterMessage] = useState('')

  const countFor = (category) =>
    category === 'Tous'
      ? articles.length
      : articles.filter((article) => article.category === category).length

  const visibleArticles =
    activeCategory === 'Tous'
      ? articles
      : articles.filter((article) => article.category === activeCategory)

  // Newsletter de démonstration : aucun envoi, aucune donnée stockée.
  const handleNewsletterSubmit = (event) => {
    event.preventDefault()
    setNewsletterMessage(
      'Fonctionnalité de démonstration — inscription disponible prochainement.'
    )
  }

  return (
    <div>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-100 opacity-40 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="min-w-0 text-center lg:text-left">
              <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
                Notre blog
              </span>
              <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                Conseils, idées et actualités digitales
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600 lg:mx-0">
                Découvrez des contenus autour du développement web, des
                technologies digitales, de la performance et de la création
                de solutions modernes.
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400 lg:mx-0">
                Contenus de démonstration — sans équipe éditoriale réelle.
              </p>
            </div>
            {/* Visuel SVG : article de blog */}
            <div className="mx-auto w-full max-w-md min-w-0" aria-hidden="true">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
                <div className="mb-5 h-28 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700" />
                <div className="mb-3 h-4 w-2/5 rounded-full bg-blue-100" />
                <div className="mb-4 h-5 w-4/5 rounded-full bg-gray-800" />
                <div className="mb-2 h-3 w-full rounded-full bg-gray-100" />
                <div className="mb-2 h-3 w-full rounded-full bg-gray-100" />
                <div className="h-3 w-3/5 rounded-full bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 + 3. Catégories et articles */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filtres : défilement interne sur mobile, sans scroll global */}
          <div className="mb-10 sm:mb-12">
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category)
                    setArticleNotice('')
                  }}
                  aria-pressed={activeCategory === category}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${activeCategory === category ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {countFor(category)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Message d'information pour les articles de démonstration */}
          {articleNotice && (
            <div role="status" className="mx-auto mb-8 max-w-2xl rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-center text-sm font-medium text-blue-800">
              {articleNotice}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {visibleArticles.map((article) => (
              <article
                key={article.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${article.gradient}`}>
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" aria-hidden="true" />
                  <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10" aria-hidden="true" />
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    {article.icon}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {article.category}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                      Démo
                    </span>
                  </div>
                  <h2 className="mb-2 text-lg font-semibold leading-snug text-gray-900">
                    {article.title}
                  </h2>
                  <p className="mb-4 flex-1 leading-relaxed text-gray-600">
                    {article.summary}
                  </p>
                  <div className="mb-5 flex items-center gap-2 text-sm text-gray-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{article.date} (démonstration)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setArticleNotice(`« ${article.title} » — Article de démonstration, contenu complet à venir.`)}
                    className="inline-flex w-fit items-center rounded-lg font-semibold text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Lire l’article
                    <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Newsletter (démonstration, sans backend) */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-3xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm sm:px-12">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Restez informé
            </span>
            <h2 className="mb-3 text-3xl font-bold text-gray-900">
              Recevez nos prochains contenus
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Une future newsletter pourra vous permettre de recevoir nos
              conseils et actualités digitales.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Votre adresse email"
                className="min-h-[3.25rem] flex-1 rounded-xl border border-gray-200 bg-gray-50 px-5 text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-xl bg-blue-600 px-8 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700"
              >
                S’inscrire
              </button>
            </form>
            {newsletterMessage && (
              <p role="status" className="mt-5 rounded-xl bg-blue-50 px-5 py-3 text-sm font-medium text-blue-800">
                {newsletterMessage}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 5. CTA final */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border-[24px] border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full border-[32px] border-white/10" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-100">
                Une question ?
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Besoin d’un accompagnement digital ?
              </h2>
              <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-blue-100">
                Parlons de votre projet et voyons ensemble quelle solution
                pourrait répondre à vos besoins.
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
                  Découvrir nos services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog
