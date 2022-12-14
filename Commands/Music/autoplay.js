const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { dj_role } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["atpl", "tdp"], // lệnh phụ
    description: "bật chế độ tự động phát", // mô tả lệnh
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
				if (dj_role(client, member, newQueue.songs[0])) { 
					return message.reply({ content: `${client.i18n.get(language, "music", "dj_roles2", {
            dj_roles1: dj_role(client, member, newQueue.songs[0])
          })}`});
				}
				await newQueue.toggleAutoplay();
				message.reply({ content: `${client.i18n.get(language, "music", "autoplay_success", {
          autoplaycmds: newQueue.autoplay ? `${emoji.v}` :`${emoji.x}`,
          dupcyeucauboi: member.user.tag
        })}`})
      } catch (error) {
        console.log(error);
      };
    } catch(error){
      console.log(eror);
    };
    },
};
