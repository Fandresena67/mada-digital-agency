# MADA DIGITAL AGENCY

Site vitrine d'une agence digitale fictive basée à Madagascar.
Slogan : « Transformons vos idées en solutions digitales ».

> Projet pédagogique (frontend uniquement, sans backend).
> Les projets, témoignages et chiffres présentés sont des contenus
> de démonstration. Les formulaires (contact, newsletter) fonctionnent
> côté interface uniquement : aucune donnée n'est envoyée ni stockée.

## Stack

- React.js + Vite
- JavaScript
- Tailwind CSS v4
- React Router (`react-router-dom`)
- HTML5 / CSS3

## Installation

```bash
npm install
```

## Lancement en développement

```bash
npm run dev
```

Le site est alors accessible sur `http://localhost:5173`.

## Lint

```bash
npm run lint
```

## Build production

```bash
npm run build
```

Le dossier `dist/` généré est un site statique prêt à être hébergé.

## Aperçu du build

```bash
npm run preview
```

## Structure principale

```
src/
├── components/   # Navbar, Footer, Hero, sections de la page d'accueil…
├── pages/        # Home, Services, About, Projects, Blog, Contact
├── App.jsx       # Routes + layout (Navbar / Footer)
├── main.jsx      # Point d'entrée React
└── index.css     # Tailwind CSS + animations légères
public/
└── favicon.svg   # Logo « M » de l'agence
```

## Routes disponibles

| URL         | Page         |
| ----------- | ------------ |
| `/`         | Accueil      |
| `/services` | Services     |
| `/about`    | À propos     |
| `/projects` | Réalisations |
| `/blog`     | Blog         |
| `/contact`  | Contact      |

Note : le site utilise `BrowserRouter`. Sur un hébergement statique,
il faudra activer la réécriture SPA (toutes les routes → `index.html`)
pour que le rechargement direct des URLs fonctionne.
