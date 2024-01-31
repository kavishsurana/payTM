const express = require("express");
const rootRouter = require("./routes/index")
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:admin@cluster0.72xdtbh.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use("/api/v1", rootRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})