const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.DB_PORT;

// import the router
const userRouter = require('./routes/userRoute.js');

// users route middleware
app.use("/api/users",userRouter);
// db connection
const dbconnection = require("./DB-folder/dbconfig.js")


    async function start(){
        try {
            await dbconnection.execute("select 'test' ")
            await app.listen(port)
            console.log("database connected")
            console.log(`Listening on ${port}`)
        } catch (error) {
            console.log(error.message)
        }
        }
        start();