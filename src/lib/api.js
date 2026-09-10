// URL du backend : variable VITE_API_URL en production,
// http://localhost:5000 pendant le développement local.
// Aucun secret ne doit figurer ici.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const ADMIN_TOKEN_KEY = 'admin_token'

// --- Helpers Admin (token + requêtes JSON) ---

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY)
}

export function setAdminToken(token) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token)
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
}

function authHeaders() {
  const token = getAdminToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

// Retourne { status, data }. data vaut {} si le corps n'est pas du JSON.
async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)
  const data = await response.json().catch(() => ({}))
  return { status: response.status, ok: response.ok, data }
}

export async function getCurrentAdmin() {
  return apiRequest('/api/admin/me', { headers: authHeaders() })
}

export async function getAdminStats() {
  return apiRequest('/api/admin/stats', { headers: authHeaders() })
}

export async function getAdminMessages() {
  return apiRequest('/api/admin/messages', { headers: authHeaders() })
}

export async function updateMessageStatus(id, status) {
  return apiRequest(`/api/admin/messages/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  })
}

export async function deleteMessage(id) {
  return apiRequest(`/api/admin/messages/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
}

// --- Formulaire Contact (public, sans authentification) ---
// Champs exacts du contrat : name, email, subject, project_type, message.
// Retourne { ok, message }. Ne lève jamais : erreur réseau -> message simple.
export async function sendContactMessage(payload) {
  try {
    const { ok, data } = await apiRequest('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (ok && data.success) {
      return { ok: true, message: data.message || 'Votre message a été envoyé avec succès.' }
    }
    return { ok: false, message: data.message || "Une erreur est survenue lors de l'envoi." }
  } catch {
    return { ok: false, message: 'Impossible de contacter le serveur. Veuillez réessayer dans quelques instants.' }
  }
}
