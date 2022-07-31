const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["svavata", "svavt"], // lệnh phụ
    description: "avatar của server", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Utility", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    try {
      message.reply({ embeds: [new EmbedBuilder()
      .setTitle(`${client.i18n.get(language, "utility", "dowload_avatar")}`)
      .setColor(database.colors.vang)
      .setURL(message.guild.iconURL({ dynamic: true }))
      .setImage(message.guild.iconURL({ dynamic: true, size: 256, }))
      ]});
    } catch (e) {
      console.log(String(e.stack))
      return 
    }
    },
};
