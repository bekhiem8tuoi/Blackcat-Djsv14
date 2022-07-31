const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const array = require('../../Modules/Json/thinh.json').data;
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "Những câu nói thả thính", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Utility", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        const random = array[Math.floor(Math.random() * array.length)];
        message.reply({ content: `${random}` });
    },
};
