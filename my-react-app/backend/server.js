const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;  // or any other port you want to use
let isDbConnected = false;

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root', // your MySQL username
  password: process.env.DB_PASSWORD || 'MoaEngene03', // your MySQL password
  database: process.env.DB_NAME || 'athire', // name of your database
  port: process.env.DB_PORT || 3306
});

// Connect to the database
db.connect((err) => {
  if (err) {
    isDbConnected = false;
    console.error('MySQL connection failed:', err.message);
    return;
  }
  isDbConnected = true;
  console.log('Connected to MySQL');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

const ensureDbConnection = (req, res, next) => {
  if (!isDbConnected) {
    return res.status(503).send({
      success: false,
      message: 'Database is not connected. Please start MySQL and try again.'
    });
  }
  next();
};


app.post('/athire', ensureDbConnection, (req, res) => {
  const { action, email, password, firstName, lastName, dateOfBirth, gender, city, province, country } = req.body;

  // Validate if action is provided
  if (!action) {
    return res.status(400).send({ success: false, message: 'Action is required (signup or login).' });
  }

  // Validate action type
  if (!['signup', 'login'].includes(action)) {
    return res.status(400).send({ success: false, message: 'Invalid action. Action must be either "signup" or "login".' });
  }

  // Validate required fields based on action
  if (action === 'signup') {
    if (!email || !password || !firstName || !lastName || !dateOfBirth || !gender || !city || !province || !country) {
      return res.status(400).send({
        success: false,
        message: 'Missing required fields for signup: email, password, firstName, lastName, dateOfBirth, gender, city, province, country.',
      });
    }

    // Check if email already exists
    db.query('SELECT * FROM user WHERE Email = ?', [email], (err, results) => {
      if (err) return res.status(500).send({ success: false, message: 'Server error' });
      if (results.length > 0) return res.status(400).send({ success: false, message: 'Email already in use' });

      // Hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send({ success: false, message: 'Error hashing password' });

        // Insert user into database
        const query =
          'INSERT INTO user (FName, LName, Date_of_Birth, Gender, City, Province, Country, Email, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [firstName, lastName, dateOfBirth, gender, city, province, country, email, hashedPassword];

        db.query(query, values, (err, result) => {
          if (err) {
            console.error('Error executing query:', err); // Log the actual error
            return res.status(500).send({ success: false, message: 'Error registering user' });
          }
          res.status(200).send({ success: true, message: 'Signup successful!' });
        });
      });
    });
  } else if (action === 'login') {
    if (!email || !password) {
      return res.status(400).send({ success: false, message: 'Missing required fields for login: email and password.' });
    }

    // Check if the user exists
    db.query('SELECT * FROM user WHERE Email = ?', [email], (err, results) => {
      if (err) return res.status(500).send({ success: false, message: 'Server error' });
      if (results.length === 0) return res.status(400).send({ success: false, message: 'Invalid credentials' });

      // Compare passwords
      bcrypt.compare(password, results[0].Password, (err, isMatch) => {
        if (err) return res.status(500).send({ success: false, message: 'Error checking password' });
        if (!isMatch) return res.status(400).send({ success: false, message: 'Invalid credentials' });

        res.status(200).send({
          success: true,
          message: 'Login successful!',
          user: {
            id: results[0].id,
            email: results[0].Email,
            firstName: results[0].FName,
            lastName: results[0].LName,
            gender: results[0].Gender,
            city: results[0].City,
            province: results[0].Province,
            country: results[0].Country,
          },
        });
      });
    });
  }
});


// app.post('/weather', (req, res) => {
//   const {
//     temperature,
//     feelsLike,
//     wind,
//     pressure,
//     humidity,
//     visibility,
//     uvIndex,
//     location,
//   } = req.body;

//   // Validate input
//   if (!temperature || !feelsLike || !wind || !pressure || !humidity || !visibility || !location) {
//     return res.status(400).send({ success: false, message: 'Missing required fields.' });
//   }

//   // Insert weather data into the table
//   const query = `
//     INSERT INTO weather (Temperature, Feels_Like, Wind, Pressure, Humidity, Visibility, UV_Index, Location)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     temperature,
//     feelsLike,
//     wind,
//     pressure,
//     humidity,
//     visibility,
//     uvIndex || null, // Allow UV Index to be NULL
//     location,
//   ];

//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.error('Error inserting weather data:', err);
//       return res.status(500).send({ success: false, message: 'Error saving weather data.' });
//     }

//     res.status(200).send({ success: true, message: 'Weather data saved successfully!', data: result });
//   });
//   res.status(200).send({
//     success: true,
//     message: 'Added successful!',
//     user: {
//       id: results[0].id,
//       temperature: results[0].Temperature,
//       feelslike: results[0].Feels_Like,
//       wind: results[0].Wind,
//       pressure: results[0].Pressure,
//       humidity: results[0].Humidity,
//       visibility: results[0].Visibility,
//       uvIndex: results[0].UV_Index,
//       location: results[0].Location,
//     },
//   });
// });

app.post('/weather', ensureDbConnection, (req, res) => {
  const {
    temperature,
    feelsLike,
    wind,
    pressure,
    humidity,
    visibility,
    uvIndex,
    location,
  } = req.body;

  // Validate input
  if (!temperature || !feelsLike || !wind || !pressure || !humidity || !visibility || !location) {
    return res.status(400).send({
      success: false,
      message: 'Missing required fields.'
    });
  }

  // Insert weather data into the table
  const query = `
    INSERT INTO weather (Temperature, Feels_Like, Wind, Pressure, Humidity, Visibility, UV_Index, Location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    temperature,
    feelsLike,
    wind,
    pressure,
    humidity,
    visibility,
    uvIndex || null, // Allow UV Index to be NULL
    location,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting weather data:', err);
      return res.status(500).send({
        success: false,
        message: 'Error saving weather data.'
      });
    }

    // Check if the data was inserted successfully
    if (result.affectedRows > 0) {
      // Optionally, you can fetch the inserted row if needed
      const insertId = result.insertId;

      // Send success response with the inserted data
      return res.status(200).send({
        success: true,
        message: 'Weather data saved successfully!',
        data: {
          id: insertId,
          temperature,
          feelsLike,
          wind,
          pressure,
          humidity,
          visibility,
          uvIndex: uvIndex || null,
          location
        }
      });
    } else {
      return res.status(500).send({
        success: false,
        message: 'Failed to insert weather data.'
      });
    }
  });
});



// db.query(insertWeatherQuery, weatherValues, (err, result) => {
//   if (err) {
//       console.error(err);
//       return res.status(500).send('Error storing weather data.');
//   }

//   // Fetch recommendations based on weather type
//   const fetchRecommendationsQuery = `
//       SELECT o.Outfit_Name, o.Outfit AS Outfit_Icon, 
//              a.Activity_Name, a.Activity AS Activity_Icon
//       FROM recommendations r
//       JOIN outfit o ON r.outfit_id = o.O_ID
//       JOIN activity a ON r.activity_id = a.A_ID
//       WHERE r.weather_condition = (
//           SELECT Weather_Type 
//           FROM weather 
//           WHERE WeatherID = ?
//       )
//   `;

//   const weatherId = result.insertId; // Get the ID of the inserted weather record

//   db.query(fetchRecommendationsQuery, [weatherId], (err, recResults) => {
//       if (err) {
//           console.error(err);
//           return res.status(500).send('Error fetching recommendations.');
//       }

//       res.status(200).json({
//           success: true,
//           data: recResults
//       });
//   });
// });



app.get('/weather/recommendations', ensureDbConnection, (req, res) => {
  const location = req.query.location;  // Get location from query parameter
  
  // Fetch the weather data from the database (e.g., for the user's location)
  db.query('SELECT * FROM athire.weather WHERE Location = "Lahore"', [location], (err, results) => {
    if (err) return res.status(500).send({ success: false, message: 'Server error' });

    if (results.length === 0) return res.status(400).send({ success: false, message: 'Weather data not found' });

    // Get the weather data from the first result
    const weather = results[0];

    // Determine weather conditions
    const temperature = parseFloat(weather.Temperature);
    const weatherType = weather.Weather_Type;

    // Define recommendations based on weather conditions
    let recommendedOutfits = [];
    let recommendedActivities = [];

    if (weatherType === 'Hot') {
      recommendedOutfits = ['Shorts', 'T-shirt', 'Flip Flops', 'Sunglasses'];
      recommendedActivities = ['Swimming', 'Running', 'Cycling'];
    } else if (weatherType === 'Warm') {
      recommendedOutfits = ['Jeans', 'Blouse', 'Hat'];
      recommendedActivities = ['Hiking', 'Running', 'Basketball'];
    } else if (weatherType === 'Cool') {
      recommendedOutfits = ['Sweater', 'Jeans', 'Boots'];
      recommendedActivities = ['Cycling', 'Soccer', 'Tennis'];
    } else if (weatherType === 'Cold') {
      recommendedOutfits = ['Coat', 'Scarf', 'Boots', 'Sweater Dress'];
      recommendedActivities = ['Indoor Yoga', 'Rock Climbing', 'Boxing'];
    } else if (weatherType === 'Freezing') {
      recommendedOutfits = ['Hoodie', 'Sweatpants', 'Gloves', 'Beanie'];
      recommendedActivities = ['Indoor Weightlifting', 'Indoor Yoga'];
    }

    // Send the response with the recommendations
    res.status(200).send({
      success: true,
      outfits: recommendedOutfits,
      activities: recommendedActivities
    });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});