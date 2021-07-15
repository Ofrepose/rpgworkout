const express = require('express');
// bring in database connection from mongoatlas
const connectDB = require('./config/db');

const app = express();

// handle JSON requests
app.use(express.json({ extended: false }));

//variables
const PORT = process.env.PORT || 5000;

// connect database
connectDB();

//Routes
app.get('/', (req, res) => res.send('API running'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));



app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
