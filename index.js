require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const connectToDb = require("./conn/db_conn");
const morgan = require("morgan");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.json({ Message: "Hello, World!" });
}); 

const user = require("./routes/userRoutes");

app.use("/api/v1", user);

app.listen(process.env.PORT, () => {
  console.log(`Server is runnnig at port ${process.env.PORT}`);
});
