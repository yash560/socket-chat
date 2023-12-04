const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        }).then((data) => {
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        });
    } catch (error) {
        console.error(`MongoDB Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;

