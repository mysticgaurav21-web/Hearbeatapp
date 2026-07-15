# 🎵 Heartbeat Musicals — Management App

Multi-branch music institute + shop management (Agra: Karkunj, Kamla Nagar, Sastripuram).
Real June 2026 data loaded — 81 students, ₹1,30,250 collection, 4 teachers.

## GitHub Pages pe LIVE karne ke steps (5 minute)

### Step 1: Naya repo banao
github.com → **New repository** → naam: `heartbeat-musicals` → **Public** → Create
(⚠ README/gitignore add MAT karna — khaali repo banao)

### Step 2: Files upload karo
- Is zip ko computer pe **extract** karo
- ⚠ **Hidden files dikhao**: Windows → View → Show → Hidden items · Mac → Cmd+Shift+. (`.github` folder zaroori hai!)
- Repo page pe **"uploading an existing file"** link pe click karo
- Extract kiye folder ke **andar ke saare files/folders** (`.github` samet) drag karo
- **Commit changes** dabao

⚠ Agar `.github` folder upload nahi hua (kuch browsers skip kar dete hain):
Repo mein **Add file → Create new file** → naam mein type karo: `.github/workflows/deploy.yml` → is zip ke andar wali `deploy.yml` ka content paste karo → Commit.

### Step 3: Pages on karo
Repo → **Settings → Pages** → Source: **GitHub Actions** select karo

### Step 4: Deploy check karo
**Actions** tab → "Deploy to GitHub Pages" workflow green ✔ hone ka wait karo (2-3 min)
App live: `https://<aapka-username>.github.io/heartbeat-musicals/`

## Local pe chalana ho toh
```
npm install
npm run dev
```

## Files
- `src/App.jsx` — poora app (6 role logins, 17 pages)
- `heartbeat-schema.sql` — Supabase database schema (real backend ke liye)
- `data/` — June 2026 register data (CSV)
- `CLAUDE.md` — Claude Code ke liye project context

## Aage kya (Claude Code mein)
Supabase backend + real login + WhatsApp reminders — CLAUDE.md mein roadmap hai.
