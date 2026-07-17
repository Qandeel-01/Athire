# Athire

A weather-aware fashion recommendation app. Combines real-time weather data with outfit suggestions — users can check UV levels, build outfits for specific activities, and get location-based recommendations.

## Features

- **Weather Dashboard** — real-time weather with UV gauge and 5-day forecast
- **Outfit Builder** — drag-and-drop interface for creating and saving outfits
- **Activity Recommendations** — outfit suggestions for hiking, cycling, yoga, and more
- **Interactive Map** — location search powered by OpenStreetMap
- **User Profile** — saved outfits and personal preferences
- Responsive across desktop, tablet, and mobile

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Material-UI, Leaflet, Axios

**Backend:** Node.js, Express.js, MySQL

**APIs:** OpenWeather API, OpenStreetMap Nominatim

## Getting Started

### Prerequisites

- Node.js v16+
- npm
- MySQL 5.7+

### Frontend

```bash
git clone https://github.com/Qandeel-01/Athire.git
cd Athire/my-react-app
npm install
```

Create a `.env` file in `my-react-app/`:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Get a free key at [openweathermap.org/api](https://openweathermap.org/api).

```bash
npm run dev
# → http://localhost:5173
```

### Backend

```bash
cd backend
npm install
# update MySQL connection details in server.js
mysql -u your_user -p your_database < ../Athire.sql
npm start
```

## Scripts

```bash
npm run dev      # development server with hot reload
npm run build    # production build
npm run preview  # preview production build
npm run lint     # ESLint
```

## Project Structure

```
Athire/
├── my-react-app/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherDashboard.jsx
│   │   │   ├── OutfitBuilder.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   ├── MapComponent.jsx
│   │   │   ├── UVGauge.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── BeforeLogin.jsx
│   │   │   └── SignUpLogin.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── backend/
│   │   └── server.js
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Athire.sql
└── README.md
```

## Security

API keys are stored in `.env` files — never committed to version control. Use `.env.example` as a template and keep `.env` in `.gitignore`.

## License

MIT License
