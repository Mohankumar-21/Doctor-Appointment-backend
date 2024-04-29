const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async()=> {

    try {

        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected ${mongoose.connection.host}`.bgGreen.white);
    }
    catch (error)
    {
        console.log(`Mongo DB server issuse ${error}`.bgRed.white );
    }
}

module.exports = connectDB;