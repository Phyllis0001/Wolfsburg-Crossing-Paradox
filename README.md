# Wolfsburg Crossing Paradox

An interactive surveillance grid visualising the tension between AI traffic management and human street perception in Wolfsburg. Part of the **Urban Paradox Series — Unit 07**.

## What it does

- **Live map** of Wolfsburg's key zones — Porschestrasse, B188, VW Factory Gate, Hbf Station, Porsche Arena
- Zones pulse between **ordered** (AI ideal) and **disrupted** states in real time
- A **drone** autonomously patrols and corrects disruptions
- **Traffic dots** (cars + pedestrians) animate along real road paths
- Two **live comment feeds** stream observations from the traffic light and ground sensor
- **Human perception input** — type what you see from the street
- **Stats bar** tracks corrections, entropy events, and trust drift

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

### Run locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
# Output goes to the dist/ folder
```

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** and select **GitHub Actions**
3. The workflow in `.github/workflows/deploy.yml` runs automatically on every push to `main`

> The `GITHUB_REPOSITORY` environment variable is set automatically by the workflow — Vite uses it to set the correct base path.

## Tech stack

| Tool | Purpose |
|---|---|
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [React](https://react.dev/) | UI framework |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Input & Button components |
| [react-icons](https://react-icons.github.io/react-icons/) | Icon library |

## Project structure

```
src/
  App.jsx              ← Top-level layout, wires all hooks together
  index.css            ← Global styles + CSS variables
  data/
    zones.js           ← Zone definitions (coordinates, risk labels)
    paths.js           ← Road paths + traffic dot configs
    comments.js        ← Feed comment text arrays
  hooks/
    useSimulation.js   ← Zone states, drone logic, RAF animation loop
    useRafLoop.js      ← requestAnimationFrame abstraction
    useCommentFeed.js  ← Timed comment feed state
    useUptime.js       ← Uptime clock + trust delta display
  components/
    MapSection.jsx     ← Map header (cycle, zoom controls) + canvas
    MapCanvas.jsx      ← SVG container, zoom/pan, tooltip
    MapSvgStatic.jsx   ← Static SVG: buildings, roads, canal
    MapZones.jsx       ← Animated zone overlays
    MapDrone.jsx       ← Drone SVG element
    MapTrafficDots.jsx ← Animated traffic dots
    ...
```
