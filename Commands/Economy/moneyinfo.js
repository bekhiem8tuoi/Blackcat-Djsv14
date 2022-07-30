const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "xem các lệnh eco mà bạn có thể sử dụng", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    let result = await client.cs.info(message.author, message.guild.id);
    const embed = new EmbedBuilder()
        .setDescription(`${client.i18n.get(language, "economy", "thongtinve")}` + message.author.tag);
    let unUsed = '';
    let cantBeUsed = '';
    for (const [key, value] of result.info) {
        if (value.used) unUsed += `- ${key}\n`;
        else cantBeUsed += `- ${key} ( ${value.timeLeft} )\n`;
    }
    embed.addFields({ name: `${client.i18n.get(language, "economy", "lenhcothesudung")}`, value: unUsed || `${client.i18n.get(language, "economy", "khongco")}`, inline: true });
    embed.addFields({ name: `${client.i18n.get(language, "economy", "lenhkhongthesudung")}`, value: cantBeUsed || `${client.i18n.get(language, "economy", "khongco")}`, inline: true });
    message.reply({ embeds: [embed] });
    },
};
