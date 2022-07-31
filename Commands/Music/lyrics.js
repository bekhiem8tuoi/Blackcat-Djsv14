const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { dj_role } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "lời bài hát đanh phát hiện tại", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Music", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    try {
      const fetch = require("node-fetch");
			const { member, guildId } = message;
			const {	guild } = member;
			const { channel } = member.voice;
			if (!channel) return message.reply({ content: `${client.i18n.get(language, "music", "thamgiakenhvoicecuatoi")}`});
			if (channel.userLimit != 0 && channel.full) return message.reply({ content: `${client.i18n.get(language, "music", "kenhvoicedaytoikhongthetamgia")}`});
      try {
        let newQueue = client.distube.getQueue(guildId);
                if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return message.reply({ embeds: [new MessageEmbed().setColor(colors.vang).setTitle(`${client.i18n.get(language, "music", "danhsachtrong")}`)]})
                const song = (`${newQueue.songs[0].name}`)
                const json = await fetch(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`).then(r => r.json());
                if (json.error) return message.reply(`${client.i18n.get(language, "music", "lyrics_1")}`);
                const url = `${song.replace(" ", "+")}`;
                let lyrics = json.lyrics;
               if (lyrics.length > 4096)
               lyrics = `${client.i18n.get(language, "music", "lyrics_2", {
                 url1: url,
                 url2: url
               })}`;
               const embed = new EmbedBuilder()
              .setTitle(json.full_title === `${client.i18n.get(language, "handlers", "khongco")}` ? json.title : json.full_title)
              .setURL(json.url)
              .setThumbnail(json.image)
              .addField(`${client.i18n.get(language, "handlers", "casi")}`, json.artist)
              .setDescription(`${client.i18n.get(language, "handlers", "text_lyrics")} ${lyrics}`)
              .setColor(database.colors.vang);
              message.reply({ embeds: [embed] });
      } catch (error) {
        console.log(error);
      };
    } catch(error){
      console.log(eror);
    };
    },
};
