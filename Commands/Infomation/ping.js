const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const { musicbot, discord } = require("../../Modules/Json/invite.json");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "Ping Bot", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Information", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    const msg = await message.channel.send(`${client.i18n.get(language, "includes", "pingping_api", { emojiping: emoji.Hihi })}`);
    let pingbot = new EmbedBuilder()
      .setAuthor({ name: `${database.name}`, iconURL: `${client.user.displayAvatarURL({ dynamic:false })}`})
      .setTitle('Pong pong!')
      .setDescription(`${client.i18n.get(language, "includes", "pingbot", {
        emojidong3: emoji.Hihi,
        pingcuabot: client.ws.ping,
        pingcuabot2: Math.floor(msg.createdAt - message.createdAt),
        prefix1: prefix
        })}`)
      .setColor(database.colors.vang)
      .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
      .setTimestamp()
    await message.reply({ embeds: [pingbot] });
    msg.delete();
    },
};
