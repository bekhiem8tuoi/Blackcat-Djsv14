const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["sendmoney", "goitien"], // lệnh phụ
    description: "gởi tiền vào ngân hàng", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Economy", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        let money = args.join(" ");
        if (!money) return message.channel.send({ content: `${client.i18n.get(language, "economy", "count_money")}`});

        let result = await client.cs.deposite({
            user: message.author,
            guild: { id : null }, 
            amount: money
        });
        if (result.error) {
            if (result.type === 'money') return message.reply({ content: `${client.i18n.get(language, "economy", "count_money")}`});
            if (result.type === 'negative-money') return message.reply({ content: `${client.i18n.get(language, "economy", "negative_money")}`});
            if (result.type === 'low-money') return message.reply({ content: `${client.i18n.get(language, "economy", "low_money")}`});
            if (result.type === 'no-money') return message.reply({ content: `${client.i18n.get(language, "economy", "no_money")}`});
            if (result.type === 'bank-full') return message.reply({ content: `${client.i18n.get(language, "economy", "bank_full")}`})
        } else {
            if (result.type === 'all-success') return message.reply({ embeds: [new EmbedBuilder()
                                                                          .setTitle(`${client.i18n.get(language, "economy", "all_success_title")}`) 
                                                                          .setColor(database.colors.vang)
                                                                          .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
                                                                          .setDescription(`${client.i18n.get(language, "economy", "all_success1")}\n${emoji.money} ${await client.cs.format(result.rawData.wallet)} ${client.i18n.get(language, "economy", "all_success2")}\n ${emoji.money} ${await client.cs.format(result.rawData.bank)} ${client.i18n.get(language, "economy", "all_success3")}`)
               ],
            });
            if (result.type === 'success') return message.reply({ embeds: [new EmbedBuilder()
                                                                          .setTitle(`${client.i18n.get(language, "economy", "success_title")}`) 
                                                                          .setColor(database.colors.vang)
                                                                          .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
                                                                          .setDescription(`${client.i18n.get(language, "economy", "success1")}\n ${emoji.money} ${await client.cs.format(result.amount)} \n${client.i18n.get(language, "economy", "success2")} \n${client.i18n.get(language, "economy", "success3")} \n${emoji.money} ${await client.cs.format(result.rawData.wallet)} \n${client.i18n.get(language, "economy", "vitien")} ${client.i18n.get(language, "economy", "success4")} \n${emoji.money} ${await client.cs.format(result.rawData.bank)} \n${client.i18n.get(language, "economy", "all_success3")}`)
              ],
            });
        };
    },
};
