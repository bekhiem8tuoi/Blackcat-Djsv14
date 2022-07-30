const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder} = require("discord.js");
const { laysodep, capitalizeWords } = require('../../Modules/functions');
const api = require("../../Modules/Includes/commands/corona");
const name = require("../../Modules/Includes/commands/path");
api.settings({ baseUrl: 'https://disease.sh' });
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["covid", "cv19"], // lệnh phụ
    description: "xem số ca nhiễm covid 19 của Việt Nam và thế giới", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Information", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        if (!args[0]) {
            const data = await api.all();
            const { updated, cases, todayCases, deaths, todayDeaths, critical, recovered, affectedCountries } = data;
            const d = new Date(updated);
            const fulldate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${client.i18n.get(language, "utility", "auto_update")}`})
                .setTitle(`${client.i18n.get(language, "utility", "socanhiemtrenthegioi")}`)
                .setFooter({ text: 'soucre: worldometers.info', iconURL: `${database.avatar}`})
                .addFields([
                  { name: `${client.i18n.get(language, "utility", "corona1")} `, value: `${laysodep(cases)}(+${laysodep(todayCases)})`},
                  { name: `${client.i18n.get(language, "utility", "corona2")} `, value: `${laysodep(deaths)}(+${laysodep(todayDeaths)})`},
                  { name: `${client.i18n.get(language, "utility", "corona3")} `, value: `${laysodep(critical)}`},
                  { name: `${client.i18n.get(language, "utility", "corona4")} `, value: `${laysodep(recovered)}`},
                  { name: `${client.i18n.get(language, "utility", "corona6")} `, value: `${affectedCountries}`},
                  { name: `${client.i18n.get(language, "utility", "corona5")} `, value: `${fulldate}`},
                ]);
            message.reply({ embeds: [embed] });
        } else {
            const data = await api.countries({ country: args.join(' ') });
            const { updated, country, countryInfo, cases, todayCases, deaths, todayDeaths, critical, recovered } = data;
            if (data.message) return message.reply({ content: `${client.i18n.get(language, "utility", "khongthaytennuoc")}` });
            const d = new Date(updated);
            const fulldate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
            const embed2 = new EmbedBuilder()
                .setAuthor({ name: `${client.i18n.get(language, "utility", "info_corona")} ${country}`})
                .setFooter({ text: 'soucre: worldometers.info'})
                .addFields([
                  { name: `${client.i18n.get(language, "utility", "corona1")} `, value: `${laysodep(cases)}(+${laysodep(todayCases)})`},
                  { name: `${client.i18n.get(language, "utility", "corona2")} `, value: `${laysodep(deaths)}(+${laysodep(todayDeaths)})`},
                  { name: `${client.i18n.get(language, "utility", "corona3")} `, value: `${laysodep(critical)}`},
                  { name: `${client.i18n.get(language, "utility", "corona4")} `, value: `${laysodep(recovered)}`},
                  { name: `${client.i18n.get(language, "utility", "corona5")} `, value: `${fulldate}`},
                ]);
            message.reply({ content: `${countryInfo.flag}`});
            message.reply({ embeds: [embed2] });
        };
    },
};