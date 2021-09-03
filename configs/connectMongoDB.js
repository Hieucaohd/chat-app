const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(
        MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    ).then(() => {
        console.log("Successfully connect to database.");
    }).catch(error => {
        console.log("failed connect to database, exit now...");
        console.error(error);
        process.exit(1);
    })
}