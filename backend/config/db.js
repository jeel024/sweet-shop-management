const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://jeel:jeel@cluster0.px2pswk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('DB Connection Error:', err.message);
        process.exit(1);
    } 
};

module.exports = connectDB;
 