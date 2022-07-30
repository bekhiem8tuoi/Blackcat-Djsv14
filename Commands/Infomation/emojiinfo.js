const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["einfo", "eminfo"], // lệnh phụ
    description: "emojis info", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Information", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    const yesno = {
       true: `${client.i18n.get(language, "includes", "co")}`,
       false: `${client.i18n.get(language, "includes", "khong")}`
    };
    const regex = args[0].replace(/^<a?:\w+:(\d+)>$/, "$1")
    const emojiss = message.guild.emojis.cache.find((emojiss) => emojiss.name === args.join(" ") || emojiss.id === regex)
    if (!emojiss) return message.reply({ content: `${client.i18n.get(language, "includes", "khonhcoemojitrongsv")}`})
    const emojiEmbed = new EmbedBuilder()
      .setTitle(`${client.i18n.get(language, "includes", "thongtinemoji")}`)
      .setColor(database.colors.vang)
      .setThumbnail(emojiss.url)
      .addFields([
        { name: `${client.i18n.get(language, "includes", "tenemoji")}`, value: `${emojiss.name}`},
        { name: `Emoji ID:`, value: `${emojiss.id}`},
        { name: `${client.i18n.get(language, "includes", "anhdong")}`, value: `${yesno[emojiss.animated]}`},
        { name: `${client.i18n.get(language, "includes", "duocthemboi")}`, value: `${(await emojiss.fetchAuthor()).tag}`},
        { name: `${client.i18n.get(language, "includes", "duocthemluc")}`, value: `<t:${~~(emojiss.createdTimestamp / 1000)}:f>`},
        { name: `Emoji URL:`, value: `[${client.i18n.get(language, "includes", "clickdetai")}](${emojiss.url})`},
      ])
    message.reply({ embeds: [emojiEmbed] });
    },
};
