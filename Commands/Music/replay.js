const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { dj_role } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "phát lại bài hát hiện tại", // mô tả lệnh
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
      try {
        let newQueue = client.distube.getQueue(guildId);
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return message.reply({ content: '\`Tôi không có gì để hát ngay bây giờ!\`'})
				let seekNumber = 0
				if (dj_role(client, member, newQueue.songs[0])) {
					return message.reply({ embeds: [new EmbedBhilder()
							.setColor(database.colors.vang)
							.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
							.setTitle(`${client.i18n.get(language, "music", "dj_roles")}`)
							.setDescription(`**DJ-ROLES:**\n> ${dj_role(client, member, newQueue.songs[0])}`)
						],
					});
				}
				await newQueue.seek(seekNumber);
				message.reply({ content: `${client.i18n.get(language, "music", "replay")}` })
      } catch (error) {
        console.log(error);
      };
    } catch(error){
      console.log(eror);
    };
    },
};
