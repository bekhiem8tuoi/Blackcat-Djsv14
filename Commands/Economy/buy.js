const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["muahang", ""], // lệnh phụ
    description: "mua vật phẩm từ cửa hàng", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    let thing = args[0];
    if (!thing) return message.reply({ content: `${client.i18n.get(language, "economy", "cungcapsomathang1")}`})
    if (isNaN(thing)) return message.reply({ content: `${client.i18n.get(language, "economy", "cungcapsomathang2")}` })
    let result = await client.cs.buy({
        user: message.author,
        guild: { id: null },
        item: parseInt(args[0])
    });
    if (result.error) {
        if (result.type === 'No-Item') return message.reply({ content: `${client.i18n.get(language, "economy", "cungcapsomathang2")}`});
        if (result.type === 'Invalid-Item') return message.reply({ content: `${client.i18n.get(language, "economy", "Invalid_Item")}`});
        if (result.type === 'low-money') return message.reply({ content: `${client.i18n.get(language, "economy", "low_money2")}`});
    } else {
      return message.reply({ content: `${client.i18n.get(language, "economy", "muathanhcong")} \`${result.inventory.name}\`\n${client.i18n.get(language, "economy", "voigia")} **${emoji.money} ${await client.cs.format(result.inventory.price)}**` })
    };
    },
};
