const express = require('express');
const connectDB = require('./config/db');
const sweetRoutes = require('./routes/sweetRoutes');

const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use('/api/sweets', sweetRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));