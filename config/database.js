const mongoose = require("mongoose");

// EXAMPLE MONGODB_URI =  mongodb://localhost:27017/<databaseName>

const configureDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI || process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("\x1b[94mDB connected - <DatabaseName>\x1b[39m");
    })
    .catch((err) => {
      console.log("error", err);
    });
};

module.exports = configureDB;
