// db connection
const dbconnection = require("../DB-folder/dbconfig")


async function register(req, res){
    res.send("register")
}

async function login(req, res){
    res.send('login')
}

async function checkUser(req, res){
    res.send('check user')
}
module.exports = {register, login, checkUser}