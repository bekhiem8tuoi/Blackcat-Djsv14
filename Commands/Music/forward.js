const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { dj_role } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "chuyển tiếp trong N giây", // mô tả lệnh
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

				if (!args[0]) {
					return message.reply({ content: `${client.i18n.get(language, "music", "forward2", {
            prefixcta: prefix
          })}`})
				}
				let seekNumber = Number(args[0])
				let seektime = newQueue.currentTime + seekNumber;
				if (seektime >= newQueue.songs[0].duration) seektime = newQueue.songs[0].duration - 1;
				if (dj_role(client, member, newQueue.songs[0])) { 
                    return message.reply({ content: `${client.i18n.get(language, "music", "dj_roles")}\nDJ-ROLES:**> ${dj_role(client, member, newQueue.songs[0])}` });
				}
				await newQueue.seek(seektime);
				message.reply({ content: `${client.i18n.get(language, "music", "forward", {
          seekNumber: seekNumber,
          djfjjdjd: member.user.tag
        })}` });
      } catch (error) {
        console.log(error);
      };
    } catch(error){
      console.log(eror);
    };
    },
};