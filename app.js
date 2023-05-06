const express = require("express");
const connectDB = require("./config/db");
const questionRoutes = require("./routes/questionRoute");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
app.use("/api/question", questionRoutes);
dotenv.config();
connectDB();

// app.get("/api/question", (req, res) => {
//   res.json(Questions);
// });

// --------------------------Deployment--------------------------------------------------

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

// --------------------------Deployment--------------------------------------------------

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
console.log('hello');
app.listen(PORT, console.log(`server started on port ${PORT}`));
