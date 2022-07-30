const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "sử dụng món đồ mà bạn có", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    let item = args[0];
    if (!item) return message.reply({ content: `${client.i18n.get(language, "economy", "bandungmongi")}`})
    let haveItem = false;
    const arr = await client.cs.getUserItems({
        user: message.author,
        guild: { id: null },
    })
    for (key of arr.inventory) {
        if (key.name.toLowerCase().includes(item.toLowerCase())) haveItem = true
    };
    if (haveItem) {
        let money = Math.floor((Math.random() * 10) + 1) * 100 
        let result = await client.cs.addMoney({
            user: message.author,
            guild: { id: null },
            amount: money,
            wheretoPutMoney: 'wallet'
        });
        if (result.error) {
            console.log(result)
            return message.reply({ content: `${client.i18n.get(language, "economy", "error_money")}`})
        } else return message.reply({ content: `${client.i18n.get(language, "economy", "sudungitem")} `+ item +` ${client.i18n.get(language, "economy", "vakiemduoc")} `+ money })

    } else {
      return message.reply({ content: `${client.i18n.get(language, "economy", "muahangtruoc")}`})
    }
    },
};
