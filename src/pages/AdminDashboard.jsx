import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  clearAdminToken,
  deleteMessage,
  getAdminMessages,
  getAdminStats,
  getCurrentAdmin,
  updateMessageStatus,
} from '../lib/api'

// Dashboard Admin — statistiques + demandes de contact (PostgreSQL via API).
// Route protégée : token vérifié via GET /api/admin/me à chaque chargement.
// Aucune donnée fictive : tout vient du backend.

const STATUS_META = {
  new: { label: 'Nouveau', badge: 'bg-blue-100 text-blue-700' },
  read: { label: 'Lu', badge: 'bg-green-100 text-green-700' },
  archived: { label: 'Archivé', badge: 'bg-gray-200 text-gray-600' },
}

const STATUS_OPTIONS = ['new', 'read', 'archived']

function formatDate(value) {
  try {
    return new Date(value).toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return String(value)
  }
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.new
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${meta.badge}`}>
      {meta.label}
    </span>
  )
}

function AdminDashboard() {
  const navigate = useNavigate()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [admin, setAdmin] = useState(null)
  const [stats, setStats] = useState(null)
  const [messages, setMessages] = useState([])
  const [loadingData, setLoadingData] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [busyId, setBusyId] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const forceLogin = useCallback(() => {
    clearAdminToken()
    navigate('/admin/login', { replace: true })
  }, [navigate])

  const loadStats = useCallback(async () => {
    const { ok, status, data } = await getAdminStats()
    if (status === 401) return 'unauthorized'
    if (!ok || !data.success) throw new Error()
    setStats(data.stats)
    return 'ok'
  }, [])

  const loadMessages = useCallback(async () => {
    const { ok, status, data } = await getAdminMessages()
    if (status === 401) return 'unauthorized'
    if (!ok || !data.success) throw new Error()
    setMessages(Array.isArray(data.messages) ? data.messages : [])
    return 'ok'
  }, [])

  const loadData = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) setRefreshing(true)
      else setLoadingData(true)
      setError('')
      try {
        const [statsResult, messagesResult] = await Promise.all([loadStats(), loadMessages()])
        if (statsResult === 'unauthorized' || messagesResult === 'unauthorized') {
          forceLogin()
        }
      } catch {
        setError('Impossible de charger les données. Vérifiez que le serveur est démarré.')
      } finally {
        setLoadingData(false)
        setRefreshing(false)
      }
    },
    [forceLogin, loadMessages, loadStats]
  )

  // Vérification d'authentification au chargement (le token seul ne suffit pas).
  useEffect(() => {
    let cancelled = false
    getCurrentAdmin()
      .then(({ ok, status, data }) => {
        if (cancelled) return
        if (!ok || !data.success) {
          forceLogin()
          return
        }
        if (status === 401) {
          forceLogin()
          return
        }
        setAdmin(data.admin)
        setCheckingAuth(false)
        loadData()
      })
      .catch(() => {
        if (cancelled) return
        setCheckingAuth(false)
        setError('Impossible de charger les données. Vérifiez que le serveur est démarré.')
      })
    return () => {
      cancelled = true
    }
  }, [forceLogin, loadData])

  // Fermeture du modal avec Échap.
  useEffect(() => {
    if (!selected) return
    const onKey = (event) => {
      if (event.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  const handleStatusChange = async (id, nextStatus) => {
    if (busyId) return
    setBusyId(id)
    setError('')
    setNotice('')
    try {
      const { ok, status, data } = await updateMessageStatus(id, nextStatus)
      if (status === 401) {
        forceLogin()
        return
      }
      if (!ok || !data.success) throw new Error()
      setMessages((previous) =>
        previous.map((item) => (item.id === id ? data.message : item))
      )
      await loadStats()
      setNotice('Statut mis à jour.')
    } catch {
      setError("Impossible de mettre à jour le statut. Veuillez réessayer.")
    } finally {
      setBusyId(null)
    }
  }

  const handleDelete = async (id) => {
    if (busyId) return
    setBusyId(id)
    setError('')
    setNotice('')
    try {
      const { ok, status, data } = await deleteMessage(id)
      if (status === 401) {
        forceLogin()
        return
      }
      if (!ok || !data.success) throw new Error()
      setMessages((previous) => previous.filter((item) => item.id !== id))
      setConfirmDeleteId(null)
      if (selected && selected.id === id) setSelected(null)
      await loadStats()
      setNotice('Message supprimé.')
    } catch {
      setError('Impossible de supprimer le message. Veuillez réessayer.')
    } finally {
      setBusyId(null)
    }
  }

  const handleLogout = () => {
    clearAdminToken()
    navigate('/admin/login')
  }

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <p className="rounded-2xl border border-gray-100 bg-white px-8 py-6 text-gray-500 shadow" role="status">
          Vérification de la session…
        </p>
      </div>
    )
  }

  const statCards = [
    { key: 'total', label: 'Total', value: stats ? stats.total : '—' },
    { key: 'new', label: 'Nouveaux', value: stats ? stats.new : '—' },
    { key: 'read', label: 'Lus', value: stats ? stats.read : '—' },
    { key: 'archived', label: 'Archivés', value: stats ? stats.archived : '—' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mr-auto min-w-0">
            <p className="truncate text-base font-bold tracking-tight text-gray-900 sm:text-lg">
              MADA <span className="text-blue-600">DIGITAL AGENCY</span>
            </p>
            <p className="truncate text-xs text-gray-500 sm:text-sm">
              Espace administration{admin ? ` — ${admin.email}` : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={() => loadData(true)}
            disabled={refreshing || loadingData}
            className="inline-flex min-h-[2.75rem] items-center rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {refreshing ? 'Actualisation…' : 'Actualiser'}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex min-h-[2.75rem] items-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div aria-live="polite">
          {error && (
            <p role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-800">
              {error}
            </p>
          )}
          {notice && !error && (
            <p className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-800">
              {notice}
            </p>
          )}
        </div>

        {/* Statistiques */}
        <section aria-label="Statistiques">
          <h1 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">Tableau de bord</h1>
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {statCards.map((card) => (
              <div key={card.key} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
                  {card.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {loadingData && !stats ? '…' : card.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Messages */}
        <section aria-label="Messages de contact" className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">Messages de contact</h2>

          {loadingData ? (
            <div className="space-y-4" role="status" aria-label="Chargement des messages">
              {[0, 1, 2].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="mb-3 h-4 w-1/3 rounded bg-gray-200" />
                  <div className="mb-2 h-4 w-2/3 rounded bg-gray-100" />
                  <div className="h-4 w-1/2 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
              <svg className="mx-auto mb-4 h-12 w-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="font-semibold text-gray-900">Aucun message pour le moment.</p>
              <p className="mt-1 text-sm text-gray-500">Les nouvelles demandes du formulaire apparaîtront ici.</p>
            </div>
          ) : (
            <>
              {/* Cartes : mobile + tablette */}
              <div className="space-y-4 lg:hidden">
                {messages.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="min-w-0 flex-1 truncate font-semibold text-gray-900">{item.name}</p>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="mb-1 truncate text-sm font-medium text-gray-700">{item.subject}</p>
                    <p className="mb-1 break-all text-sm text-blue-600">{item.email}</p>
                    <p className="mb-4 text-xs text-gray-500">
                      {item.project_type} — {formatDate(item.created_at)}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelected(item)}
                        className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        Détails
                      </button>
                      <label className="sr-only" htmlFor={`status-mobile-${item.id}`}>
                        Statut du message de {item.name}
                      </label>
                      <select
                        id={`status-mobile-${item.id}`}
                        value={item.status}
                        disabled={busyId === item.id}
                        onChange={(event) => handleStatusChange(item.id, event.target.value)}
                        className="min-h-[2.75rem] flex-1 cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-semibold text-gray-700 focus:border-blue-500 focus:outline-none disabled:opacity-60"
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {STATUS_META[option].label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {confirmDeleteId === item.id ? (
                      <div className="mt-2 rounded-xl border border-red-200 bg-red-50 p-3">
                        <p className="mb-2 text-sm font-medium text-red-800">
                          Voulez-vous vraiment supprimer ce message ?
                        </p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            disabled={busyId === item.id}
                            className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-60"
                          >
                            {busyId === item.id ? 'Suppression…' : 'Confirmer'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(item.id)}
                        aria-label={`Supprimer le message de ${item.name}`}
                        className="mt-2 inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        Supprimer
                      </button>
                    )}
                  </article>
                ))}
              </div>

              {/* Tableau : desktop */}
              <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
                <table className="w-full table-fixed text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                      <th scope="col" className="w-[22%] px-5 py-4 font-semibold">Contact</th>
                      <th scope="col" className="w-[26%] px-5 py-4 font-semibold">Sujet</th>
                      <th scope="col" className="w-[12%] px-5 py-4 font-semibold">Type</th>
                      <th scope="col" className="w-[12%] px-5 py-4 font-semibold">Statut</th>
                      <th scope="col" className="w-[13%] px-5 py-4 font-semibold">Date</th>
                      <th scope="col" className="w-[15%] px-5 py-4 font-semibold">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((item) => (
                      <tr key={item.id} className="border-b border-gray-50 transition-colors last:border-0 hover:bg-blue-50/40">
                        <td className="px-5 py-4 align-top">
                          <p className="truncate font-semibold text-gray-900">{item.name}</p>
                          <p className="truncate text-xs text-blue-600">{item.email}</p>
                        </td>
                        <td className="truncate px-5 py-4 align-top text-gray-700">{item.subject}</td>
                        <td className="truncate px-5 py-4 align-top text-gray-600">{item.project_type}</td>
                        <td className="px-5 py-4 align-top">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 align-top text-xs text-gray-500">
                          {formatDate(item.created_at)}
                        </td>
                        <td className="px-5 py-4 align-top">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelected(item)}
                              className="inline-flex min-h-[2.5rem] items-center rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                              Détails
                            </button>
                            <label className="sr-only" htmlFor={`status-desktop-${item.id}`}>
                              Statut du message de {item.name}
                            </label>
                            <select
                              id={`status-desktop-${item.id}`}
                              value={item.status}
                              disabled={busyId === item.id}
                              onChange={(event) => handleStatusChange(item.id, event.target.value)}
                              className="min-h-[2.5rem] cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-2 text-xs font-semibold text-gray-700 focus:border-blue-500 focus:outline-none disabled:opacity-60"
                            >
                              {STATUS_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                  {STATUS_META[option].label}
                                </option>
                              ))}
                            </select>
                            {confirmDeleteId === item.id ? (
                              <span className="inline-flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item.id)}
                                  disabled={busyId === item.id}
                                  className="inline-flex min-h-[2.5rem] items-center rounded-lg bg-red-600 px-3 text-xs font-semibold text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-60"
                                >
                                  {busyId === item.id ? '…' : 'Confirmer'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(null)}
                                  aria-label="Annuler la suppression"
                                  className="inline-flex min-h-[2.5rem] items-center rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-700 hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                >
                                  Non
                                </button>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(item.id)}
                                aria-label={`Supprimer le message de ${item.name}`}
                                className="inline-flex min-h-[2.5rem] items-center rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                              >
                                Supprimer
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>

        <p className="mt-8 text-center text-sm">
          <Link
            to="/"
            className="rounded font-medium text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Retour au site
          </Link>
        </p>
      </main>

      {/* Modal détail */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/50 p-4 sm:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-detail-title"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
              <h2 id="message-detail-title" className="min-w-0 flex-1 text-lg font-bold text-gray-900 sm:text-xl">
                {selected.subject}
              </h2>
              <StatusBadge status={selected.status} />
            </div>
            <dl className="mb-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 font-semibold text-gray-500">Nom</dt>
                <dd className="min-w-0 flex-1 break-words text-gray-900">{selected.name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 font-semibold text-gray-500">Email</dt>
                <dd className="min-w-0 flex-1 break-all text-gray-900">{selected.email}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 font-semibold text-gray-500">Type</dt>
                <dd className="min-w-0 flex-1 text-gray-900">{selected.project_type}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 font-semibold text-gray-500">Date</dt>
                <dd className="min-w-0 flex-1 text-gray-900">{formatDate(selected.created_at)}</dd>
              </div>
            </dl>
            <p className="mb-2 text-sm font-semibold text-gray-500">Message</p>
            <p className="mb-6 whitespace-pre-wrap break-words rounded-xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-800">
              {selected.message}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={`mailto:${selected.email}`}
                className="inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Répondre par email
              </a>
              <button
                type="button"
                onClick={() => setSelected(null)}
                autoFocus
                className="inline-flex min-h-[3rem] flex-1 items-center justify-center rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
