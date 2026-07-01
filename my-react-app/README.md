# Athire - Smart Fashion & Weather App

Athire is an intelligent fashion recommendation application that combines weather data with outfit suggestions. Users can explore curated outfits, check UV levels, and make personalized fashion choices based on real-time weather conditions.

## Features

- **Weather Dashboard**: Real-time weather information with UV gauge
- **Outfit Builder**: Create and customize outfits for different occasions
- **Activity-Based Recommendations**: Get outfit suggestions based on planned activities
- **User Profile**: Manage personal preferences and saved outfits
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive UI**: Modern, intuitive user interface built with React

## Tech Stack

**Frontend:**
- React 18+
- Vite (Build tool)
- Tailwind CSS (Styling)
- PostCSS (CSS processing)
- ESLint (Code quality)

**Backend:**
- Node.js & Express
- MySQL (Database)

## Project Structure

```
Athire/
├── src/
│   ├── components/          # React components
│   │   ├── WeatherDashboard.jsx
│   │   ├── OutfitBuilder.jsx
│   │   ├── UserProfile.jsx
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── backend/
│   ├── server.js           # Express server
│   └── package.json
├── public/                 # Static assets
├── package.json
├── vite.config.js
├── tailwind.config.js
└── Athire.sql             # Database schema
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MySQL (for backend)

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/Qandeel-01/Athire.git
cd Athire
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure your MySQL database and update connection details in `server.js`

4. Import the database schema:
```bash
mysql -u your_user -p your_database < ../Athire.sql
```

5. Start the backend server:
```bash
npm start
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start the server

## Key Components

- **WeatherDashboard**: Displays current weather and UV index
- **OutfitBuilder**: Interactive tool for creating outfits with available clothing items
- **UserProfile**: User account management and preferences
- **Navbar**: Navigation component
- **Modal**: Reusable modal component for dialogs
- **MapComponent**: Location-based services
- **ActivityCard**: Recommendations based on activities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

For questions or feedback, please reach out via GitHub Issues.

---

Built with ❤️ by the Athire Team
