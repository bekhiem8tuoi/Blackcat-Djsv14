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
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return message.reply({ content: `${client.i18n.get(language, "music", "danhsachtrong")}` })
				let newTrack = newQueue.songs[0];
				member.send({ content: `${prefix}play ${newTrack.url}`,
					embeds: [new EmbedBuilder()
            .setColor(database.colors.vang)
						.setTitle(newTrack.name)
						.setURL(newTrack.url)
						.addField(`${emoji.Hihi} ${client.i18n.get(language, "handlers", "yeucauboi")}`, `>>> ${newTrack.user}`, true)
						.addField(`${emoji.Hihi} ${client.i18n.get(language, "handlers", "thoigiandudinh")}`, `>>> \`${newQueue.formattedCurrentTime} / ${newTrack.formattedDuration}\``, true)
						.addField(`${emoji.Hihi} ${client.i18n.get(language, "handlers", "hang_cho")}`, `>>> \`${newQueue.songs.length}\` ${client.i18n.get(language, "handlers", "song")}\n${newQueue.formattedDuration}`, true)
						.addField(`${emoji.Hihi} ${client.i18n.get(language, "handlers", "am_luong")}`, `>>> \`${newQueue.volume} %\``, true)
						.addField(`${emoji.Hihi} ${client.i18n.get(language, "handlers", "vong_lap")}`, `>>> ${newQueue.repeatMode ? newQueue.repeatMode === 2 ? `${emoji.v} ${client.i18n.get(language, "handlers", "queue")}` : `${emoji.v} ${client.i18n.get(language, "handlers", "song")}` : `${emoji.x}`}`, true)
						.addField(`${emoji.Hihi} ${client.i18n.get(language, "music", "autoplayzzz")}`, `>>> ${newQueue.autoplay ? `${emoji.v}` : `${emoji.x}`}`, true)
						.addField(`${emoji.Hihi} ${client.i18n.get(language, "handlers", "tai_nhac")}:`, `>>> [${client.i18n.get(language, "handlers", "click_vaoday")}](${newTrack.streamURL})`, true)
						.addField(`${emoji.Hihi} ${client.i18n.get(language, "handlers", "bo_loc")} ${newQueue.filters.length > 0 ? "" : ""}:`, `>>> ${newQueue.filters && newQueue.filters.length > 0 ? `${newQueue.filters.map(f=>`\`${f}\``).join(`, `)}` : `${emoji.x}`}`, newQueue.filters.length > 1 ? false : true)
						.setThumbnail(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
						.setFooter(`${client.i18n.get(language, "music", "daphattrong")} ${guild.name}`, guild.iconURL({ dynamic: true }))
            .setTimestamp()
					]
				}).then(() => {
					message.reply({ content: `${client.i18n.get(language, "music", "check_tinnhan", {
            Meow: emoji.Meow
          })}` })
				}).catch(() => {
					message.reply({ content: `${client.i18n.get(language, "music", "khongthenhantin", {
            Meow2: emoji.Meow
          })}` })
				})
      } catch (error) {
        console.log(error);
      };
    } catch(error){
      console.log(eror);
    };
    },
};