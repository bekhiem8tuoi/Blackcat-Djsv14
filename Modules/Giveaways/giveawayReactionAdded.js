const Discord = require("discord.js")
const database = require("../Json/database.json");
module.exports = {
  async execute(giveaway, reactor, messageReaction) {
    let approved =  new Discord.EmbedBuilder()
    .setTimestamp()
    .setColor(database.colors.vang)
    .setTitle("í hí hí")
    .setDescription(`Mục nhập của bạn vào [Giveaway này](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) đã được chấp nhận!`)
    .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
    .setTimestamp()
   let denied =  new Discord.EmbedBuilder()
    .setTimestamp()
    .setColor(database.colors.vang)
    .setTitle(":x: Mục nhập bị Từ chối | Không tìm thấy và trả lại mục nhập cơ sở dữ liệu!")
    .setDescription(`Mục nhập của bạn vào [Giveaway này](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) đã bị từ chối, vui lòng xem lại các yêu cầu đối với giveaway một cách chính xác.`)
    .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})

    let client = messageReaction.message.client
    if (reactor.user.bot) return;
    if(giveaway.extraData) {
      if (giveaway.extraData.server !== "null") {
        try { 
        await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
        return reactor.send({ embeds: [approved] });
        } catch(e) {
          messageReaction.users.remove(reactor.user);
          return reactor.send({ embeds: [denied]
          }).catch(e => {})
        }
      }
      if (giveaway.extraData.role !== "null" && !reactor.roles.cache.get(giveaway.extraData.role)){ 
        messageReaction.users.remove(reactor.user);
        return reactor.send({ embeds: [denied]
        }).catch(e => {})
      }

      return reactor.send({ embeds: [approved]
      }).catch(e => {})
    } else {
        return reactor.send({ embeds: [approved]
        }).catch(e => {})
    }
    }
  }
