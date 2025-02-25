const multer = require("multer");
const fs = require("fs");


const storage = multer.diskStorage({
    destination: async (_req, _file, cb) => {
        if (!fs.existsSync("./uploads")) {
            fs.mkdirSync("./uploads");
        }
        cb(null, "./uploads");
    },
    filename: (_req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
module.exports = upload;
