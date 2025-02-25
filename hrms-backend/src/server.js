const express = require("express");
const cors = require("cors");
const databaseConnect = require("./database/index");
const errorMiddleware = require("./middleware/error");
const router = require("./router");
const { PORT } = require("./config/config");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (_req, res) => {
    res.send("Server start");
})

databaseConnect();

app.use("/api", router);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server start port:${PORT} 🚀`);
})