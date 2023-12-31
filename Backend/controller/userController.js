// db connection
const dbconnection = require("../DB-folder/dbconfig")
const bcrypt = require("bcrypt")
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res){
    const{username, firstname, lastname, email, password} = req.body;
    // console.log(req.body);
    if (!username || !firstname || !lastname || !email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Please fill all fields"});
    }
    
   
try {
    const [user] = await dbconnection.query("SELECT userid, username from users where username = ? or email = ?", [username, email])
   if (user.length > 0){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already registered!"});
   }
   if (password.length < 8){
   return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be at least 8 characters!"});
   }
//    incrypt the password
     const salt = await bcrypt.genSalt(10);
     var hashedPassword= await bcrypt.hash(password, salt);

    await dbconnection.query("INSERT INTO users (username, firstname, lastname, email, password) values (?,?,?,?,?)", [username, firstname, lastname, email, hashedPassword])
    return res.status(StatusCodes.CREATED).json({ msg: "user registered!"});
} catch (error) {
    console.log(error.message)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong, try again later!"})
}

}

async function login(req, res){
    const{email, password} = req.body;
    if (!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Please enter all required fields"});
    }

    try {
        const [user] = await dbconnection.query("SELECT userid, username, password from users where email = ?", [email])
   if (user.length == 0){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential!"});
   }
        //   Compare Password
        const isMatch = await bcrypt.compare(password, user[0].password);
        if(!isMatch){
            return res.status(StatusCodes.UNAUTHORIZED).json({msg:'Invalid Credentials'});
        }
        const username = user[0].username
        const userid = user[0].userid
       const token = jwt.sign({username, userid}, "secret", {expiresIn: "1d"})

       return res.status(StatusCodes.OK).json({msg: "User Login Successfully!", token})
         

    } catch (error) {
        console.log(error.message)
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong, try again later!"})
    }

    // res.send('login')
}

async function checkUser(req, res){
    res.send('check user')
}
module.exports = {register, login, checkUser}