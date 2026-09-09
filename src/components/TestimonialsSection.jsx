// Section Témoignages de la page d'accueil
// IMPORTANT : témoignages fictifs de démonstration.
// Ils illustrent le design en attendant de vrais témoignages clients.
const testimonials = [
  {
    name: 'Client Démo',
    initials: 'CD',
    role: 'Entrepreneur',
    quote:
      'Une solution moderne, claire et parfaitement adaptée à nos besoins. L’expérience utilisateur est vraiment agréable.',
  },
  {
    name: 'Utilisateur Démo',
    initials: 'UD',
    role: 'Responsable de projet',
    quote:
      'Le projet présente une interface professionnelle et responsive. La navigation est simple et intuitive.',
  },
  {
    name: 'Partenaire Démo',
    initials: 'PD',
    role: 'Porteur de projet',
    quote:
      'Une approche sérieuse avec une attention particulière portée au design, à la performance et aux besoins du projet.',
  },
]

function Stars() {
  return (
    <div className="flex gap-1" aria-label="Note : 5 étoiles sur 5 (démonstration)">
      {[0, 1, 2, 3, 4].map((star) => (
        <svg key={star} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Témoignages
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Ce que nos utilisateurs pourraient dire
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Une présentation de témoignages fictifs pour illustrer
            l’expérience et la qualité de nos solutions digitales.
          </p>
        </div>

        {/* Cartes : 1 colonne mobile, 2 tablette, 3 desktop */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
            >
              <div className="mb-4 flex items-center justify-between">
                <svg className="h-8 w-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <Stars />
              </div>

              <blockquote className="mb-6 flex-1 leading-relaxed text-gray-600">
                « {testimonial.quote} »
              </blockquote>

              <figcaption className="flex items-center gap-4 border-t border-gray-100 pt-5">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-base font-bold text-white"
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Mention d'honnêteté */}
        <p className="mt-8 text-center text-xs text-gray-400">
          Témoignages de démonstration — à remplacer par de vrais témoignages clients.
        </p>
      </div>
    </section>
  )
}

export default TestimonialsSection
