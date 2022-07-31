const { ButtonBuilder, parseEmoji, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { parse } = require("../../Modules/Includes/commands/emoji");

module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "phóng to emoji", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Utility", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        const emojis = args[0];
        if (!emojis) return message.reply({ content: `${client.i18n.get(language, "utility", "nhapemojis")}` });
        const custom = parseEmoji(emojis);
        const embed = new EmbedBuilder()
            .setTitle(`${client.i18n.get(language, "utility", "banphongtocuaemojis")} ${emojis}`)
            .setColor(database.colors.vang);
        if (custom.id) {
            const link = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`;
            embed.setImage(link)
                .setFooter({ text: `Emoji ID: ${custom.id}`});
            return message.reply({ embeds: [embed] });
        } else {
            const parsed = parse(emojis, { 
                  assetType: "png"
            });
            if (!parsed[0]) return message.reply({ content: `${client.i18n.get(language, "utility", "emoji_wong")}` });
            embed.setImage(parsed[0].url);
            return message.reply({ embeds: [embed] });
        };
    },
};
