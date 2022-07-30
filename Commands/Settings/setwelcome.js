const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: ["Administrator"], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        const channel = message.mentions.channels.first()
        if (!channel) return message.reply({ content: `${client.i18n.get(language, "moderation", "khongcokenh")}`})
        const data = await guildConfig.findOne({ guildId: message.guild.id })  
        if (!data) {
            try{
                const data1 = await guildConfig.create({
                    guildId: message.guild.id
                });
                await data1.updateOne({ welcomeChannel: channel.id })
                return message.reply({ content: `${client.i18n.get(language, "moderation", "welcome_success")}`})
            }catch(error) {
                console.log(error);
            };
        } else if(data) {
           await data.updateOne({ welcomeChannel: channel.id });
           return message.reply({ content: `${client.i18n.get(language, "moderation", "welcome_success")}`});
        };
    },
};