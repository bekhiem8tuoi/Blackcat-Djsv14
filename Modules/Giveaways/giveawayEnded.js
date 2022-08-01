const Discord = require("discord.js")
const database = require("../Json/database.json");
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({ embeds: [new Discord.EmbedBuilder()
          .setTitle(`🎁 Xin chúc mừng người may mắn!`)
          .setColor(database.colors.vang)
          .setDescription(`xin chào ${member.user}\n Tôi nghe nói rằng bạn đã thắng **[[Giveaway này]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n Bạn đã dành được: **${giveaway.prize}!**\nNhắn tin trực tiếp cho người tổ chức để nhận giải thưởng của bạn!!`)
          .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
          .setTimestamp()
        ]
      }).catch(e => {})
    });
  }
}
