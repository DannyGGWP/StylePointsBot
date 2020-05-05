# StylePointsBot
This is a Chat bot that will uses a simple MySQL database to register users for style points. Mods and the streamer Can award points with !givestye @username 
## Set Up instructions 
You need a few things to get started. 
1. A MySQL database to connect to.
2. Node JS 
3. A file called options.js that contains the options object that contains the Options object for TMI.js it should look something like this 
```
var chatOptions = {
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
        username: "BOT CHANNEL",
        password: "oauth:BOT-OAUTH"
    },
    channels: ['Streamer Channel to Connect too']
};

module.exports = chatOptions; 
``` 
