<div align="center">
	<h1>Abstract Engineer Showcase</h1>
	<p>A minimalist, interactive developer portfolio built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui — featuring dynamic skill cloud, audio ambience, theme switching, and smooth in-page navigation.</p>
</div>

## ✨ Features

- Responsive React + TypeScript architecture
- Themed (light/dark) adaptive geometric background
- Floating interactive skill cloud (physics-based) with click repulsion
- Audio ambience with fade, toggle, and attribution
- Accessible keyboard focus styles (reduced visual noise)
- Section navigation with smooth scrolling & scroll margin offsets
- GitHub Pages deployment (with optional custom domain via CNAME)

## 📦 Tech Stack

| Layer | Tools |
|-------|-------|
| Build | Vite |
| UI | React 18, TypeScript, Tailwind CSS, shadcn/ui (Radix primitives) |
| State/UX | Local component state, custom hooks |
| Tooling | ESLint, TypeScript, gh-pages |

## 🚀 Quick Start

Prerequisites:
- Node.js 18+ (recommend using `nvm` or `fnm`)
- Git

Clone & run (current repository name is a user page repo: `Gurudath-S.github.io`):
```sh
git clone https://github.com/Gurudath-S/Gurudath-S.github.io.git
cd Gurudath-S.github.io
npm install
npm run dev
```
Then open the printed local URL (usually http://localhost:5173). Edit any file inside `src/` and the page will hot-reload.

## 📁 Useful Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Development-mode bundle (unminified) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the codebase |
| `npm run deploy` | Build & publish the site to GitHub Pages branch (uses `predeploy`) |

## 🌐 Deployment (GitHub Pages)

This repo is configured to deploy via the `gh-pages` package.

1. Ensure `vite.config.ts` has the correct `base`. For a user/organization root page repository named `<username>.github.io` the correct value is `/` (already configured). For a project page use `/<repo-name>/`.
2. (Optional) Place a `CNAME` file in `public/` with your custom domain (already present if you configured one).
3. Deploy:
	 ```sh
	 npm run deploy
	 ```
	 This runs `npm run build` (via `predeploy`) and pushes `dist/` to the `gh-pages` branch.
4. In GitHub repo settings → Pages, point to `gh-pages` branch (root). Allow a few minutes for propagation.

### Updating After Changes
Make code changes → commit → push → redeploy:
```sh
git add .
git commit -m "feat: update hero content"
git push origin main
npm run deploy
```

### Custom Domain
If you use a custom domain:
* Confirm `public/CNAME` contains exactly the domain (no protocol).
* After DNS setup (A / CNAME records), redeploy if you changed CNAME.
* Force HTTPS in GitHub Pages settings.

## 🧪 Recommended Workflow
1. Create a feature branch: `git checkout -b feat/skill-tuning`
2. Develop with `npm run dev`
3. Lint before committing: `npm run lint`
4. Build locally to sanity check: `npm run build`
5. Merge to `main`
6. Deploy: `npm run deploy`

## 🛠 Project Structure (High-Level)
```
src/
	components/   # UI building blocks & sections
	pages/         # Entry page (Index)
	hooks/         # Custom hooks (audio, media, etc.)
	lib/           # Utilities (e.g., cn helper)
public/          # Static assets (favicon, CNAME, audio attribution)
```

## ♿ Accessibility & UX Notes
- Smooth scrolling enabled via CSS `scroll-behavior`.
- Focus rings are subtle but present (1px) for keyboard users.
- Skills cloud content duplicated via screen-reader-only list for text accessibility.

## 🔧 Configuration Touchpoints
| File | Purpose |
|------|---------|
| `vite.config.ts` | Build & base path config |
| `tailwind.config.ts` | Tailwind theme & content paths |
| `tsconfig.json` | TypeScript config / path aliases |
| `package.json` | Scripts & dependencies |
| `public/CNAME` | Custom domain (if used) |

## 🔊 Media Attribution
Background music by [Siarhei Korbut](https://pixabay.com/users/siarhei_korbut-49383247/) (Pixabay). Update/remove attribution if you change or remove the track.

## ❓ Troubleshooting
| Issue | Fix |
|-------|-----|
| Blank page after deploy | Check `base` in `vite.config.ts` (should be `/` for user site) and GitHub Pages branch selection |
| 404 on refresh (GitHub Pages) | Ensure SPA fallback: Pages now auto-serves 404->index for many cases; if not, add a 404.html copying index.html |
| Assets 404 with custom domain | DNS still propagating; verify `CNAME` committed |
| Audio won’t autoplay | Browser policy: user must interact first (click anywhere) |

## 📜 License
Personal portfolio source – feel free to fork and adapt. If reusing significant unique UI/animation portions, attribution appreciated but not required.

---
Enjoy building your own version! For improvements or ideas, open an issue or PR.
