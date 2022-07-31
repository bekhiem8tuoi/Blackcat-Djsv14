/***
   * commands
***/
const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        // commands
    },
};
// modules
module.exports = (client) => {
    const name = require("../Includes/commands/path");
    const description = {
        name: name.parse(__filename).name,
        filename: name.parse(__filename).name,
        version: "5.0"
    };
    console.log(` :: ⬜️ modules: ${description.name} | Phiên bản đã tải ${description.version} Từ ("${description.filename}")`.red);
    // code
};

// thay đổi ngôn nghữ
${client.i18n.get(client.language, "tên folder commands", "ngôn ngữ")}
