const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { dj_role } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "di chuyển bài hát đến một vị trí khác", // mô tả lệnh
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
							.setTitle(`${client.i18n.get(language, "music", "move_vitri0")}`)
              .setDescription(`${client.i18n.get(language, "music", "move_vitri1", {
                tientocuabot: prefix
              })}`)
						],
					});
				}
				if (!args[1]) {
					return message.reply({ embeds: [new EmbedBuilder()
							.setColor(database.colors.vang)
							.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
							.setTitle(`**Vui lòng thêm Vị trí Để Di chuyển!**`)
              .setDescription(`${client.i18n.get(language, "music", "move_vitri1", {
                tientocuabot: prefix
              })}`)
						],
					});
				}
				let songIndex = Number(args[0]);
				if (!songIndex) {
					return message.reply({ embeds: [new EmbedBuilder()
							.setColor(database.colors.vang)
							.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
							.setTitle(`${client.i18n.get(language, "music", "move_vitri4")}`)
              .setDescription(`${client.i18n.get(language, "music", "move_vitri1", {
                tientocuabot: prefix
              })}`)
						],
					});
				}
				let position = Number(args[1]);
				if (!position) {
					return message.reply({ embeds: [new EmbedBuilder()
							.setColor(database.colors.vang)
							.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
							.setTitle(`${client.i18n.get(language, "music", "move_vitri3")}`)
							.setDescription(`${client.i18n.get(language, "music", "move_vitri1", {
                tientocuabot: prefix
              })}`)
						],
					});
				}
				if (position >= newQueue.songs.length || position < 0) position = -1;
				if (songIndex > newQueue.songs.length - 1) return message.reply({ embeds: [new EmbedBuilder()
					.setColor(database.colors.vang)
					.setTitle(`${client.i18n.get(language, "music", "move_vitri5")}`)
					.setDescription(`${client.i18n.get(language, "music", "move_vitri6")} \`${newQueue.songs.length}\`**`)
					],
				})
				if (position == 0) return message.reply({ embeds: [new EmbedBuilder()
					.setColor(database.colors.vang)
					.setTitle(`${client.i18n.get(language, "music", "move_vitri7")}`)
					],
				});
				let song = newQueue.songs[songIndex];
				newQueue.songs.splice(songIndex);
				newQueue.addToQueue(song, position)
				message.reply({ content: `${client.i18n.get(language, "music", "move_vitri8", {
            move_vitri9: song.name,
            move_vitri10: position,
            move_vitri11: newQueue.songs[position - 1].name
        })}`});
      } catch (error) {
        console.log(error);
      };
    } catch(error){
      console.log(eror);
    };
    },
};
