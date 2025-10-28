# ✈️ Flight Departures Board

A single-page Vue 2 application built with **Vite** that displays flight departure data from a public API and allows updating each flight's status.

---

## 🚀 Overview

This project was created as part of a technical test to demonstrate proficiency with **Vue 2**, modern frontend tooling, responsive design, and clean code organization. 

The app fetches real-time flight data and lets users update a flight’s status (e.g., *Departed*, *Delayed*, *Diverted*, *Cancelled*, or custom free text*).

---

## 🧱 Tech Stack

| Category | Choice | Reason |
|-----------|---------|--------|
| Framework | **Vue 2** | Required by the brief; stable and widely supported |
| Bundler | **Vite** + `@vitejs/plugin-vue2` | Modern, fast dev server compatible with Vue 2 |
| State Management | **Vuex 3** | Simple reactive store; easily upgradable to Pinia/Vue 3 |
| HTTP Client | **Fetch API** | Native browser API — lightweight, no external dependency, and fully supported in modern environments |
| Date Formatting | **dayjs** | Lightweight replacement for moment.js |
| Styling | **SCSS** | Allows variables and nesting for responsive layouts |
| Testing | **Jest** + `@vue/test-utils` | Unit testing for components and store |

---

## ⚙️ Project Setup

### 1. Clone and install dependencies
```bash
git clone <repo-url>
cd flight-departures-board
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Then open your browser at:
👉 http://localhost:5173

### 3. Build for production
```bash
npm run build
```

### 4. Preview the production build
```bash
npm run preview
```

### 5. Run tests
```bash
npm run test
```

---

## 🧩 Project Structure

```bash
flight-departures-board/
├─ src/
│  ├─ api/                # Fetch API layer
│  ├─ components/         # Vue components (Board, Row, Form, etc.)
│  ├─ store/              # Vuex store for flights and overrides
│  ├─ styles/             # Global styles and Tailwind entry point
│  │  ├─ global.scss      # Imports Tailwind directives + global styles
│  │  └─ tailwind.css     # (optional) Separate Tailwind import file if needed
│  ├─ utils/              # Helper functions (sorting, formatting)
│  ├─ App.vue             # Root component
│  └─ main.js             # App entry point
├─ public/                # Static assets (favicon, etc.)
├─ tailwind.config.js     # Tailwind configuration (content paths, theme)
├─ postcss.config.js      # PostCSS configuration (Tailwind + Autoprefixer)
├─ vite.config.js         # Vite configuration
├─ package.json
├─ .gitignore
└─ README.md
```

---

## 🌐 API Reference

**Endpoint:**  
`https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata`

**Example Response:**
```json
[
  {
    "id": "1",
    "flightNumber": "BA284",
    "departureAirport": { "airportName": "Heathrow" },
    "arrivalAirport": { "airportName": "JFK", "countryName": "USA" },
    "scheduledTime": "2025-10-28T12:30:00Z",
    "status": "On time"
  }
]
```

---

## 🧠 Features

- **Fetches live flight data** from the public API  
- **Displays departures** in a responsive, accessible table  
- **Allows updating flight status** via a form (with free text option)  
- **Handles API errors gracefully** with a retry option  
- **Responsive layout** supporting major browsers (Chrome, Firefox, Safari, Edge)  
- **Optimistic UI updates** when statuses are changed  
- **Clean, modular codebase** structured for easy upgrade to Vue 3
