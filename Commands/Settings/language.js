const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["setlang", "changelang"], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: ["Administrator", "ManageGuild"], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Settings", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        const GLang = require('../../Modules/Databases/Schema/Language.js');
        if(!args[0]) return message.reply(`${client.i18n.get(language, "settings", "lang_arg")}`);
        const languages = client.i18n.getLocales();
        if (!languages.includes(args[0])) return message.reply(`${client.i18n.get(language, "settings", "provide_lang", {
            languages: languages.join(', ')
        })}`);

        const newLang = await GLang.findOne({ guild: message.guild.id });
        if(!newLang) {
            const newLang = new GLang({
                guild: message.guild.id,
                language: args[0]
            });
            newLang.save().then(() => {
                const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "settings", "lang_set", {
                    language: args[0]
                })}`)
                .setColor("#FFF700")

                message.reply({ embeds: [embed] });
            }
            ).catch(() => {
                message.reply(`${client.i18n.get(language, "settings", "Lang_error")}`);
            });
        } else if(newLang) {
            newLang.language = args[0];
            newLang.save().then(() => {
                const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "settings", "lang_change", {
                    language: args[0]
                })}`)
                .setColor("#FFF700")
    
                message.reply({ embeds: [embed] });
            }
            ).catch((err) => {
                console.log("Lỗi: " + err)
                message.reply(`${client.i18n.get(language, "settings", "Lang_error")}`);
            });
        };
    },
};