const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://denisagapov6666:ot7b4bwyk6QOAvuz@cluster0.yksarw0.mongodb.net/scraping', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            suppressReservedKeysWarning: true // Add this option to suppress the warning
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;
