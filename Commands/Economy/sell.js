const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "bán hàng mà bạn đang có", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    if (!args[0]) return message.reply({ content: `${client.i18n.get(language, "economy", "muonbancainao")}` })
    let result = await client.cs.removeUserItem({
        user: message.author,
        guild: { id : null },
        item: parseInt(args[0])
    });
    if (result.error) {
        if (result.type == 'Invalid-Item-Number') return message.reply({ content: `${client.i18n.get(language, "economy", "nhapdungsomuc")}`})
        if (result.type == 'Unknown-Item') return message.reply({ content: `${client.i18n.get(language, "economy", "muckhongtontai")}` })
    } else {
        message.reply({ content: `${client.i18n.get(language, "economy", "banthanhcong1")} ${result.inventory.name}! ${client.i18n.get(language, "economy", "banthanhcong2")} ${result.inventory.amount} ${client.i18n.get(language, "economy", " ")}!` })
    };
    },
};
