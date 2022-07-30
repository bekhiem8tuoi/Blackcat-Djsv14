const ascii = require('../Modules/Includes/commands/cmds_log');
let table = new ascii('VinhBot - Commands');
table.setHeading("Tên file", "Tình trạng");
const { readdirSync } = require("fs");
module.exports = (client) => {
    try{ 
        client.on("ready", () => {
          require("./setups")(client);
          require("../Modules/language")(client);
          require("../Modules/Databases/Enmap/enmap")(client);
        });
        readdirSync("./commands/").forEach(dir => {
            const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
            for (let file of commands) {
                let pull = require(`../commands/${dir}/${file}`);
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
};