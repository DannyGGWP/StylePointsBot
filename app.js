var tmi = require('tmi.js'); 
const mysql = require('mysql');
var pointsDB = require("./connections");
// Link to options File where a user would define their specific chat options 
var options = require("./options"); 

const client = new tmi.Client(options);

client.connect();

client.on('message',(channel, tags, message, self) => {
    if (self) return; 
    if (message.toLowerCase() === '!register') {
        var query = `INSERT IGNORE INTO \`stylepointsbot\`.\`points_users\`(\`id\`,\`user\`,\`points\`) VALUES (0, '${tags.username}', 0);`;
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
                var query = `CALL \`stylepointsbot\`.\`give_points\`('${input.substring(1)}');`
                console.log(query); 
                pointsDB.query(query,(err,rows,fields)=>{
                    if (err) throw err; 
                    console.log(rows[0][0]); 
                    client.say(channel, `${input} was stylin! They have Styled on the haters ${rows[0][0]['points']} times!`)
                });
            }
        }
    }
    if (message.toLowerCase().startsWith("!style"))
    {
        try {
            pointsDB.query(`SELECT \`points_users\`.\`points\` FROM \`stylepointsbot\`.\`points_users\` where \`points_users\`.\`user\` = '${tags.username}' ;`,(err,rows,fields)=>{
                if (err) throw err; 
                client.say(channel, `@${tags.username} has ${rows[0]['points']} style points!`)
            })
        } catch (ex)
        {
            console.log(`Caught EXCEPTION: ${ex}`);
        }
    }
    if (message.toLowerCase().startsWith("!rankings"))
    {
        try {
            pointsDB.query(`SELECT \`points_users\`.\`user\`, \`points_users\`.\`points\` FROM \`stylepointsbot\`.\`points_users\` ORDER BY \`points_users\`.\`points\` desc LIMIT 0, 5` , (err, rows, fields) => {
                if (err) throw err; 
                console.log(rows); 
                var rankingMessage = `Top 5 Style Rankings: `
                for(var i = 0; i<rows.length; i++)
                {
                    rankingMessage += `#${i+1} - @${rows[i]['user']} with ${rows[i]['points']}. `;
                }
                client.say(channel, rankingMessage); 
            }); 
        } catch {
            console.log(`Caught EXCEPTION: ${ex}`);
        }
    }
});