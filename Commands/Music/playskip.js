const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { dj_role } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "bỏ qua bài hát hiện tại và phát bào hát mới", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Music", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    try {
			const { member, guildId } = message;
			const {	guild } = member;
			const { channel } = member.voice;
			if (!channel) return message.reply({ content: `${client.i18n.get(language, "music", "thamgiakenhvoicecuatoi")}`});
			if (channel.userLimit != 0 && channel.full) return message.reply({ content: `${client.i18n.get(language, "music", "kenhvoicedaytoikhongthetamgia")}`});
      if (!args[0]) {
				return message.reply({ embeds: [new EmbedBuilder()
						.setColor(database.colors.vang)
						.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
						.setTitle(`${client.i18n.get(language, "music", "play_0")}`)
						.setDescription(`${client.i18n.get(language, "music", "playskip_1", { playskip1_prefix: prefix })}`)
					]});
			};
			const Text = args.join(" ");  
			let newmsg = await message.reply({	content: `${client.i18n.get(language, "music", "play_2", { play_emoji: emoji.Hihi, play_Text: Text })}`}).catch(e => {console.log(e)});
			try {
				let queue = client.distube.getQueue(guildId)
				let options = {
					member: member,
					skip: true
				}
				if (!queue) options.textChannel = guild.channels.cache.get(channelId)
				if (queue) {
					if (dj_role(client, member, queue.songs[0])) {
						return message.reply({ embeds: [new EmbedBuilder()
								.setColor(database.colors.vang)
								.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
								.setTitle(`${client.i18n.get(language, "music", "dj_roles")}`)
								.setDescription(`**DJ-ROLES:**\n> ${dj_role(client, member, queue.songs[0])}`)
							],
						});
					}
				}
				await client.distube.play(channel, Text, options)
				newmsg.edit({ content: `${queue?.songs?.length > 0 ? `⏭ ${client.i18n.get(language, "handlers", "skip")}` : `🎶 ${client.i18n.get(language, "music", "play_4")}`}: \`\`\`css\n${Text}\n\`\`\``}).catch(e => {console.log(e)});
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				message.reply({ content: `${client.i18n.get(language, "music", "error")} \`\`\`${e}\`\`\`` })
      }
    } catch(error){
      console.log(eror);
    };
    },
};
