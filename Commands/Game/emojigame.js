const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonStyle } = require("discord.js");
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
            .setDescription(`${client.i18n.get(language, "game", "emojigame_0", { emoji_prefix: prefix })}`)
    let moneyEarned = parseInt(args[0]);
    if (moneyEarned > user.wallet) return message.reply({ embeds: [euro.setDescription(`${client.i18n.get(language, "game", "khongdutien")}`)]});
    if (!moneyEarned) return message.reply({ embeds: [euro] })
    if (moneyEarned < 10) return message.reply({ embeds: [euro.setDescription(`${client.i18n.get(language, "game", "nhohon1k")}`)]});
    if (moneyEarned > 30000) return message.reply({ embeds: [euro.setDescription(`${client.i18n.get(language, "game", "nhohon30k")}`)]});
    if (isNaN(args[0])) return message.reply({ embeds: [euro.setDescription(`${client.i18n.get(language, "game", "chidinhsohople")}`)]})
    const eArray = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣"];
    const randEmoji = eArray[Math.floor(Math.random() * eArray.length)]
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId("😆")
      .setEmoji("😆")
      .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
      .setCustomId("😅")
      .setEmoji("😅")
      .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
      .setCustomId("😂")
      .setEmoji("😂")
      .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
      .setCustomId("🤣")
      .setEmoji("🤣")
      .setStyle(ButtonStyle.Success)
    );
    const row2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId("😀")
      .setEmoji("😀")
      .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
      .setCustomId("😃")
      .setEmoji("😃")
      .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
      .setCustomId("😄")
      .setEmoji("😄")
      .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
      .setCustomId("😁")
      .setEmoji("😁")
      .setStyle(ButtonStyle.Success)
    );

    const guessTheEmoji = new EmbedBuilder()
      .setTitle(`${client.i18n.get(language, "game", "emojigame_1")}`)
      .setDescription(`${client.i18n.get(language, "game", "emojigame_2")} ${randEmoji}`)
      .setTimestamp(Date.now());
    message.channel.send({ embeds: [guessTheEmoji] }).then((m) => {
            setTimeout(function(){
                m.edit({ content: `${client.i18n.get(language, "game", "emojigame_3")}`, components: [row, row2], embeds: []});
            }, 1000);
    });
    const filter = (interaction) => {
            if (interaction.user.id === message.author.id) return true;
            return interaction.reply({ content: `${client.i18n.get(language, "game", "emojigame_4")}` });
          };
          const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1
          });
          collector.on("end",async (ButtonInteraction) => {
            const id = ButtonInteraction.first().customId;

            if (id !== randEmoji) {
                    let result = await client.cs.removeMoney({
                        user: message.author,
                        guild: { id: null },
                        amount: moneyEarned,
                    });
                    ButtonInteraction.first().update({ embeds: [new EmbedBuilder()
                      .setTitle(`${client.i18n.get(language, "game", "emojigame_5")}`)
                      .addFields({ name: `${message.author.tag}`, value: `${client.i18n.get(language, "game", "embed_money5")}`, inline: true },
								                 { name: `${client.i18n.get(language, "game", "embed_money2")}`, value: `- ${await client.cs.format(moneyEarned)}`, inline: true },
								                 { name: `${client.i18n.get(language, "game", "embed_money3")}`, value: `${await client.cs.format(result.rawData.wallet)}`, inline: true })
					          	.setColor(database.colors.vang)], components: []});
            } else {
              let moneylost = moneyEarned * 2
                moneyEarned += Math.trunc(moneylost)
              const money = moneyEarned;
              let result = await client.cs.addMoney({
                user: message.author,
                guild: { id: null },
                amount: money,
                });
                ButtonInteraction.first().update({ embeds: [new EmbedBuilder()
                      .setTitle(`${client.i18n.get(language, "game", "emojigame_6")}`)
                      .addFields({ name: `${message.author.tag}`, value: `${client.i18n.get(language, "game", "embed_money1")}`, inline: true },
								                 { name: `${client.i18n.get(language, "game", "embed_money2")}`, value: `+ ${await client.cs.format(money)}`, inline: true },
								                 { name: `${client.i18n.get(language, "game", "embed_money3")}`, value: `${await client.cs.format(result.rawData.wallet)}`, inline: true })
                ], components: [] });
            };
          });
     },
};