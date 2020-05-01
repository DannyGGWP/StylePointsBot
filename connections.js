const mysql = require('mysql'); 

var config  = {
    host: "localhost",
    user: "ScoutingAppLocal",
    password: "scouting2020",
    database: "scouting_db", 
    multipleStatements: true
}; 
var con = mysql.createConnection(config); 
con.connect((err)=>
{
    if (err) throw err; 
    console.log("Connected!")
})

module.exports = con; 