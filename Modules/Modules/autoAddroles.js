module.exports = (client) => {
    const name = require("../Includes/commands/path");
    const channels = require("../Json/channell.json");
    const description = {
        name: name.parse(__filename).name,
        filename: name.parse(__filename).name,
        version: "5.0"
    };
    console.log(` :: ⬜️ modules: ${description.name} | Phiên bản đã tải ${description.version} Từ ("${description.filename}")`.red);
    client.on("guildMemberAdd", async member => {
        if(!member.guild) return;
        let roles = channels.ROLES_WELCOME;
        for(let i = 0; i < roles.length; i++ )
        member.roles.add(roles[i]);
    });
};