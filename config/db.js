const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect('mongodb+srv://successtogether0303:mvb6Tilr4TJBG3ld@cluster0.xhknjff.mongodb.net/dezigned_db?retryWrites=true&w=majority')
        .then(async () => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}
module.exports = connectDB;
