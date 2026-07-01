# Athire - Smart Fashion based on Weather App

Athire is an intelligent fashion recommendation application that combines weather data with outfit suggestions. Users can explore curated outfits, check UV levels, and make personalized fashion choices based on real-time weather conditions.

##  Features

- **Weather Dashboard**: Real-time weather information with UV gauge and detailed forecasts
- **Outfit Builder**: Create and customize outfits for different occasions with drag-and-drop interface
- **Activity-Based Recommendations**: Get outfit suggestions based on planned activities (hiking, cycling, yoga, etc.)
- **User Profile**: Manage personal preferences and saved outfits
- **Interactive Map**: Location-based weather and outfit recommendations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful, intuitive user interface built with React and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18+** - UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Material-UI (MUI)** - Component library
- **Leaflet** - Interactive mapping
- **Axios** - HTTP client
- **ESLint** - Code quality

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Database

### APIs
- **OpenWeather API** - Real-time weather data and forecasts
- **OpenStreetMap Nominatim** - Geolocation services

##  Project Structure

```
Athire/
├── my-react-app/              # Main React application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── WeatherDashboard.jsx    # Weather display
│   │   │   ├── OutfitBuilder.jsx       # Outfit creation tool
│   │   │   ├── UserProfile.jsx         # User management
│   │   │   ├── MapComponent.jsx        # Location-based features
│   │   │   ├── Modal.jsx               # Dialog component
│   │   │   ├── Navbar.jsx              # Navigation
│   │   │   ├── UVGauge.jsx             # UV index display
│   │   │   ├── BeforeLogin.jsx         # Landing page
│   │   │   ├── SignUpLogin.jsx         # Auth component
│   │   │   └── assets/                 # Images and data
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── backend/               # Express server
│   │   ├── server.js
│   │   └── package.json
│   ├── public/                # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── README.md              # Frontend documentation
│   └── Athire.sql             # Database schema
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MySQL 5.7+ (for backend)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Qandeel-01/Athire.git
cd Athire
```

2. **Frontend Setup**
```bash
cd my-react-app
npm install
```

3. **Configure Environment Variables**
```bash
# Create a .env file in my-react-app directory
cp .env.example .env

# Add your OpenWeather API key
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Get a free API key at: https://openweathermap.org/api

4. **Start Development Server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

5. **Backend Setup** (Optional)
```bash
cd backend
npm install

# Configure your MySQL database
# Update connection details in server.js

# Import database schema
mysql -u your_user -p your_database < ../Athire.sql

npm start
```

## 📝 Available Scripts

### Frontend (my-react-app)
```bash
npm run dev       # Start development server with hot reload
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint to check code quality
```

### Backend
```bash
npm start         # Start Express server
```

## 🎨 Key Components

| Component | Purpose |
|-----------|---------|
| **WeatherDashboard** | Display current weather, UV index, and 5-day forecast |
| **OutfitBuilder** | Create custom outfits by selecting clothing items |
| **UserProfile** | User account management and preference settings |
| **MapComponent** | Search locations and view weather-based data on map |
| **UVGauge** | Visual representation of UV index levels |
| **ActivityCard** | Activity-based outfit recommendations |
| **Modal** | Reusable dialog component for user interactions |

##  Security

- API keys are stored in `.env` files (never committed to git)
- Use `.env.example` as a template for required environment variables
- Always keep your `.env` file in `.gitignore`

## 📱 Responsive Design

The application is fully responsive and supports:
- Desktop (1920px and above)
- Tablets (768px - 1024px)
- Mobile devices (320px - 767px)

##  Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is open source and available under the MIT License - see the LICENSE file for details.

##  Contact

For questions, feedback, or issues:
- Open an issue on [GitHub Issues](https://github.com/Qandeel-01/Athire/issues)
- Email: qandeelf.2003@gmail.com

##  Acknowledgments

- OpenWeather API for weather data
- OpenStreetMap for mapping services
- React and Vite communities for excellent tools
- Material-UI for beautiful components

---

Built with ❤️ by Qandeel-01

**Happy styling! 👕👔👗**
