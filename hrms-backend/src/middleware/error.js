const ApiError = require("../utils/error");

module.exports = function (err, _req, res, _next) {
	if (err instanceof ApiError) {
		res.status(200).json({ statusCode: err.statusCode, success: false, message: err.message });
	} else {
		res.status(500).json({ statusCode: 500, success: false, message: "Internal Server Error" });
	}
}
