// db connection
const dbconnection = require("../DB-folder/dbconfig")


async function register(req, res){
    const{username, firstname, lastname, email, password} = req.body;
    // console.log(req.body);
    if (!username || !firstname || !lastname || !email || !password){
        return res.status(400).json({message: "Please fill all fields"});
    }
    
   

try {
    const [user] = await dbconnection.query("SELECT userid, username from users where username = ? or email = ?", [username, email])
   if (user.length > 0){
    return res.status(400).json({msg:"user already registered!"});
   }
   if (password.length < 8){
   return res.status(400).json({msg:"password must be at least 8 characters!"});
   }

    await dbconnection.query("INSERT INTO users (username, firstname, lastname, email, password) values (?,?,?,?,?)", [username, firstname, lastname, email, password])
    return res.status(201).json({ msg: "user registered!"});
} catch (error) {
    console.log(error.message)
    res.status(500).json({msg: "Something went wrong, try again later!"})
}

}

async function login(req, res){
    res.send('login')
}

async function checkUser(req, res){
    res.send('check user')
}
module.exports = {register, login, checkUser}