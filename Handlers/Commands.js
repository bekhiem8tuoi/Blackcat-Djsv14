const ascii = require('../Modules/Includes/commands/cmds_log');
const { GiveawaysManager } = require("discord-giveaways");
const database = require("../Modules/Json/database.json");
let table = new ascii('BlackCat - commands');
table.setHeading("Tên file", "Tình trạng");
const { readdirSync, readdir } = require("fs");
module.exports = (client) => {
    try{ 
        client.on("ready", () => {
          require("./setups")(client);
          require("../Modules/language")(client);
          require("../Modules/Databases/Enmap/enmap")(client);
        });
        readdirSync("./Commands/").forEach(dir => {
            const commands = readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith(".js"));
            for (let file of commands) {
                let pull = require(`../Commands/${dir}/${file}`);
                if (pull.name) {
                    client.commands.set(pull.name, pull);
                    table.addRow(file, '✔ => Sẵn sàng');
                } else {
                    table.addRow(file, '❌ => thiếu help name');
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
            }
        });
        console.log(table.toString().blue);
    } catch(err){
        console.log(err);
    };
    /**
     **  Giveaway create
    **/
    client.giveawaysManager = new GiveawaysManager(client, {
       storage: "./Modules/Json/giveaways.json",
       default: {
         botsCanWin: false,
         embedColor: database.colors.vang,
         reaction: "🎉",
       },
     });
     readdir("./Modules/Giveaways", (_err, files) => {
       files.forEach((file) => {
         if (!file.endsWith(".js")) return;
         const event = require(`../Modules/Giveaways/${file}`);
         let eventName = file.split(".")[0];
         client.giveawaysManager.on(eventName, (...file) => event.execute(...file, client)), delete require.cache[require.resolve(`../Modules/Giveaways/${file}`)];
       });
     });
};
