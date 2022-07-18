const express = require("express");
const connectDB = require("./config/db");
const questionRoutes = require("./routes/questionRoute");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const path=require('path')
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


const __dirname1=path.resolve()

if(process.env.NODE_ENV==='production'){

  app.use(express.static(path.join(__dirname1,'/frontend/build')))

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1 + "/frontend/build/index.html"))
  })


}else{
  app.get("/", (req, res) => {
    res.send("api is running");
  });
}


// --------------------------Deployment--------------------------------------------------



app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
