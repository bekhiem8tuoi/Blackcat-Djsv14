const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "rời khỏi sever chỉ địng", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: true, //: tắt // true : bật
    category:"Developer", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    const { colors } = database; 
    const guildId = args[0] || message.guild;
    const rgx = /^(?:<@!?)?(\d+)>?$/;
    if (!rgx.test(guildId)) return;
    const guild = message.client.guilds.cache.get(guildId);
    if (!guild) return;
    await guild.leave();
    await message.reply({ embeds: [new ButtonBuilder()
      .setTitle("out sever")
      .setColor(colors.vang)
      .setDescription(`Đã rời khỏi server **\`${guild.name}\`** với **\`${guild.memberCount}\`** thành viên👋`)
    ]});
    },
};
