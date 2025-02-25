const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/config");

const createToken = (data, expiresIn) => {
    if (expiresIn) {
        return jwt.sign(data, JWT_SECRET_KEY, { expiresIn });
    }
    return jwt.sign(data, JWT_SECRET_KEY);
}

function verifyToken(token) {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decoded && decoded.exp && decoded.exp < currentTimestamp) {
        return { valid: false, expired: true };
    } else {
        return { valid: true, expired: false, decoded };
    }
}


module.exports = { createToken, verifyToken }