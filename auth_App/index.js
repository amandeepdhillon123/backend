require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./config/db.js")
const PORT = process.env.PORT || 4000;
const router = require("./rotues/authRoutes.js")

app.use(express.json());
app.use("/api/v1",router)

dbConnect();

app.listen(PORT,()=>{
    console.log(`server starts at port number ${PORT}`)
});


app.get("/",(req,res)=>{
    res.send("<h1>hello server starts</h1>")
})

