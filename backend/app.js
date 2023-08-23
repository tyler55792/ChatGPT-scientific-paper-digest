const path = require("path");
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
require('dotenv').config();

const postRouter = require("./routes/post")
const chatRouter = require("./routes/chat")

// connect to db
dbUrl = process.env.DB_KEY
const mongoDB = dbUrl
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB)
}

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use("/api/posts", postRouter)
app.use("/api/chat", chatRouter)

port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})