const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { dj_role } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "liệt kê các bài hát", // mô tả lệnh
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
				let embeds = [];
				let k = 10;
				let theSongs = newQueue.songs;
				for (let i = 0; i < theSongs.length; i += 10) {
					let qus = theSongs;
					const current = qus.slice(i, k)
					let j = i;
					const info = current.map((track) => `**${j++} -** [\`${String(track.name).replace(/\[/igu, "{").replace(/\]/igu, "}").substr(0, 60)}\`](${track.url}) - \`${track.formattedDuration}\``).join("\n")
					const embed = new EmbedBuilder()
						.setColor(database.colors.vang)
						.setDescription(`${info}`)
					if (i < 10) {
						embed.setTitle(`${client.i18n.get(language, "music", "list_dungdau", {
              list_thesong: theSongs.length > 50 ? 50 : theSongs.length,
              guild_name: guild.name
            })}`)
						embed.setDescription(`${client.i18n.get(language, "music", "list_dungdau1", {
              list_baihathientai0: theSongs[0].name.replace(/\[/igu, "{").replace(/\]/igu, "}"),
              list_baihathientai1: theSongs[0].url,
              list_baihathientai2: info
            })}`)
					}
					embeds.push(embed);
					k += 10; 
				}
				embeds[embeds.length - 1] = embeds[embeds.length - 1]
					.setFooter({ text: `${client.i18n.get(language, "music", "list_dungdau2", {
            blackcatdata: database.name,
            list_baihathientai3: theSongs.length,
            list_baihathientai4: newQueue.formattedDuration
          })}`, iconURL: `${database.avatar}`})
				let pages = []
				for (let i = 0; i < embeds.length; i += 3) {
					pages.push(embeds.slice(i, i + 3));
				}
				pages = pages.slice(0, 24)
				const Menu = new SelectMenuBuilder()
					.setCustomId("hàng chờ")
					.setPlaceholder(`${client.i18n.get(language, "music", "list_dungdau3")}`) 
					.addOptions([
						pages.map((page, index) => {
							let Obj = {};
							Obj.label = `${client.i18n.get(language, "music", "list_dungdau4")} ${index}`
							Obj.value = `${index}`;
							Obj.description = `${client.i18n.get(language, "music", "list_dungdau5", { index: index, list_baihathientai5: pages.length - 1 })}`
							return Obj;
						})
					])
				const row = new ActionRowBuilder().addComponents([Menu])
				message.reply({embeds: [embeds[0]], components: [row] })
				client.on('interactionCreate', (i) => {
					if (!i.isSelectMenu()) return;
					if (i.customId === "Hàng chờ" && i.applicationId == client.user.id) {
						i.reply({ embeds: pages[Number(i.values[0])]}).catch(e => {})
					}
				});
      } catch (error) {
        console.log(error);
      };
    } catch(error){
      console.log(eror);
    };
    },
};
