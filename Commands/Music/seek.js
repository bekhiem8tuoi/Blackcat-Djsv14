const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { dj_role } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "chuyển đến 1 vị trí cụ thể trong bài hát", // mô tả lệnh
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
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return message.reply({
					embeds: [new EmbedBuilder()
                        .setColor(database.colors.vang)
                        .setTitle(`${client.i18n.get(language, "music", "danhsachtrong")}`)
					],

				})
				if (!args[0]) {
					return message.reply({
						embeds: [new EmbedBuilder()
							.setColor(database.colors.vang)
							.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
							.setTitle(`${client.i18n.get(language, "music", "seek_0")}`)
							.setDescription(`${client.i18n.get(language, "music", "seek_1", {seek_prefix: prefix})}`)
						],
					})
				}
				let seekNumber = Number(args[0])
				if (seekNumber > newQueue.songs[0].duration || seekNumber < 0) return message.reply({
					embeds: [new EmbedBuilder()
                            .setColor(database.colors.vang)
                            .setTitle(`${client.i18n.get(language, "music", "seek_3", { seek_code1: newQueue.songs[0].duration })}`)
					],
				})
				if (dj_role(client, member, newQueue.songs[0])) {
					return message.reply({ embeds: [new EmbedBuilder()
							.setColor(database.colors.vang)
							.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
							.setTitle(`${client.i18n.get(language, "music", "dj_roles")}`)
							.setDescription(`**DJ-ROLES:**\n> ${dj_role(client, member, newQueue.songs[0])}`)
						],
					});
				}
				await newQueue.seek(seekNumber);
				message.reply({ content: `${client.i18n.get(language, "music", "seek_4", { seekNumber1: seekNumber })}`});
		
      } catch (error) {
        console.log(error);
      };
    } catch(error){
      console.log(eror);
    };
    },
};
