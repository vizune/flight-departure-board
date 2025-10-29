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

## 🧭 Future Enhancements

While the current implementation meets the core requirements, there are several opportunities to enhance the user experience and scalability of the Departures Board:

- **Centralized State Management with Vuex or Pinia:**  
  Implement a global store to manage flight data and status updates across components.  
  This would replace local state handling and ensure consistency, scalability, and easier synchronization between the Departures board, update form, and other potential views.

- **Pagination:**  
  Implement pagination or infinite scrolling to handle larger datasets efficiently.  
  This would prevent performance degradation and improve load times when the API returns many flights.

- **Sortable Columns:**  
  Allow users to click on column headers (e.g. *Departure Time*, *Airline*, *Status*) to dynamically sort flights.  
  This would make it easier to organize information based on user preferences.

- **Search & Filtering:** 
  Enable filtering by city, airline, or flight status. 

- **Auto-refresh:**
  Periodically fetch updated flight data to reflect real-time changes. 

- **Animations:**
  Add subtle transition effects when rows update or reload.

- **Editable Form via Modal or Sidebar:**  
  Improve visibility and usability of the flight status update form.  
  Instead of showing the form inline, introduce an **Edit** button that opens a modal or expandable sidebar containing the form.  
  This would make it clearer when and where users can make updates.

- **Role-Based Access Control:**  
  Restrict access to the update form based on user roles.  
  For example, only users with an **Admin** role would have permission to view and edit flight statuses, while others would remain in read-only mode.


These enhancements would improve both usability and performance, aligning the app more closely with real-world flight board behavior.
