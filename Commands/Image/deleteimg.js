const { ButtonBuilder, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const images = require("canvacord");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "hình ảnh theo phong cách deleted", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Image", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        let tempmsg = await message.reply({ embeds: [new EmbedBuilder().setColor(database.colors.vang).setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`}).setAuthor({ name: "đang tải...",  iconURL: "https://cdn.discordapp.com/emojis/769935094285860894.gif"})] })
        let user = message.mentions.users.first() || message.author;
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await images.Canvas.delete(avatar);
        let attachment = await new AttachmentBuilder(image, { name: "delete.png" });
        await message.reply({ files: [attachment] });
        await tempmsg.delete();
    },
};
