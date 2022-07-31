const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { dj_role } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["removems", "rmvms"], // lệnh phụ
    description: "xoá 1 bài hát", // mô tả lệnh
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
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return message.reply({ content: `${client.i18n.get(language, "music", "danhsachtrong")}`});
				if (dj_role(client, member, newQueue.songs[0])) {
					return message.reply({ content: `${client.i18n.get(language, "music", "dj_roles")}!\n**DJ-ROLES:**\n> ${dj_role(client, member, newQueue.songs[0])}` });
				}
				if (!args[0]) {
					return message.reply({ embeds: [new EmbedBuilder()
							.setColor(database.colors.vang)
							.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
							.setTitle(`${client.i18n.get(language, "music", "remove_0")}`)
							.setDescription(`${client.i18n.get(language, "music", "remove_1", { remove_prefix: prefix })}`)
						],
					});
				}
				let songIndex = Number(args[0]);
				if (!songIndex) {
					return message.reply({ embeds: [new EmbedBuilder()
							.setColor(database.colors.vang)
							.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
							.setTitle(`${client.i18n.get(language, "music", "remove_0")}`)
							.setDescription(`${client.i18n.get(language, "music", "remove_1", { remove_prefix: prefix })}`)
						],
					});
				}
				let amount = Number(args[1] ? args[1] : "1");
				if (!amount) amount = 1;
				if (songIndex > newQueue.songs.length - 1) return message.reply({ embeds: [new EmbedBuilder()
						.setColor(database.colors.vang)
						.setTitle(`${client.i18n.get(language, "music", "remove_3")}`)
						.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
						.setDescription(`**${client.i18n.get(language, "music", "remove_4")}**\`${newQueue.songs.length}\``)
				]})
				if (songIndex <= 0) return message.reply({ embeds: [new EmbedBuilder()
						.setColor(database.colors.vang)
						.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
						.setTitle(`${client.i18n.get(language, "music", "remove_5")}`)
						.setDescription(`${client.i18n.get(language, "music", "remove_6", { remove_prefix1: prefix })}`)
					],

				})
				if (amount <= 0) return message.reply({ embeds: [new EmbedBuilder()
						.setColor(database.colors.vang)
						.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
						.setTitle(`${client.i18n.get(language, "music", "remove_7")}`)
					]})
				newQueue.songs.splice(songIndex, amount);
				message.reply({ content: `${client.i18n.get(language, "music", "remove_8", {
          amount: amount,
          remove_code1: amount > 1 ?"": "",
          remove_member1: member.user.tag
        })}`});
      } catch (error) {
        console.log(error);
      };
    } catch(error){
      console.log(eror);
    };
    },
};
