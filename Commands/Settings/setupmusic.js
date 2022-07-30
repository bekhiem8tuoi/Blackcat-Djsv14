
const { discord } = require("../../Modules/Json/invite");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: "",
    category: "Settings",
    aliases: ["sums", "automusic"],
    userPerms: [], 
    owner: true,
    description: "tự động phát nhạc dành riêng cho kênh",
    run: async(client, message, args, prefix, database, emoji, language) => {
        try {
            const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, SelectMenuBuilder} = require("discord.js");
            const { member } = message;
            const { guild } = member;
            var embeds = [new EmbedBuilder()
              .setColor(database.colors.vang)
              .setTitle(`${client.i18n.get(language, "settings", "hangdoicua")} ${message.guild.name}`)
              .setDescription(`${client.i18n.get(language, "settings", "khongconhac")}`)
              .setThumbnail(message.guild.iconURL({ dynamic: true })),
              new EmbedBuilder()
              .setColor(database.colors.vang)
              .setFooter({ text: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true })}`})
              .setImage(message.guild.banner ? message.guild.bannerURL({ size: 4096 }) : `${database.avatar}`)
              .setTitle(`${client.i18n.get(language, "settings", "debatdauhat")}`)
              .setDescription(`> ${client.i18n.get(language, "settings", "mp3online")}`)
            ]
            var Emojis = [
              `0️⃣`,
              `1️⃣`,
              `2️⃣`,
              `3️⃣`,
            ]
            var components = [new ActionRowBuilder().addComponents([
                new SelectMenuBuilder()
                .setCustomId(`MessageSelectMenu`)
                .addOptions([`Lofi chill`, `Real love`, `${client.i18n.get(language, "settings", "thattinh")}`, `Gaming`].map((musicbot, index) => {
                  return {
                    label: musicbot.substr(0, 25),
                    value: musicbot.substr(0, 25),
                    description: `${client.i18n.get(language, "settings", "dowload_music")} '${musicbot}'`.substr(0, 50),
                    emoji: Emojis[index]
                  }
                }))
              ]),
              new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId('Skip')
                .setEmoji(`⏭`)
                .setLabel(`${client.i18n.get(language, "handlers", "skip")}`)
                .setDisabled(),
                new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setCustomId('Stop')
                .setEmoji(`🏠`)
                .setLabel(`${client.i18n.get(language, "handlers", "stop")}`)
                .setDisabled(),
                new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId('Pause')
                .setEmoji('⏸')
                .setLabel(`${client.i18n.get(language, "handlers", "pause")}`)
                .setDisabled(),
                new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId('Autoplay')
                .setEmoji('🔁')
                .setLabel(`${client.i18n.get(language, "handlers", "autoplay")}`)
                .setDisabled(),
                new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId('Shuffle')
                .setEmoji('🔀')
                .setLabel(`${client.i18n.get(language, "handlers", "shuffle")}`)
                .setDisabled(),
              ]),
              new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId('Song')
                .setEmoji(`🔁`)
                .setLabel(`${client.i18n.get(language, "handlers", "song")}`)
                .setDisabled(),
                new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId('Queue')
                .setEmoji(`🔂`)
                .setLabel(`${client.i18n.get(language, "handlers", "queue")}`)
                .setDisabled(),
                new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId('Forward')
                .setEmoji('⏩')
                .setLabel(`${client.i18n.get(language, "handlers", "forward")}`)
                .setDisabled(),
                new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId('Rewind')
                .setEmoji('⏪')
                .setLabel(`${client.i18n.get(language, "handlers", "rewind")}`)
                .setDisabled(),
                new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId('Lyrics')
                .setEmoji('📝')
                .setLabel(`${client.i18n.get(language, "handlers", "lyrics")}`)
                .setDisabled(),
              ]),
            ]
            let channel = message.mentions.channels.first();
            if (!channel) return message.reply(`${client.i18n.get(language, "settings", "chuapingkenh")}`)
            channel.send({ embeds, components }).then(msg => {
              client.settings.set(message.guild.id, channel.id, `music.channel`);
              client.settings.set(message.guild.id, msg.id, `music.message`);
              return message.reply(`${emoji.Hihi} **${client.i18n.get(language, "settings", "success_music")}** <#${channel.id}>`)
            });
          } catch (e) {
            console.log(String(e.stack))
          }
    }
} 