const Eris = require("eris");
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
//console.log(process.env)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
function splitString(stringToSplit, separator) {
    var arrayOfStrings = stringToSplit.split(separator)};
tochka= "."    
const openai = new OpenAIApi(configuration);
const bot = new Eris(process.env.DISCORD_BOT_TOKEN /*, {
   intents: [
        "guildMessages",
        "guildChannels",
        "guilds"
        ]
}*/);
async function runCompletion (message) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        temperature:0.2,
        max_tokens: 1000,
    });
    return completion.data.choices[0].text;
}
bot.on("message",function(message){});  
bot.on("ready", () => { 
    console.log("Bot is connected and ready!"); 
});

bot.on("error", (err) => {
  console.error(err); 
});

var request = require('request');


bot.on("messageCreate", async (msg) => {
    //console.time('a')
     //console.log(msg.id)
    
    if(msg.author.id == bot.user.id) return;
    if(msg.content.startsWith("")) {

        msg.channel.sendTyping()

        var typingInterval = setInterval(() => {
            msg.channel.sendTyping()
        }, 10000);
        //console.timeEnd('a')
        request({
            url: `https://discord.com/api/v9/channels/${msg.channel.id}/messages?limit=10`,
            headers: {
              'authorization': process.env.DISCORD_BOT_TOKEN
            }
          }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
    
            var messages = JSON.parse(body)
            //console.log(messages.find(val => val.id == msg.id));
            var message = messages.find(val => val.id == msg.id)

              runCompletion(message.content).then(result => {
                console.log(`${msg.content} -> ${result}`)
                if(!result) return;
                clearInterval(typingInterval);
                bot.createMessage(msg.channel.id, result.substring(0, 1900))
            });
            }
        });

    } 
});

bot.connect();


//await message.channel.sendTyping();
//await message.channel.send("Hello World!");

//function splitString(stringToSplit, separator) {
//    var arrayOfStrings = stringToSplit.split(separator);

/*client.on('messageCreate', message => { 
message.channel.send('1st message')
wait(5000)
message.channel.send('2nd message')
wait(5000) 
message.channel.send('3rd message')
}) */

