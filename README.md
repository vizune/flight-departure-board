# ✈️ Flight Departures Board

A single-page Vue 2 application built with **Vite** that displays flight departure data from a public API and allows updating each flight’s status.

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
| HTTP Client | **Axios** | Clean and familiar API for data fetching |
| Date Formatting | **dayjs** | Lightweight replacement for moment.js |
| Styling | **Sass (SCSS)** | Allows variables and nesting for responsive layouts |
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