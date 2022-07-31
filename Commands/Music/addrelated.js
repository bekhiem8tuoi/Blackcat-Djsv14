const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "thêm một bài hát tương tự bài hát đang phát", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Music", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    try {
			const { member, guildId } = message;
			const {	guild } = member;
			const { channel } = member.voice;
			if (!channel) return message.reply({ content: `${client.i18n.get(language, "music", "haythamgiavoicetruoc")}`})
			if (channel.userLimit != 0 && channel.full)
				return message.reply({ content: `${client.i18n.get(language, "music", "kenhvoicedaytoikhongthetamgia")}`});
			try {
				let newQueue = client.distube.getQueue(guildId);
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return message.reply({ content: `${client.i18n.get(language, "music", "danhsachtrong")}`})
				let thenewmsg = await message.reply({ content: `${client.i18n.get(language, "music", "timkiembaihatcmds", {
          emojidongcmds: emoji.Hihi,
          timkiemnhacfhhshdjxjshd: newQueue.songs[0].name
        })}`}).catch(e => { console.log(e) });
				await newQueue.addRelatedSong();
				await thenewmsg.edit({ content: `${client.i18n.get(language, "music", "dathemnhacdkfjjfjddjjd", {
          dathembaihatmoi: newQueue.songs[newQueue.songs.length - 1].name
        })}`}).catch(e => {	console.log(e) })
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				message.reply({ content: `err: \`\`\`${e}\`\`\`` })
			}
		} catch (e) {
			console.log(String(e.stack))
    }
    },
};
