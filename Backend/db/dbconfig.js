const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
    user: "evangadi-admin",
    host: "localhost",
    password: "12345",
    database: "evangadi-db",
    connectionLimit: 10
})

// dbconnection.execute("select 'test' ", (err, result) => {
// if(err){
//     console.log(err.message)
// } else {
//     console.log(result)
// }
// })
dbconnection.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports=dbconnection.promise()
