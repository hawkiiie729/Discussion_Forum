const express = require("express");
const connectDB = require("./config/db");
const questionRoutes = require("./routes/questionRoute");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());
app.use("/api/question", questionRoutes);
connectDB();

app.get("/", (req, res) => {
  res.send("api is running");
});

// app.get("/api/question", (req, res) => {
//   res.json(Questions);
// });

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
