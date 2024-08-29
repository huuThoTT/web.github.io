const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDatabase = require("./utils/db");
const router = require("./routes/router");
dotenv.config();

const Article = require('./models/Article_model');
const Bookmark = require(('./models/Bookmark_model'));
const Category = require(('./models/Category_model'));
const Comment = require(('./models/Comment_model'));
const Notification = require(('./models/Notification_model'));
const Rating = require(('./models/Rating_model'));
const Tag = require(('./models/Tag_model'));
const User = require(('./models/User_model'));

const app = express();

connectToDatabase.connectToDatabase();
app.use(cors());
app.use(express.json());  // Thêm dấu ngoặc đơn ở đây
app.use(cookieParser());
app.use("/v1", router);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
