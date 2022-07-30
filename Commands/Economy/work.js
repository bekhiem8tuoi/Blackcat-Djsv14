const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "một cách để kiếm t", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        let result = await client.cs.work({
            user: message.author,
            guild: { 
              id : null 
            },
            maxAmount: 5000,
            replies: [`${client.i18n.get(language, "economy", "nguoilaptrinh")}`, `${client.i18n.get(language, "economy", "nguoixaydung")}`, `${client.i18n.get(language, "economy", "namphucvu")}`, `${client.i18n.get(language, "economy", "CEO")}`, `${client.i18n.get(language, "economy", "truonghong")}`, `${client.i18n.get(language, "economy", "congnhancokhi")}`],
        });
        if (result.error) return message.reply({ content: `${client.i18n.get(language, "economy", "thulaisau_money")} \`${result.time}\`` });
        else message.reply({ content: `${client.i18n.get(language, "economy", "kiemtienthanhcong1")} ${result.workType} ${client.i18n.get(language, "economy", "kiemtienthanhcong2")} ${emoji.money} \`${await client.cs.format(result.amount)}.\`` })
    
    },
};