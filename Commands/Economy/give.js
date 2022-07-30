const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["goitien", "bantien"], // lệnh phụ
    description: "gởi tiền cho một ai đó", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = await message.guild.members.fetch(args[0]);
            if (user) user = user.user;
        };
        if (!user) return message.reply({ content: `${client.i18n.get(language, "economy", "cungcapnguoidunghople")}` });

        if (user.bot || user === client.user) return message.reply({ content: `${client.i18n.get(language, "economy", "khongchuyentienchobots")}` });
        if (!client.users.cache.get(user.id) || !user) return message.reply({ content: `${client.i18n.get(language, "economy", "quyendecapnguoidung")}` });

        let amount = args[1];
        if (!amount) return message.reply({ content: `${client.i18n.get(language, "economy", "nhapsotien")}` });
        if (amount.includes("-")) return message.reply({ content: `${client.i18n.get(language, "economy", "negative_money")}` })
        let money = parseInt(amount);

        let result = await client.cs.transferMoney({
            user: message.author,
            user2: user,
            guild: { id : null },
            amount: money
        });
        if (result.error) return message.reply({ content: `${client.i18n.get(language, "economy", "low_money")}` });
        else message.reply({ content: `**${message.author.username}**, ${client.i18n.get(language, "economy", "chuyenthanhcong")} **${await client.cs.format(result.money)}** ${client.i18n.get(language, "economy", "cho")} **${result.user2.username}**` }) 
    },
};
