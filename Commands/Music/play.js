const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: ["Connect"], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    try {
 			const { member, channelId, guildId } = message;
			const {	guild } = member;
			const { channel } = member.voice;
			if (!channel) return message.reply({ content: `${client.i18n.get(language, "music", "haythamgiavoicetruoc")}`});
			if (channel.userLimit != 0 && channel.full)
				return message.reply({
					embeds: [new EmbedBuilder()
						.setColor(database.colors.vang)
						.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
						.setTitle(`${client.i18n.get(language, "music", "kenhvoicedaytoikhongthetamgia")}`)
					],
				});
			if (!args[0]) {
				return message.reply({
					embeds: [new EmbedBuilder()
						.setColor(database.colors.vang)
						.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
						.setTitle(`${client.i18n.get(language, "music", "play_0")}`)
						.setDescription(`${client.i18n.get(language, "music", "play_1", {
              play_prefix: prefix
            })}`)
					],
				});
			}
			const Text = args.join(" ") 
			let newmsg = await message.reply({ content: `${client.i18n.get(language, "music", "play_2", {
        play_emoji: emoji.Cat,
        play_Text: Text
      })}`}).catch(e => {console.log(e)})
			try {
				let queue = client.distube.getQueue(guildId)
				let options = {
					member: member,
				}
				if (!queue) options.textChannel = guild.channels.cache.get(channelId)
				await client.distube.play(message.member.voice.channel, args.join(' '), {
                message,
                Text,
                options,
                textChannel: message.channel,
                member: message.member,
            }).catch(err => {
                message.reply(err.message)
        });
				newmsg.edit({ content: `${queue?.songs?.length > 0 ? `${client.i18n.get(language, "music", "play_3")}`:`${client.i18n.get(language, "music", "play_4")}`}: ${Text}`}).catch(e => {console.log(e)})
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				message.reply({ content: `${client.i18n.get(language, "music", "error")} \`\`\`${e}\`\`\`` })
			}
		} catch (e) {
			console.log(String(e.stack))
    }
  }
}