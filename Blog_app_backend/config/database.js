
const mongoose = require("mongoose");

 require("dotenv").config();
const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=> console.log("dbconnection successful"))
    .catch((error)=>{
        console.log("dbconnection problems");
        console.error(error);
        process.exit(1);
    })
}

module.exports = dbConnect