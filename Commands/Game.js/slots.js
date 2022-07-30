const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Game", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    let user = await client.cs.balance({ 
             user: message.author.id,
             guild: { id : null },
    });
    const euro = new EmbedBuilder()
            .setColor(database.colors.vang)
            .setTimestamp()
            .setDescription(`${client.i18n.get(language, "game", "slot_0", { slot_prefix: prefix })}`)
    let moneyEarned = parseInt(args[0]);
    if (moneyEarned > user.wallet) return message.reply({ embeds: [euro.setDescription(`${client.i18n.get(language, "game", "khongdutien")}`)]});
    if (!moneyEarned) return message.reply({ embeds: [euro] })
    if (moneyEarned < 10) return message.reply({ embeds: [euro.setDescription(`${client.i18n.get(language, "game", "nhohon1k")}`)]});
    if (moneyEarned > 30000) return message.reply({ embeds: [euro.setDescription(`${client.i18n.get(language, "game", "nhohon30k")}`)]});
    if (isNaN(args[0])) return message.reply({ embeds: [euro.setDescription(`${client.i18n.get(language, "game", "chidinhsohople")}`)]});
    const slotemoji = ":money_mouth:"; 
    let items = ['💵', '💍', '💯'];
    let $ = items[Math.floor(items.length * Math.random())];
    let $$ = items[Math.floor(items.length * Math.random())];
    let $$$ = items[Math.floor(items.length * Math.random())];
    spinner = await message.channel.send({ content: "• " + slotemoji + "  " + slotemoji + "  " + slotemoji + " •" })
    setTimeout(() => {
        spinner.edit({ content: "• " + $ + "  " + slotemoji + "  " + slotemoji + " •" });
    }, 600);
    setTimeout(() => {
        spinner.edit({ content: "• " + $ + "  " + $$ + "  " + slotemoji + " •" });
    }, 1200);
    setTimeout(() => {
        spinner.edit({ content: "• " + $ + "  " + $$ + "  " + $$$ + " •" });
    }, 1800);
    if ($$ !== $ && $$ !== $$$) {
        setTimeout(async () => {
            let result = await client.cs.removeMoney({
                user: message.author,
                guild: { id: null },
                amount: moneyEarned,
            });
            message.reply({ content: `${client.i18n.get(language, "game", "slot_1", {
              thanhvien_0: message.author.tag,
              mattien_0: await client.cs.format(moneyEarned),
              conlai_0: await client.cs.format(result.rawData.wallet)
            })}`});
        }, 3000);
    } else if ($ === $$ && $ === $$$) {
        setTimeout(async () => {
            let moneylost = moneyEarned * 2.76
                moneyEarned += Math.trunc(moneylost)
            const money = moneyEarned;
            let result = await client.cs.addMoney({
                user: message.author,
                guild: { id: null },
                amount: money,
            });
            message.reply(`${client.i18n.get(language, "game", "slot_2", {
              thanhvien_1: message.author.tag,
              thangtien_0: await client.cs.format(money),
              conlai_1: await client.cs.format(result.rawData.wallet)
            })}`);
       }, 3000);
    }  else if ($$ !== $ && $ !== $$$) {
        setTimeout(async () => {
            let result = await client.cs.removeMoney({
                user: message.author,
                guild: { id: null },
                amount: moneyEarned,
            });
            message.reply({ content: `${client.i18n.get(language, "game", "slot_1", {
              thanhvien_0: message.author.tag,
              mattien_0: await client.cs.format(moneyEarned),
              conlai_0: await client.cs.format(result.rawData.wallet)
            })}`});
        }, 3000);
    } else if ($$ !== $$$ && $$ !== $) {
        setTimeout(async () => {
            let result = await client.cs.removeMoney({
                user: message.author,
                guild: { id: null },
                amount: moneyEarned,
            });
            message.reply({ content: `${client.i18n.get(language, "game", "slot_1", {
              thanhvien_0: message.author.tag,
              mattien_0: await client.cs.format(moneyEarned),
              conlai_0: await client.cs.format(result.rawData.wallet)
            })}`});
       }, 3000);
    } else if ($$$ !== $$ && $ !== $$) {
        setTimeout(async () => {
            let result = await client.cs.removeMoney({
                user: message.author,
                guild: { id: null },
                amount: moneyEarned,
            });
            message.reply({ content: `${client.i18n.get(language, "game", "slot_1", {
              thanhvien_0: message.author.tag,
              mattien_0: await client.cs.format(moneyEarned),
              conlai_0: await client.cs.format(result.rawData.wallet)
            })}`});
        }, 3000);
    } else if ($$ !== $$$ && $ !== $$$) {
        setTimeout(async () => {
            let result = await client.cs.removeMoney({
                user: message.author,
                guild: { id: null },
                amount: moneyEarned,
            });
            message.reply({ content: `${client.i18n.get(language, "game", "slot_1", {
              thanhvien_0: message.author.tag,
              mattien_0: await client.cs.format(moneyEarned),
              conlai_0: await client.cs.format(result.rawData.wallet)
            })}`});
       }, 3000);
    } else if ($$ !== $$$ && $$$ !== $$) {
        setTimeout(async () => {
            let result = await client.cs.removeMoney({
                user: message.author,
                guild: { id: null },
                amount: moneyEarned,
            });
            message.reply({ content: `${client.i18n.get(language, "game", "slot_1", {
              thanhvien_0: message.author.tag,
              mattien_0: await client.cs.format(moneyEarned),
              conlai_0: await client.cs.format(result.rawData.wallet)
            })}`});
        }, 3000);
    } else if ($$$ !== $ && $$$ !== $$) {
        setTimeout(async () => {
            let result = await client.cs.removeMoney({
                user: message.author,
                guild: { id: null },
                amount: moneyEarned,
            });
            message.reply({ content: `${client.i18n.get(language, "game", "slot_1", {
              thanhvien_0: message.author.tag,
              mattien_0: await client.cs.format(moneyEarned),
              conlai_0: await client.cs.format(result.rawData.wallet)
            })}`});
        }, 3000);
    } else if ($ !== $$$ && $$$ !== $$) {
        setTimeout(async () => {
            let result = await client.cs.removeMoney({
                user: message.author,
                guild: { id: null },
                amount: moneyEarned,
            });
            message.reply({ content: `${client.i18n.get(language, "game", "slot_1", {
              thanhvien_0: message.author.tag,
              mattien_0: await client.cs.format(moneyEarned),
              conlai_0: await client.cs.format(result.rawData.wallet)
            })}`});
        }, 3000);
    };
  },
};
