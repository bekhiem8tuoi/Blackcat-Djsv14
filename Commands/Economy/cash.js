const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["sodu", "taikhoan"], // lệnh phụ
    description: "xem số dư của bạn", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        let user = message.author;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = await message.guild.members.fetch(args[0]);
            if (user) user = user.user;
        }
        let result = await client.cs.balance({
            user: user,
            guild: { 
              id : null
            }
        });
        message.reply({ embeds: [new EmbedBuilder()
                .setColor(database.colors.vang)
                .setTitle(`${client.i18n.get(language, "economy", "sodumoney")}`)
                .setDescription(`${user.tag}\n\n${client.i18n.get(language, "economy", "vitien")}: ${(result.wallet).toLocaleString()}₫\n${client.i18n.get(language, "economy", "nganhang")}: ${(result.bank).toLocaleString()}₫`)
           ],
        });
    },
};