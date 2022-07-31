const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { embedPages } = require("../../Modules/functions");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["svl", ""], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: true, //: tắt // true : bật
    category:"", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        try {
        const { Muiten } = emoji;
        let embed1 = new EmbedBuilder()
        .setAuthor({ name: client.user.tag , iconURL: client.user.displayAvatarURL() })
        .setColor(database.colors.vang)
        .setTimestamp()
        await client.guilds.cache.map(guilds_now => guilds_now).slice(0 , 8)
        .map((guilds_now , i) => {
            embed1.addFields({ name: `#${i+1} name: ${guilds_now.name}`, value:`${Muiten} ID: \`${guilds_now.id}\`, member: \`${guilds_now.memberCount}\``, inline: true })
            return 0;
        })
        let embed2 = new EmbedBuilder()
        .setAuthor({name: client.user.tag , iconURL: client.user.displayAvatarURL()})
        .setColor(database.colors.vang)
        .setTimestamp()
        await client.guilds.cache.map(guilds_now => guilds_now).slice(9 , 16)
        .map((guilds_now , i) => {
            embed2.addFields({ name: `#${i+1} name: ${guilds_now.name}`, value:`${Muiten} ID: \`${guilds_now.id}\`, member: \`${guilds_now.memberCount}\``, inline: true })
            return 0;
        })
        let pages = [embed1, embed2];
        embedPages(client, message, pages, {
          firstEmoji: "⏪",
          backEmoji: "◀️",
          delEmoji: "🗑",
          forwardEmoji: "▶️",
          lastEmoji: "⏩",
          btncolor: "Success",
          delcolor: "Danger",
          skipcolor: "Primary",
        
          skipBtn: true,
          delBtn: true
        });
    } catch (e) {
      console.log(e)
      return message.reply({ embeds: [new MessageEmbed()
        .setDescription(`${e}`)
      ]});
    };
    },
};