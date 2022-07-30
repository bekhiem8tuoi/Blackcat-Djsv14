const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "reset ranking sever", // mô tả lệnh
    userPerms: ["Administrator"], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Ranking", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        const Levels = cient.Levels;
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]);
            if (user) user = user.user;;
        } else if (!args[0]) {
            return message.channel.send({ content: `${client.i18n.get(language, "ranking", "chidinhnguoidung")}` });
        }
        let result = await Levels.deleteUser(message.author.id, message.guild.id);
        if (result.error) { 
          return message.reply({ content: `${client.i18n.get(language, "ranking", "dasayraloi")}`});
        } else {
          message.reply({ content: `${client.i18n.get(language, "ranking", "reset_success")} ${user.username}` })
        } ;
    },
};