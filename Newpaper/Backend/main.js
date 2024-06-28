const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDatabase = require("./utils/db");
const router = require("./routes/router");
dotenv.config();

const app = express();

connectToDatabase.connectToDatabase();
app.use(cors());
app.use(express.json());  // Thêm dấu ngoặc đơn ở đây
app.use(cookieParser());
app.use("/v1", router);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
