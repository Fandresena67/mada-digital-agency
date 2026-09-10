import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ADMIN_TOKEN_KEY, API_BASE_URL } from '../lib/api'

// Page Admin Login — connexion de l'administrateur (POST /api/admin/login).
// En cas de succès : token stocké sous "admin_token" puis redirection vers
// /admin/dashboard (page créée à l'étape suivante : URL temporairement
// sans contenu jusqu'à l'étape 33.3).
// Le mot de passe n'est jamais stocké : uniquement envoyé au login.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClasses =
  'min-h-[3.25rem] w-full rounded-xl border border-gray-200 bg-gray-50 px-5 text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100'

function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  // Vérification de session uniquement si un token est présent
  // (évite un setState synchrone dans l'effet).
  const [checkingSession, setCheckingSession] = useState(
    () => Boolean(localStorage.getItem(ADMIN_TOKEN_KEY))
  )
  const [error, setError] = useState('')

  // Si un token existe déjà, le vérifier réellement via GET /api/admin/me.
  // La simple présence du token ne suffit jamais comme preuve.
  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY)
    if (!token) return
    let cancelled = false
    fetch(`${API_BASE_URL}/api/admin/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (cancelled) return
        if (response.ok) {
          navigate('/admin/dashboard', { replace: true })
        } else {
          localStorage.removeItem(ADMIN_TOKEN_KEY)
          setCheckingSession(false)
        }
      })
      .catch(() => {
        if (!cancelled) setCheckingSession(false)
      })
    return () => {
      cancelled = true
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Protection contre le double submit.
    if (loading) return

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !EMAIL_RE.test(trimmedEmail)) {
      setError('Veuillez saisir une adresse email valide.')
      return
    }
    if (!password) {
      setError('Veuillez saisir votre mot de passe.')
      return
    }

    setError('')
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password }),
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok && data.success && data.token) {
        localStorage.setItem(ADMIN_TOKEN_KEY, data.token)
        navigate('/admin/dashboard')
      } else if (response.status === 401) {
        setError('Identifiants incorrects.')
      } else {
        setError(data.message || "Une erreur est survenue lors de la connexion.")
      }
    } catch {
      setError('Impossible de contacter le serveur. Vérifiez que le backend est démarré.')
    } finally {
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16 sm:py-20">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl sm:p-10">
            <p className="text-gray-500" role="status">Vérification de la session…</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-md px-4 sm:px-6">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10">
          {/* Identité */}
          <div className="mb-8 text-center">
            <p className="mb-3 text-lg font-bold tracking-tight text-gray-900">
              MADA <span className="text-blue-600">DIGITAL AGENCY</span>
            </p>
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700">
              Espace admin
            </span>
            <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Connexion administrateur
            </h1>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              Connectez-vous pour accéder à votre espace d&apos;administration.
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-800 sm:text-base"
            >
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold text-gray-700">
                Email *
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@exemple.com"
                autoComplete="email"
                aria-invalid={Boolean(error)}
                disabled={loading}
                className={inputClasses}
              />
            </div>

            <div className="mb-7">
              <label htmlFor="admin-password" className="mb-2 block text-sm font-semibold text-gray-700">
                Mot de passe *
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Votre mot de passe"
                  autoComplete="current-password"
                  aria-invalid={Boolean(error)}
                  disabled={loading}
                  className={`${inputClasses} pr-14`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  aria-pressed={showPassword}
                  disabled={loading}
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.948 9.948 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="inline-flex min-h-[3.5rem] w-full items-center justify-center rounded-xl bg-blue-600 px-8 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
              {!loading && (
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            <Link
              to="/"
              className="rounded font-medium text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Retour au site
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default AdminLogin
