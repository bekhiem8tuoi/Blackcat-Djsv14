const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "xem cửa hàng có những gì", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        let result = await client.cs.getShopItems({
            guild: { id: null }
        });
        let inv = result.inventory;
        const embed = new EmbedBuilder()
            .setDescription('Shop!')
        for (let key in inv) {
            embed.addFields({ name: `${parseInt(key) + 1} - ${client.i18n.get(language, "economy", "giatien")}: $${inv[key].price} - **${inv[key].name}:**`, value:  inv[key].description, inline: true })
        }
        message.reply({ embeds: [embed] });
    },
};
