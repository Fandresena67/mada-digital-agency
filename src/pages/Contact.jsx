import { useState } from 'react'
import { Link } from 'react-router-dom'

// Page Contact — formulaire 100 % frontend (démonstration d'interface).
// IMPORTANT : aucun envoi réel (pas de fetch, pas d'API, pas de backend,
// aucune donnée stockée). La soumission affiche un message de succès
// puis réinitialise le formulaire.

// ---------------------------------------------------------------------------
// Données : options du select "Type de projet"
// ---------------------------------------------------------------------------
const projectTypes = [
  'Site web',
  'E-commerce',
  'Application web',
  'Application mobile',
  'Cloud',
  'Cybersécurité',
  'Automatisation',
  'Autre',
]

const initialForm = {
  name: '',
  email: '',
  subject: '',
  projectType: 'Site web',
  message: '',
}

// ---------------------------------------------------------------------------
// Données : étapes "Comment ça se passe ?"
// ---------------------------------------------------------------------------
const processSteps = [
  {
    number: '01',
    title: 'Votre demande',
    description: 'Vous nous présentez votre besoin et votre objectif.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Échange',
    description: 'Nous échangeons sur les fonctionnalités et les possibilités du projet.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Proposition',
    description: 'Nous définissons ensemble une direction adaptée au projet.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

// ---------------------------------------------------------------------------
// Données : FAQ (textes exacts demandés)
// ---------------------------------------------------------------------------
const faqItems = [
  {
    question: 'Quels types de projets pouvez-vous développer ?',
    answer:
      'Nous pouvons travailler sur des sites web, des interfaces e-commerce, des applications web et différents projets digitaux selon les besoins.',
  },
  {
    question: 'Travaillez-vous uniquement avec des clients à Madagascar ?',
    answer:
      'Non. Les projets peuvent être réalisés à distance selon les besoins et les possibilités du projet.',
  },
  {
    question: 'Puis-je demander un projet personnalisé ?',
    answer:
      'Oui. Chaque projet peut être étudié selon ses fonctionnalités, ses objectifs et ses contraintes.',
  },
  {
    question: 'Comment commencer un projet ?',
    answer:
      'Il suffit de nous présenter votre idée ou votre besoin afin de commencer une première discussion.',
  },
  {
    question: 'Est-ce que le formulaire envoie réellement mon message ?',
    answer:
      'Dans cette version du site, le formulaire fonctionne comme démonstration côté interface. L’envoi réel sera connecté au backend ou à un service d’envoi ultérieurement.',
  },
]

const inputClasses =
  'min-h-[3.25rem] w-full rounded-xl border border-gray-200 bg-gray-50 px-5 text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [successMessage, setSuccessMessage] = useState('')
  // Index des questions FAQ ouvertes (plusieurs peuvent être ouvertes).
  const [openFaq, setOpenFaq] = useState([])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  // Démonstration d'interface : pas d'envoi, pas de stockage.
  const handleSubmit = (event) => {
    event.preventDefault()
    setSuccessMessage(
      'Merci pour votre demande. Votre message a bien été préparé. Nous vous répondrons prochainement.'
    )
    setForm(initialForm)
  }

  const toggleFaq = (index) => {
    setOpenFaq((previous) =>
      previous.includes(index)
        ? previous.filter((i) => i !== index)
        : [...previous, index]
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
                Contact
              </span>
              <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                Parlons de votre projet
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600 lg:mx-0">
                Une idée, un besoin ou un projet digital ? Envoyez-nous votre
                demande et échangeons sur la solution la plus adaptée.
              </p>
            </div>
            {/* Visuel SVG : conversation digitale */}
            <div className="mx-auto w-full max-w-md min-w-0" aria-hidden="true">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
                <div className="mb-4 max-w-[80%] rounded-2xl rounded-tl-sm bg-gray-100 p-4">
                  <div className="h-3 w-full rounded-full bg-gray-300" />
                  <div className="mt-2 h-3 w-2/3 rounded-full bg-gray-300" />
                </div>
                <div className="mb-4 ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600 p-4">
                  <div className="h-3 w-full rounded-full bg-white/80" />
                  <div className="mt-2 h-3 w-1/2 rounded-full bg-white/80" />
                </div>
                <div className="max-w-[70%] rounded-2xl rounded-tl-sm bg-gray-100 p-4">
                  <div className="h-3 w-full rounded-full bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 + 3. Informations + formulaire */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
            {/* Informations de contact */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="mb-1 text-lg font-semibold text-gray-900">Email</h2>
                <a
                  href="mailto:fandresenanatolo@gmail.com"
                  className="rounded break-all font-medium text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  fandresenanatolo@gmail.com
                </a>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="mb-1 text-lg font-semibold text-gray-900">Disponibilité</h2>
                <p className="text-gray-600">
                  Disponible pour échanger sur vos projets digitaux.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="mb-1 text-lg font-semibold text-gray-900">Zone</h2>
                <p className="text-gray-600">Madagascar — Projets à distance</p>
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8 lg:p-10"
              >
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  Envoyez votre demande
                </h2>
                <p className="mb-8 text-gray-600">
                  Remplissez ce formulaire : nous reviendrons vers vous pour
                  échanger sur votre projet.
                </p>

                {successMessage && (
                  <p role="status" className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-800 sm:text-base">
                    {successMessage}
                  </p>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-gray-700">
                      Nom complet *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                      autoComplete="name"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-gray-700">
                      Adresse email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="vous@exemple.com"
                      autoComplete="email"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold text-gray-700">
                      Sujet *
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Objet de votre demande"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-type" className="mb-2 block text-sm font-semibold text-gray-700">
                      Type de projet
                    </label>
                    <select
                      id="contact-type"
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className={`${inputClasses} cursor-pointer`}
                    >
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-gray-700">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre besoin, vos objectifs et vos délais si vous en avez…"
                      className={`${inputClasses} min-h-[10rem] resize-y py-4`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-7 inline-flex min-h-[3.5rem] w-full items-center justify-center rounded-xl bg-blue-600 px-8 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto"
                >
                  Envoyer ma demande
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
                <p className="mt-4 text-xs text-gray-400">
                  Démonstration d’interface — aucun message n’est réellement envoyé pour le moment.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Comment ça se passe ? */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
              Processus
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Comment ça se passe ?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
              >
                <div className="mb-2 text-4xl font-bold text-blue-100">{step.number}</div>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
              FAQ
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Questions fréquentes
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaq.includes(index)
              return (
                <div
                  key={item.question}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${isOpen ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200 bg-white'}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                  >
                    <span>{item.question}</span>
                    <svg
                      className={`h-5 w-5 shrink-0 text-blue-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <p id={`faq-panel-${index}`} className="px-6 pb-6 leading-relaxed text-gray-600">
                      {item.answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. CTA final */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border-[24px] border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full border-[32px] border-white/10" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-100">
                Prêt à commencer ?
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Donnons vie à votre projet
              </h2>
              <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-blue-100">
                Présentez-nous votre idée et construisons ensemble une
                solution digitale adaptée.
              </p>
              <Link
                to="/services"
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl sm:w-auto"
              >
                Retour aux services
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

export default Contact
