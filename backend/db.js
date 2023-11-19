const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/customers";


const connectTOMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected TO Mongo successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

module.exports = connectTOMongo;
