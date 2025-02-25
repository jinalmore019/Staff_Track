const dotenv = require("dotenv");
dotenv.config();

module.exports.PORT = process.env.PORT;
module.exports.DB_MONGO_URL = process.env.DB_MONGO_URL;
module.exports.MAIL_EMAIL = process.env.MAIL_EMAIL;
module.exports.MAIL_PASSWORD = process.env.MAIL_PASSWORD;
module.exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
module.exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
module.exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
module.exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;