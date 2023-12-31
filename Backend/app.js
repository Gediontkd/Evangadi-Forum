const express = require("express");
const app = express();
const port = 5500
// import the router
const userRouter = require('./routes/userRoute.js');

app.use("/api/users",userRouter);
// const dbconnection = require("./db/dbConfig.js")







app.listen(port, (err) =>{
    if(err){
    console.log(err.message)
    } else {
        console.log(`Server is running on ${port}`);
    }
});