const mysql = require('mysql'); 

var config  = {
    host: "localhost",
    user: "user",
    password: "pw",
    database: "stylepointsbot", 
    multipleStatements: true
}; 
var con = mysql.createConnection(config); 
con.connect((err)=>
{
    if (err) throw err; 
    console.log("Connected!")
})

module.exports = con; 