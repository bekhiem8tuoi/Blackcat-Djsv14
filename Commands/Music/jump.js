const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { dj_role } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "chuyển đến 1 bài hát cụ thể trong hàng đợi", // mô tả lệnh
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
				if (dj_role(client, member, newQueue.songs[0])) {
					return message.reply({ embeds: [new EmbedBuilder()
							.setColor(database.colors.vang)
							.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
							.setTitle(`${client.i18n.get(language, "music", "dj_roles")}`)
							.setDescription(`**DJ-ROLES:**\n> ${dj_role(client, member, newQueue.songs[0])}`)
						],
					});
				}
				if (!args[0]) {
					return message.reply({ embeds: [new EmbedBuilder()
							.setColor(database.colors.vang)
							.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
							.setTitle(`${client.i18n.get(language, "music", "jump_vitri")}`)
							.setDescription(`**${client.i18n.get(language, "music", "sudunglenh")}**\n> \`${prefix}jump <location>\``)
						],
					});
				}
				let Position = Number(args[0])
				if (Position > newQueue.songs.length - 1 || Position < 0) return message.reply({
					embeds: [new EmbedBuilder()
                        .setColor(database.colors.vang)
                        .setTitle(`${client.i18n.get(language, "music", "jump_vitri1", {
                          jump_vitricmds: newQueue.songs.length - 1
                        })}`)
					],

				})
				await newQueue.jump(Position);
				message.reply({ content: `${client.i18n.get(language, "music", "jump_vitri3", {
          baihatthu: Position,
          thanhvienyeucaubaihat_jump: member.user.tag
        })}`})
      } catch (error) {
        console.log(error);
      };
    } catch(error){
      console.log(eror);
    };
    },
};
