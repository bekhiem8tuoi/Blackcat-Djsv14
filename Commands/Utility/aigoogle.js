const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "Dành cho thằng nào lười sử dụng google", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Utility", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        if (!args[0]) return message.reply({ content: `${client.i18n.get(language, "utility", "nhapgido")}`});
        const question = encodeURIComponent(args.join(' '));
        const link = `http://letmegooglethat.com/?q=${question}`;
        const embed = new EmbedBuilder()
            .setTitle(`${client.i18n.get(language, "utility", "cautraloi")}`)
            .setURL(link)
            .setFooter({ text: `${client.i18n.get(language, "utility", "clicklinktren")}`});
        message.reply({ embeds: [embed]});
    },
};
