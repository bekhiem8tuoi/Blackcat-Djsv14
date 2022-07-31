const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { dj_role } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "hiển thị trạng thái bài hát", // mô tả lệnh
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
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return message.reply({ content:  `${client.i18n.get(language, "music", "danhsachtrong")}`})
				let newTrack = newQueue.songs[0];
				let embed = new EmbedBuilder()
				  .setColor(database.colors.vang)
					.setDescription(`${emoji.Jum} BlackCat Music Bots ${emoji.Jum}`)
					.addField(`${emoji.Hihi} ${client.i18n.get(language, "handlers", "yeucauboi")}`, `>>> ${newTrack.user}`, true)
					.addFields([ 
            { name: `${emoji.Hihi} ${client.i18n.get(language, "handlers", "thoigiandudinh")}`, value: `>>> \`${newQueue.formattedCurrentTime} / ${newTrack.formattedDuration}\``},
            { name: `${emoji.Hihi} ${client.i18n.get(language, "handlers", "queue")}:`, value: `>>> ${newQueue.songs.length} ${client.i18n.get(language, "handlers", "song")}\n\`${newQueue.formattedDuration}\``},
				    { name: `${emoji.Hihi} ${client.i18n.get(language, "handlers", "am_luong")}`, value: `>>> \`${newQueue.volume} %\``},
				    { name: `${emoji.Hihi} ${client.i18n.get(language, "handlers", "vong_lap")}`, vale: `>>> ${newQueue.repeatMode ? newQueue.repeatMode === 2 ? `${emoji.v} ${client.i18n.get(language, "music", "queue")}` : `${emoji.v} ${client.i18n.get(language, "handlers", "song")}` : `${emoji.x}`}`},
            { name: `${emoji.Hihi} ${client.i18n.get(language, "handlers", "autoplay")}:`, value: `>>> ${newQueue.autoplay ? `${emoji.v}` : `${emoji.x}`}`},
            { name: `${emoji.Hihi} ${client.i18n.get(language, "handlers", "tai_nhac")}`, value: `>>> [${client.i18n.get(language, "handlers", "click_vaoday")}](${newTrack.streamURL})`},
            { name: `${emoji.Hihi} ${client.i18n.get(language, "handlers", "bo_loc")}${newQueue.filters.length > 0 ? "": ""}:`, value: `>>> ${newQueue.filters && newQueue.filters.length > 0 ? `${newQueue.filters.map(f=>`\`${f}\``).join(`, `)}` : `${emoji.x}`}`, inline: newQueue.filters.length > 1 ? false : true},
          ])
        	.setAuthor({ name: `${newTrack.name}`, iconURL: `https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif`,  url: newTrack.url})
					.setThumbnail(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
					.setFooter({ text: `${newTrack.user.tag}`, iconURL: `${newTrack.user.displayAvatarURL({ dynamic: true })}`})
				message.reply({ embeds: [embed] })
      } catch (error) {
        console.log(error);
      };
    } catch(error){
      console.log(eror);
    };
    },
};
