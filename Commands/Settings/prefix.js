const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: ["Administrator", "ManageGuild"], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Settings", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        if(!args[0]) return message.channel.send(`${client.i18n.get(language, "settings", "prefix_arg")}`);
        if(args[0].length > 10) return message.channel.send(`${client.i18n.get(language, "settings", "prefix_length")}`);
        const newPrefix = await GPrefix.findOne({ guild: message.guild.id });
        if(!newPrefix) {
            const newPrefix = new GPrefix({
                guild: message.guild.id,
                prefix: args[0]
            });
            newPrefix.save().then(() => {
                const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "settings", "prefix_set", {
                    prefix: args[0]
                })}`)
                .setColor("#FFF700")
                message.reply({ embeds: [embed] });
            }
            ).catch(() => {
                message.reply(`${client.i18n.get(language, "settings", "prefix_error")}`);
            });
        } else if(newPrefix) {
            newPrefix.prefix = args[0];
            newPrefix.save().then(() => {
                const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "settings", "prefix_change", {
                    prefix: args[0]
                })}`)
                .setColor("#FFF700")
                message.reply({ embeds: [embed] });
            }
            ).catch((e) => {
               console.log(e)
                message.reply(`${client.i18n.get(language, "settings", "prefix_error")}`);
            });
        };
    },
};