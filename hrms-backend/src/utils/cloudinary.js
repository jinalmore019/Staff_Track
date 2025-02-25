const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } = require("../config/config");

const cloudiary = require("cloudinary").v2;

cloudiary.config({
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
	cloud_name: CLOUDINARY_CLOUD_NAME,
});

module.exports = cloudiary;