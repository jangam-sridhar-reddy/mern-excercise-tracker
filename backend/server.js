const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
const uri = process.env.ATLAS_URI;
// const uri =
//   "mongodb+srv://sridhartest:sridhartest@test.avamq.mongodb.net/test?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );

  console.log(mongoose.connection.readyState);
} catch (e) {
  console.log("could not connect");
}

const excerciseRouter = require("./routes/excercise");
const userRouter = require("./routes/user");

app.use("/excercise", excerciseRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
