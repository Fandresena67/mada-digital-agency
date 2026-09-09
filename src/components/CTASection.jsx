import { Link } from 'react-router-dom'

// Section CTA finale de la page d'accueil
// Panneau bleu arrondi centré : différent de StatsSection (pleine largeur)
// pour éviter la répétition visuelle malgré la même identité bleue.
function CTASection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 px-6 py-14 text-center sm:px-12 sm:py-16 lg:py-20">
          {/* Décorations légères, confinées dans le panneau */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border-[24px] border-white/10" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full border-[32px] border-white/10" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 opacity-40 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.06%22%3E%3Ccircle cx=%222%22 cy=%222%22 r=%222%22/%3E%3C/g%3E%3C/svg%3E')]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-100">
              Votre projet
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Parlons de votre projet digital
            </h2>
            <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-blue-100">
              Vous avez une idée, un projet ou un besoin spécifique ?
              Échangeons ensemble pour trouver une solution digitale adaptée
              à vos objectifs.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl sm:w-auto"
              >
                Demander un devis
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
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
  )
}

export default CTASection
