
const Eris = require("eris");
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
//console.log(process.env)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
// function splitString(stringToSplit, separator) {
//     var arrayOfStrings = stringToSplit.split(separator)};
// tochka= "."    
const openai = new OpenAIApi(configuration);
const bot = new Eris(process.env.DISCORD_BOT_TOKEN, {
    intents: [
        "guildMessages",
        "guildChannels",
        "guilds"
        ]
});
async function runCompletion (message) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        temperature: 1.3,
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


var personality = true
bot.on("messageCreate", async (msg) => {
    //console.log(bot, bot.bot)
    //if(msg.author.id == bot.user.id) return;
    if(msg.content.startsWith("")) {
        //console.log(msg.content)
        //console.log(msg.channel)
        //const channel = await bot.channels.cache.fetch(msg.channel.id);
        msg.channel.sendTyping();
       
        runCompletion(msg.content.replace('Alice: ', '').replace('Bob: ', '').substring(1)).then(result => {
            console.log(`${msg.content} -> ${result}`)
            if(!result) return;
            bot.createMessage(msg.channel.id, `${personality ? 'Alice: ' : "Bob: "}` + result.splice(0, 1900))
            personality = !personality
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
})  */