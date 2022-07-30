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
    run: async(client, message, args, blackcat, prefix, database, emoji, language) => {
        const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
        const { v, x } = emoji;
        const banmember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let banReason = args.join(" ").slice(23);
        if (!banmember) {
            const MissingArgs = new EmbedBuilder()
                .setTitle(`${client.i18n.get(language, "moderation", "sayraloi")}`)
                .setDescription(`${client.i18n.get(language, "moderation", "tagmember")}`)
                .addFields({
                    name: `${client.i18n.get(language, "moderation", "nomember")}`,
                    value: `${client.i18n.get(language, "moderation", "taguser")}`
                })
                .setColor(database.colors.vang)
            return message.reply({ embeds: [MissingArgs] })
        };
        if (!banmember.bannable) {
            const err = new EmbedBuilder()
                .setTitle(`${client.i18n.get(language, "moderation", "sayraloi")}`)
                .setDescription(`${client.i18n.get(language, "moderation", "noband")}`)
                .setColor(database.colors.vang)
            message.reply({ embeds: [err] })
        };
      
        if (message.guild.me.roles.highest.comparePositionTo(banmember.roles.highest) < 0) {
            const err = new EmbedBuilder()
                .setTitle(`${client.i18n.get(language, "moderation", "sayraloi")}`)
                .setColor(database.colors.vang)
                .setDescription(`**${client.i18n.get(language, "moderation", "topband")} \`${banmember.user.tag}\`**`)
            return message.reply({ embeds: [err] });
        } else {
          message.reply("test")
        }
        let a = new ButtonBuilder()
        .setCustomId('accept')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji(v)
        let b = new ButtonBuilder()
        .setCustomId('decline')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji(x)
        let row = new ActionRowBuilder().addComponents(a, b);
        const collector = message.channel.createMessageComponentCollector({
            componentType: 'BUTTON',
            time: 30000
        });
        message.reply({embeds: [new EmbedBuilder()
        .setTitle(`${client.i18n.get(language, "moderation", "bandmember")}`)
        .setDescription(`${client.i18n.get(language, "moderation", "sure_band")} ${banmember} ${client.i18n.get(language, "moderation", "voilydo")} ${banReason} ?`)
        .addFields({ name: `${client.i18n.get(language, "moderation", "clickemojis")}`, value: `${client.i18n.get(language, "moderation", "luatron", { emoji: v, emoji2: x })}`})
        .setColor(database.colors.vang)], 
        components: [row]
        });
        collector.on('collect', async (m) => {
            if (m.customId === 'accept') {
                try {
                banmember.ban({ reason: banReason || `${client.i18n.get(language, "moderation", "banreason")}`});
                await banmember.send({ embeds: [new EmbedBuilder()
                    .setTitle(`${client.i18n.get(language, "moderation", "rattiec")}`)
                    .setDescription(`${client.i18n.get(language, "moderation", "messageband1")} \`${banmember.guild.name}\`. ${client.i18n.get(language, "moderation", "messageband2")}: \`${banReason}\``)
                    .setColor(database.colors.vang)
                    ],
                });
                a.setDisabled(true);
                b.setDisabled(true);
                row = new ActionRowBuilder().addComponents(a, b);
                m.update({embeds: [new EmbedBuilder()
                    .setTitle(`${client.i18n.get(language, "moderation", "ban_success")}`)
                    .setColor(database.colors.vang)
                    .setDescription(`${client.i18n.get(language, "moderation", "daband")} ${banmember} ${client.i18n.get(language, "moderation", "messageband2")} ${banReason}`)
                    .setTimestamp()], components: [row]
                });
                } catch (err) {
                    if (err.message.includes(`${client.i18n.get(language, "moderation", "messageError")}`)) {
                        banmember.ban({  reason: banReason || `${client.i18n.get(language, "moderation", "banreason")}` });
                    } else {
                        a.setDisabled(true);
                        b.setDisabled(true);
                        return m.update({embeds: [new EmbedBuilder()
                            .setTitle(`${client.i18n.get(language, "moderation", "khongthegoitinnhan")}`)
                            .setColor(database.colors.vang)
                            .setDescription(`${client.i18n.get(language, "moderation", "ban_success")}`)
                            .setTimestamp()], components: [row]
                        });
                    };
                };
            };
            if (m.customId === 'decline') {
                a.setDisabled(true);
                b.setDisabled(true);
                m.update({embeds: [new EmbedBuilder()
                    .setTitle(`${client.i18n.get(language, "moderation", "huyband")}`)
                    .setColor(database.colors.vang)
                    .setDescription(`${client.i18n.get(language, "moderation", "huyband1")} ${banmember}`)
                    .setTimestamp()
                ],
                components: [row]
                });
            };
        });
    },
};