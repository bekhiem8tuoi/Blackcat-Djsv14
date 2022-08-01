const Discord = require("discord.js")
const database = require("../Json/database.json");
module.exports = {
  async execute(giveaway, member) {
    return member.send({ embeds: [new Discord.EmbedBuilder()
        .setTimestamp()
        .setTitle('❓ Chờ đã, bạn vừa loại bỏ phản ứng khỏi một giveaway?')
        .setColor(database.colors.vang)
        .setDescription(`Mục nhập của bạn vào [Giveaway này](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) đã được ghi lại nhưng bạn không phản ứng, vì bạn không cần **${giveaway.prize}** Tôi sẽ phải chọn một người khác 😭`)
        .setFooter({ text: "Nghĩ rằng đó là một sai lầm? Hãy phản ứng lại!"})
      ]
    }).catch(e => {});
  },
};
