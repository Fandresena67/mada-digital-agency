// Crée le premier administrateur local (usage unique / rattrapage).
// Lit ADMIN_EMAIL et ADMIN_PASSWORD depuis backend/.env, hash avec
// bcryptjs et insère dans admin_users. Ne jamais afficher le mot de passe.
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const bcrypt = require('bcryptjs')
const { Pool } = require('pg')

async function main() {
  const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()

  if (!email || !process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans backend/.env.')
    process.exit(1)
  }

  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5434,
    database: process.env.DB_NAME || 'mada_digital_agency',
    user: process.env.DB_USER || 'mada_admin',
    password: process.env.DB_PASSWORD || '',
  })

  try {
    const existing = await pool.query('SELECT id FROM admin_users WHERE email = $1', [email])
    if (existing.rows[0]) {
      console.log(`Administrateur déjà existant (email=${email}, id=${existing.rows[0].id}). Aucun doublon créé.`)
      return
    }
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
    const result = await pool.query(
      'INSERT INTO admin_users (email, password_hash) VALUES ($1, $2) RETURNING id',
      [email, passwordHash]
    )
    console.log(`Administrateur créé (email=${email}, id=${result.rows[0].id}).`)
  } catch (err) {
    console.error('Échec création administrateur.', err.code, err.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

main()
