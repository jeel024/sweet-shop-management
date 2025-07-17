const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const sweetRoutes = require('./routes/sweetRoutes');
require('dotenv').config();

const app = express(); 
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use('/api/sweets', sweetRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));