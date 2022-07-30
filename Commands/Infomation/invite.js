const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const moibot = require("../../Modules/Json/invite.json");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "invite bot", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Information", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    const { Hack } = emoji;
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel(`${client.i18n.get(language, "handlers", "vao_discord")}`)
      .setEmoji('880842478855536681')
      .setStyle("Link")
      .setURL(`${moibot.discord}`),
      new ButtonBuilder()
      .setLabel(`${client.i18n.get(language, "handlers", "moi_bot")}`)
      .setEmoji(Hack) 
      .setStyle("Link")
      .setURL(`${moibot.musicbot}`),
      new ButtonBuilder()
      .setLabel("Facebook")
      .setEmoji('880834017593790474') 
      .setStyle("Link")
      .setURL(`${moibot.facebook}`)
    )
    let invite = new EmbedBuilder()
    .setAuthor({ name: `${client.user.username} - ${client.i18n.get(language, "includes", "menuinvitebot")}`})
    .setDescription(`${client.i18n.get(language, "includes", "menumoibot", {
      musicbotz: moibot.musicbot,
      discordz: moibot.discord,
      facebookz: moibot.facebook
    })}`)
    .setColor(database.colors.vang)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    message.reply({ embeds: [invite], components: [row] });
    },
};