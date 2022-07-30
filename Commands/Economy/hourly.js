const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "một cách để có tiền", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        let result = await client.cs.hourly({
            user: message.author,
            guild: { id: null},
            amount: Math.floor(Math.random() * 3000) + 1,
    
        });
        if (result.error) return message.reply({ content: `${client.i18n.get(language, "economy", "thulaisau_money")} ${result.time}`});
        else message.reply({ content: `${client.i18n.get(language, "economy", "xintienthanhcong")} ${emoji.money} ${await client.cs.format(result.amount)}.`})
    
    },
};