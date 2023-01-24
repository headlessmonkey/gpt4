// const { Bot, GatewayIntentBits } = require("discord.js")
// const { Configuration, OpenAIApi } = require("openai");
// require('dotenv').config()

// const client = new Bot();
// client.on("message", function(message){
//     console.log(message.content)
// });
// client.on("ready", () => { 
//     console.log("Bot is connected and ready!"); 
// });

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
