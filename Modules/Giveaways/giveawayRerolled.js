const Discord = require("discord.js")
const database = require("../Json/database.json");
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({ embeds: [new Discord.EmbedBuilder()
          .setTitle(`🎁 Đi thôi! Chúng tôi có một người chiến thắng mới`)
          .setColor(database.colors.vang)
          .setDescription(`xin chào ${member.user}\nTôi nghe nói rằng máy chủ lưu trữ được cuộn lại và bạn đã thắng **[[Giveaway này]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\nBạn đã giành được: **${giveaway.prize}!**\nNhắn tin trực tiếp cho người tổ chức để nhận giải thưởng của bạn!!`)
          .setTimestamp()
          .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
        ]
      }).catch(e => {})
    });
  }
}
