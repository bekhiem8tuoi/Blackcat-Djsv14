const { ButtonBuilder, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const { readdirSync, readFileSync } = require('fs');
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["mèo", "momleo"], // lệnh phụ
    description: "hiển thị ảnh mèo ngẫu nhiên", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Image", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        const folder = readdirSync("././Modules/ImageCmds/Cat");
        const randomFile = folder[Math.floor(Math.random() * folder.length)];
        const file = readFileSync(`././Modules/ImageCmds/Cat/${randomFile}`);
        const ext = randomFile.slice(-3);
        const attachment = new AttachmentBuilder(file, { name: `cat.${ext}` });
        message.reply({ files: [attachment] });
    },
};
