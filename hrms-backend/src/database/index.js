const mongoose = require("mongoose");
const { DB_MONGO_URL } = require("../config/config");

module.exports = function () {
    mongoose
        .connect(DB_MONGO_URL)
        .then(() => {
            console.log("Database connect 📅");
        })
        .catch((e) => {
            console.log(e);
        });
}
