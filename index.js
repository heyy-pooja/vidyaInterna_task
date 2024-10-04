const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.static("dist"));
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));

app.use("/api/user", require("./routes/user.routes"));

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found" });
    // res.sendFile(path.join(__dirname, "dist", "index.html"))
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: `server error ${err.message}` });
});

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.once("open", () => {
    console.log("MONGO_CONNECTED ");
    app.listen(process.env.PORT, () => {
        console.log("SERVER RUNNING 🏃‍♂️");
    });
});