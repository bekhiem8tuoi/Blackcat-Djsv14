const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { dj_role } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "Bật/Tắt Vòng lặp Bài hát-/Hàng đợi", // mô tả lệnh
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
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return message.reply({ embeds: [new EmbedBuilder()
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
							.setTitle(`${client.i18n.get(language, "music", "loop_1")}`)
							.setDescription(`**${client.i18n.get(language, "music", "sudunglenh")}**\n> \`${prefix}loop <song/queue/off>\``)
						],
					});
				}
				let loop = String(args[0])
				if (!["off", "song", "queue"].includes(loop.toLowerCase())) {
					return message.reply({ embeds: [new EmbedBuilder()
							.setColor(database.colors.vang)
							.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
							.setTitle(`${client.i18n.get(language, "music", "loop_1")}`)
							.setDescription(`**${client.i18n.get(language, "musi ", "sudunglenh")}**\n> \`${prefix}loop <song/queue/off>\``)
						],
					});
				}
				if (loop.toLowerCase() == "off") loop = 0;
				else if (loop.toLowerCase() == "song") loop = 1;
				else if (loop.toLowerCase() == "queue") loop = 2;
				await newQueue.setRepeatMode(loop);
				if (newQueue.repeatMode == 0) {
					message.reply({ content: `${client.i18n.get(language, "music", "loop_2", {
            loop_member: member.user.tag
          })}` })
				} else if (newQueue.repeatMode == 1) {
					message.reply({ content: `${client.i18n.get(language, "music", "loop_3", {
            loop_member1: member.user.tag
          })}` })
				} else {
					message.reply({ content: `${client.i18n.get(language, "music", "loop_4", {
            loop_member2: member.user.tag
          })}` })
        }
      } catch (error) {
        console.log(error);
      };
    } catch(error){
      console.log(eror);
    };
    },
};
