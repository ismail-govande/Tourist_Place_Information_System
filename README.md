# Tourist Place Information System (React JS – Case Study 32)

A React application to maintain information about tourist destinations available in a travel agency.

## How to run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Project structure

```
src/
  components/
    DestinationForm.jsx   – form with Place Name, City Name, Entry Fee + validation
    DestinationCard.jsx   – reusable card that shows one destination using props
  App.jsx                 – holds destinations in useState, add/delete logic, map() + empty state
  App.css                 – layout and component styles
  index.css               – global styles and color variables
  main.jsx                – mounts <App /> into the page
```

## Assignment checklist

| # | Requirement | Where |
|---|-------------|-------|
| 1 | Destination form with Place Name, City Name and Entry Fee | `DestinationForm.jsx` |
| 2 | Reusable DestinationCard component using props | `DestinationCard.jsx`, used in `App.jsx` |
| 3 | `useState` to store and manage destination records | `App.jsx` → `const [destinations, setDestinations] = useState([])` |
| 4 | Add Destination and Delete Destination | `handleAddDestination` (spread operator) and `handleDeleteDestination` (`filter()`) in `App.jsx` |
| 5 | Display all records dynamically + message when none | `destinations.map(...)` and the `destinations.length === 0` check in `App.jsx` |
