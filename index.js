const { Client_BlackCat, Ready_BlackCat } = require("./Modules/functions");
const { Client, Collection } = require("discord.js");
const client = new Client(Client_BlackCat());
const config = require("./config.json");
const colors = require("colors");
client.maps = new Map();
client.aliases = new Collection();
client.commands = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.categories = require("fs").readdirSync("./Commands");
client.setMaxListeners(100); require('events').defaultMaxListeners = 100;
const { antiCrash } = { "antiCrash": true };
["Commands", antiCrash ? "antiCrash" : null, "Events"]
.forEach(Blackcat => {
    require(`./Handlers/${Blackcat}`)(client);
});
[ "Client-Distube", "empty", "addList", "addSong", "playSong", "errorSong", "searchCancel", "searchNoResult", "finish", "noRelated", "deleteQueue", "searchResult"]
.filter(Boolean)
.forEach(Distube => {
  require(`./Modules/Distube/DistubeEvents/${Distube}`)(client);
});
["messageCreate", "autoconnect", "interactionCreate"]
.filter(Boolean)
.forEach(Distube => {
    require(`./Modules/Distube/DistubeModules/${Distube}`)(client);
});
[ "levels", "welcome","nitroFake","autoAddroles"]
.forEach(Blackcat => {
  require(`./Modules/Modules/${Blackcat}`)(client);
});

client.login(process.env.token || config.token);