const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["ruttien", ""], // lệnh phụ
    description: "lấy tiền ra khỏi ngân hàng", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        let money = args.join(" ");
        if (!money) return message.reply({ content: `${client.i18n.get(language, "economy", "sotienbanmuonrut")}` });

        let result = await client.cs.withdraw({
            user: message.author,
            guild: { id : null },
            amount: money
        });
        if (result.error) {
            if (result.type === 'money') return message.reply({ content: `${client.i18n.get(language, "economy", "sotienbanmuonrut")}`})
            if (result.type === 'negative-money') return message.reply({ content: `${client.i18n.get(language, "economy", "khongtheruttienam")}` })
            if (result.type === 'low-money') return message.reply({ content: `${client.i18n.get(language, "economy", "bankhongdutientrongnganhang")}` })
            if (result.type === 'no-money') return message.reply({ content: `${client.i18n.get(language, "economy", "khongcotienderut")}` })
        } else {
            if (result.type === 'all-success') return message.reply({ content: `${client.i18n.get(language, "economy", "ruttienthanhcong1")}` + `\n${client.i18n.get(language, "economy", "success3")} ${emoji.money} ${await client.cs.format(result.rawData.wallet)} ${client.i18n.get(language, "economy", "all_success2")}\n ${emoji.money} ${await client.cs.format(result.rawData.bank)} ${client.i18n.get(language, "economy", "all_success3")}.` })
            if (result.type === 'success') return message.reply({ content: `${client.i18n.get(language, "economy", "ruttienthanhcong2")} ${emoji.money} ${await client.cs.format(result.amount)} ${client.i18n.get(language, "economy", "all_success3")}.\n${client.i18n.get(language, "economy", "success3")} ${emoji.money} ${await client.cs.format(result.rawData.wallet)} ${client.i18n.get(language, "economy", "all_success2")}\n ${emoji.money} ${await client.cs.format(result.rawData.bank)} ${client.i18n.get(language, "economy", "all_success3")}.` })
        }
    },
};
