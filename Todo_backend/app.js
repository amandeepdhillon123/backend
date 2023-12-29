require("dotenv").config();
const express= require("express");
const app= express();
const dbConnect= require("./config/dataBase")
const todoRoutes= require("./route/todoRoute")
 const cors= require("cors")
const PORT = process.env.PORT || 8013;

app.use(express.json());
app.use(cors());

app.use("/api/v1", todoRoutes);

dbConnect();

app.listen(PORT,(req,res)=>{
   console.log(`app runs on PORT ${PORT}`)
})
app.get('/',(req,res)=>{
   res.send("<h1>hello jii</h1>")
})
