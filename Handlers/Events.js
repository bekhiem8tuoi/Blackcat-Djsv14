const ascii = require("../Modules/Includes/commands/cmds_log");
const fs = require("fs");
let table = new ascii("Events");
table.setHeading("Tên file", "Trạng thái");
const allevents = [];
module.exports = async (client) => {
    try {
        let amount = 0;
        const load_dir = (dir) => {
            const event_files = fs.readdirSync(`./Events/${dir}`).filter((file) => file.endsWith(".js"));
            for (const file of event_files) {
                try {
                    const event = require(`../Events/${dir}/${file}`)
                    let eventName = file.split(".")[0];
                    allevents.push(eventName);
                    client.on(eventName, event.bind(null, client));
                    table.addRow(file, '✔ => Sẵn sàng');
                    amount++;
                } catch (e) {
                    table.addRow(file, '❌ => thiếu help name')
                    console.log(e)
                }
            }
        }
        await ["Guilds", "Client", "EventsCreate"].forEach(e => load_dir(e));
    } catch (e) {
        console.log(String(e.stack))
    }
   console.log(table.toString().red);
};