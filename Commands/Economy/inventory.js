const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "xem trong kho có những gì", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        let result = await client.cs.getUserItems({
            user: message.author,
            guild: { id: null },
        });
        let inv = result.inventory.slice(0, 10)
        const embed = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "economy", "changcogica")}`)
        for (key of inv) {
            embed.addFields({ name: `**${key.name}:**`, value: `${client.i18n.get(language, "economy", "soluong")}: ${key.amount}`, inline: true });
            embed.setDescription(`${client.i18n.get(language, "economy", "hangtonkho")}`)
    
        }
        message.reply({ embeds: [embed] })
    },
};
