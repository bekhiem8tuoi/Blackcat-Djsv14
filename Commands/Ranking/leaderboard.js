const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["bxhr", "bxh"], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Ranking", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
         const Levels = client.Levels;
         const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); 
         if (rawLeaderboard.length < 1) return reply({ content: `${client.i18n.get(language, "ranking", "chuacoai")}` });
          const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); 
          const lb = leaderboard.map(e => `\`\`\`${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}\`\`\``);
          message.reply({ embeds: [ new EmbedBuilder()
          .setTitle(`${client.i18n.get(language, "ranking", "bxhranking1")}`, message.guild.name)
          .setColor(database.colors.vang)
          .setDescription(`${client.i18n.get(language, "ranking", "bxhranking2")} 
          ${lb.join("\n\n")}`)
      ]});
    },
};