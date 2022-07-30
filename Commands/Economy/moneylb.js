const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "Xem bảng xếp hạng", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    let data = await client.cs.leaderboard(null);
    if (data.length < 1) return message.reply({ content: `${client.i18n.get(language, "economy", "chuacoaitrongbang")}` });
    const msg = new EmbedBuilder();
    let pos = 0;
    data.slice(0, 10).map(e => {
        pos++
        if (!client.users.cache.get(e.userID)) return;
        msg.addFields({ name: `#${pos} - **${client.users.cache.get(e.userID).username}**`, value: `\n- ${client.i18n.get(language, "economy", "vitien")}: ${emoji.money} **${(e.wallet).toLocaleString()}₫**\n- ${client.i18n.get(language, "economy", "nganhang")}: ${emoji.money} **${(e.bank).toLocaleString()}₫**`, inline: true });
    });
    message.reply({ embeds: [msg] }).catch();
    },
};
