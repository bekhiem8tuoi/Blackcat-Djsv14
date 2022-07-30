const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const invite = require('../../Modules/Json/invite.json');
const config = require("../../config.json");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["clinfo", "cinfo"], // lệnh phụ
    description: "xem thông tin sever", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Information", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
        if(!channel) {
        return message.reply({ content: `${client.i18n.get(language, "includes", "cungcapdungchannel", {
          prefixcmds: prefix
        })}`})
        }
        const totalUsers = channel.members.size;
        const NFSW = { 
          true: `${client.i18n.get(language, "includes", "co")}`, 
          false: `${client.i18n.get(language, "includes", "khong")}`
        };
        const embed = new EmbedBuilder()
        .addFields(
        { name:`${client.i18n.get(language, "includes", "tenchannel")}`, value:`${channel}`, inline: true }, 
        { name:"ID", value:`\`${channel.id}\``, inline: true },
        { name:`${client.i18n.get(language, "includes", "kieukenh")}`, value:`text`, inline: true },
        { name:`${client.i18n.get(language, "includes", "thanhviensudung")}`, value:`${client.i18n.get(language, "includes", "thanhviensudung2", { tatcacmds: totalUsers })}`, inline: true },
        { name:`${client.i18n.get(language, "includes", "nguoisudung")}`, value:`\`${message.guild.members.cache.filter(member => !member.user.bot).size}\` ${client.i18n.get(language, "includes", "nguoisudung")}`, inline: true },
        { name:"Bots", value:`\`${message.guild.members.cache.filter(member => member.user.bot).size}\` Con`, inline: true },
        { name:`${client.i18n.get(language, "includes", "ngaythanhlap")}`, value:`<t:${~~(channel.createdTimestamp / 1000)}:f>`, inline: true },
        { name:"NSFW", value:`\`${NFSW[channel.nsfw]}\``, inline: true },
        { name:"Links invite", value:`[Add BOT](${invite.musicbot}) | [DISCORD SERVER](${invite.discord}) | [FACEBOOK](${invite.facebook})`, inline: true },)
        .setTitle(`${client.i18n.get(language, "includes", "thongtinkenh")}`)
        .setColor(database.colors.vang)
        .setTimestamp()
        message.reply({ embeds: [embed] });
    },
};
