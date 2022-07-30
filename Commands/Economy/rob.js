const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "cướp 1 ai đấy", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]);
            if (user) user = user.user;
        }
        if (user.bot || user === client.user) return message.reply({ content: `${client.i18n.get(language, "economy", "nguoidunglabot")}`});
        if (!user) return message.reply({ content: `${client.i18n.get(language, "economy", "quyendecapnguoidung")}`});

        let result = await client.cs.rob({
            user: message.author,
            user2: user,
            guild: { id: null },
            minAmount: 100,
            successPercentage: 5,
            maxRob: 10000
        });
        if (result.error) {
            if (result.type === 'time') return message.reply({ content: `${client.i18n.get(language, "economy", "dacuopganday")} ${result.time}`});
            if (result.type === 'low-money') return message.reply({ content: `${client.i18n.get(language, "economy", "canitnhat1")} ${await client.cs.format(result.minAmount)} ${client.i18n.get(language, "economy", "canitnhat2")}.`});
            if (result.type === 'low-wallet') return message.reply({ content: `${result.user2.username} ${client.i18n.get(language, "economy", "coithon1")} ${await client.cs.format(result.minAmount)} ${client.i18n.get(language, "economy", "coithon2")}.`})
            if (result.type === 'caught') return message.reply({ content: `${message.author.username} ${client.i18n.get(language, "economy", "bandacuop1")} ${result.user2.username} ${client.i18n.get(language, "economy", "bandacuop2")} ${await client.cs.format(result.amount)} ${client.i18n.get(language, "economy", "cho")} ${result.user2.username}!`})
        } else {
            if (result.type === 'success') return message.reply({ content: `${message.author.username} ${client.i18n.get(language, "economy", "bandacuop1")} ${result.user2.username} ${client.i18n.get(language, "economy", "bandacuop3")} ${await client.cs.format(result.amount)}!`})

        }
    },
};
