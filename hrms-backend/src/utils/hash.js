const bcrypt = require("bcrypt");

module.exports.hashPassword = function (password) {
    return bcrypt.hashSync(password, 8);
}
module.exports.compareHash = function (password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
}
