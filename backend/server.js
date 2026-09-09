// Backend MADA DIGITAL AGENCY — formulaire de contact.
// Reçoit POST /api/contact, valide les données, enregistre la demande
// dans PostgreSQL puis envoie un email via Nodemailer.
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Pool } = require('pg')

const app = express()
const PORT = process.env.PORT || 5000

// Origines frontend autorisées (modifiable via FRONTEND_URLS dans .env).
const allowedOrigins = (process.env.FRONTEND_URLS ||
  'http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Autorise les requêtes sans origine (ex. curl, outils locaux).
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Origine non autorisée par CORS.'))
      }
    },
  })
)
app.use(express.json({ limit: '100kb' }))

// Connexion PostgreSQL via Pool (mot de passe uniquement via .env).
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5434,
  database: process.env.DB_NAME || 'mada_digital_agency',
  user: process.env.DB_USER || 'mada_admin',
  password: process.env.DB_PASSWORD || '',
})

// Évite un crash Node en cas d'erreur idle du pool.
pool.on('error', (err) => {
  console.error('Erreur PostgreSQL (pool) :', err.message)
})

// Vérification de la connexion PostgreSQL au démarrage.
async function checkPostgresConnection() {
  try {
    await pool.query('SELECT 1')
    console.log('PostgreSQL : connecté.')
  } catch (err) {
    console.error('PostgreSQL : connexion échouée.', err.message)
  }
}

// Types de projet acceptés (identiques au formulaire frontend).
const PROJECT_TYPES = [
  'Site web',
  'E-commerce',
  'Application web',
  'Application mobile',
  'Cloud',
  'Cybersécurité',
  'Automatisation',
  'Autre',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateContact(data) {
  const name = String(data.name || '').trim()
  const email = String(data.email || '').trim()
  const subject = String(data.subject || '').trim()
  // Contrat : project_type (projectType accepté par compatibilité).
  const projectType = String(data.project_type || data.projectType || '').trim()
  const message = String(data.message || '').trim()

  if (!name || !email || !subject || !projectType || !message) {
    return { error: 'Tous les champs sont obligatoires.' }
  }
  if (!EMAIL_RE.test(email)) {
    return { error: 'Adresse email invalide.' }
  }
  if (!PROJECT_TYPES.includes(projectType)) {
    return { error: 'Type de projet invalide.' }
  }
  if (name.length > 100 || subject.length > 200 || message.length > 5000) {
    return { error: 'Données trop longues.' }
  }
  return { value: { name, email, subject, projectType, message } }
}

// Transporteur SMTP : Gmail par défaut, surcharge possible via .env
// (utile pour un autre fournisseur ou pour des tests).
function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

app.post('/api/contact', async (req, res) => {
  const checked = validateContact(req.body || {})
  if (checked.error) {
    return res.status(400).json({ success: false, message: checked.error })
  }

  const { name, email, subject, projectType, message } = checked.value

  // 1. Enregistrer la demande dans PostgreSQL (requête paramétrée).
  try {
    await pool.query(
      'INSERT INTO contact_messages (name, email, subject, project_type, message) VALUES ($1, $2, $3, $4, $5)',
      [name, email, subject, projectType, message]
    )
  } catch (err) {
    // DIAG temporaire (terminal serveur uniquement, sans credentials) :
    // distingue un échec INSERT d'un échec d'envoi email.
    console.error(
      'PostgreSQL : échec insertion contact_messages.',
      err.code,
      err.message
    )
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi.",
    })
  }

  // 2. Envoyer l'email avec Nodemailer.
  const transporter = createTransporter()
  if (!transporter) {
    // La demande reste enregistrée en base (pas de suppression) :
    // l'enregistrement est la source de vérité, l'email est secondaire.
    console.error(
      'Email : transporteur indisponible (EMAIL_USER/EMAIL_PASS manquants). Demande conservée en base.'
    )
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi.",
    })
  }

  const to = process.env.EMAIL_USER

  try {
    await transporter.sendMail({
      from: `"MADA DIGITAL AGENCY" <${to}>`,
      to,
      replyTo: email,
      subject: `[MADA DIGITAL AGENCY] Nouvelle demande : ${subject}`,
      text: [
        'Nouvelle demande reçue depuis le formulaire de contact.',
        '',
        `Nom : ${name}`,
        `Email : ${email}`,
        `Sujet : ${subject}`,
        `Type de projet : ${projectType}`,
        '',
        'Message :',
        message,
      ].join('\n'),
    })
    return res.json({
      success: true,
      message: 'Votre message a été envoyé avec succès.',
    })
  } catch (err) {
    // DIAG temporaire (terminal serveur uniquement) : la demande reste
    // enregistrée en base, seul l'envoi email a échoué.
    console.error(
      "Échec d'envoi de l'email de contact. Demande conservée en base.",
      err && err.message
    )
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi.",
    })
  }
})

// --- Authentification Admin (JWT) ---
// Prépare le futur dashboard. Aucun secret hardcodé : tout vient de .env.
const JWT_SECRET = process.env.JWT_SECRET || ''
const JWT_EXPIRES_IN = '8h'

function signAdminToken(admin) {
  return jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })
}

// Middleware : protège les futures routes Admin.
// Token attendu : Authorization: Bearer <token>
function requireAdmin(req, res, next) {
  const header = String(req.headers.authorization || '')
  const parts = header.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    return res.status(401).json({ success: false, message: 'Authentification requise.' })
  }
  if (!JWT_SECRET) {
    console.error('JWT_SECRET manquant dans .env.')
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi.",
    })
  }
  try {
    const payload = jwt.verify(parts[1], JWT_SECRET)
    req.admin = { id: payload.id, email: payload.email }
    return next()
  } catch {
    return res.status(401).json({ success: false, message: 'Authentification requise.' })
  }
}

app.post('/api/admin/login', async (req, res) => {
  const email = String((req.body && req.body.email) || '').trim().toLowerCase()
  const password = String((req.body && req.body.password) || '')

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Identifiants incorrects.' })
  }
  if (!JWT_SECRET) {
    console.error('JWT_SECRET manquant dans .env.')
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi.",
    })
  }

  try {
    const result = await pool.query('SELECT id, email, password_hash FROM admin_users WHERE email = $1', [email])
    const admin = result.rows[0]
    // Message générique : ne révèle pas si l'email existe ou non.
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Identifiants incorrects.' })
    }
    const ok = await bcrypt.compare(password, admin.password_hash)
    if (!ok) {
      return res.status(401).json({ success: false, message: 'Identifiants incorrects.' })
    }
    const token = signAdminToken(admin)
    return res.json({ success: true, token })
  } catch (err) {
    console.error('Échec login admin.', err.code, err.message)
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi.",
    })
  }
})

// Route de test protégée (temporaire) : infos non sensibles uniquement.
app.get('/api/admin/me', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email FROM admin_users WHERE id = $1', [req.admin.id])
    const admin = result.rows[0]
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Authentification requise.' })
    }
    return res.json({ success: true, admin: { id: admin.id, email: admin.email } })
  } catch (err) {
    console.error('Échec lecture admin.', err.code, err.message)
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi.",
    })
  }
})

// --- API Dashboard Admin (protégée par JWT) ---
// Lecture seule sur contact_messages + changement de status + suppression.
// Aucune donnée de admin_users exposée. Pool existant réutilisé.

app.get('/api/admin/messages', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, subject, project_type, message, status, created_at FROM contact_messages ORDER BY created_at DESC, id DESC'
    )
    return res.json({ success: true, messages: result.rows })
  } catch (err) {
    console.error('Échec lecture messages.', err.code, err.message)
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi.",
    })
  }
})

const MESSAGE_STATUSES = ['new', 'read', 'archived']

app.patch('/api/admin/messages/:id/status', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  const status = req.body && req.body.status

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(404).json({ success: false, message: 'Message introuvable.' })
  }
  if (!MESSAGE_STATUSES.includes(status)) {
    return res.status(400).json({ success: false, message: 'Statut invalide.' })
  }

  try {
    const result = await pool.query(
      'UPDATE contact_messages SET status = $1 WHERE id = $2 RETURNING id, name, email, subject, project_type, message, status, created_at',
      [status, id]
    )
    const message = result.rows[0]
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message introuvable.' })
    }
    return res.json({ success: true, message })
  } catch (err) {
    console.error('Échec changement statut message.', err.code, err.message)
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi.",
    })
  }
})

app.delete('/api/admin/messages/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(404).json({ success: false, message: 'Message introuvable.' })
  }

  try {
    const result = await pool.query('DELETE FROM contact_messages WHERE id = $1 RETURNING id', [id])
    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: 'Message introuvable.' })
    }
    return res.json({ success: true, message: 'Message supprimé.' })
  } catch (err) {
    console.error('Échec suppression message.', err.code, err.message)
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi.",
    })
  }
})

app.get('/api/admin/stats', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status = 'new')::int AS new, COUNT(*) FILTER (WHERE status = 'read')::int AS read, COUNT(*) FILTER (WHERE status = 'archived')::int AS archived FROM contact_messages"
    )
    return res.json({ success: true, stats: result.rows[0] })
  } catch (err) {
    console.error('Échec lecture stats.', err.code, err.message)
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi.",
    })
  }
})

// 404 JSON pour les autres routes /api (le frontend gère le reste).
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'Route introuvable.' })
})

app.listen(PORT, () => {
  console.log(`Backend MADA DIGITAL AGENCY en écoute sur le port ${PORT}.`)
  checkPostgresConnection()
})
