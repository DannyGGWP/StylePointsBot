var tmi = require('tmi.js'); 
const mysql = require('mysql');
var pointsDB = require("./connections");

var options = {
    options: {
        debug: true
    },
    connection:
    {
        secure: true,
        reconnect: true
    },
    identity:
    {
        username: "Bot-Name",
        password: "OAUTH"
    },
    channels: ['channelName']
};

const client = new tmi.Client(options);

client.connect();

client.on('message',(channel, tags, message, self) => {
    if (self) return; 
    if (message.toLowerCase() === '!register') {
        var query = 'INSERT IGNORE INTO \`stylepointsbot\`.\`points_users\`(`id`,`user`,`points`) VALUES (0, \''+tags.username+'\', 0);';
        pointsDB.query(query,(err,rows,fields)=>{
            if (err) throw err; 
            console.log("Registering new user "+tags.username+"!")
            client.say(channel, `@${tags.username}, registered for style points!`);
        })
    }
    if (message.toLowerCase().startsWith('!givestyle'))
    {
        var input = message.split(' ')[1];
        if (input.count < 2 ) return; 
        if (input.substring(1) === tags.username) {
            client.say(channel, "No Self Awarding of points! cheater!")
            return; 
        } 
        if(tags.mod || tags['user-type'] === 'mod' || tags.badges['broadcaster'] === '1') {
            if (input.startsWith("@"))
            {
                var query = "CALL `stylepointsbot`.`give_points`('"+input.substring(1)+"');"
                console.log(query); 
                pointsDB.query(query,(err,rows,fields)=>{
                    if (err) throw err; 
                    console.log(rows[0][0]); 
                    client.say(channel, input+" was stylin! They have Styled on the haters "+rows[0][0]['points']+" times!")
                });
            }
        }
    }

});