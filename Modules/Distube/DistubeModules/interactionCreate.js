module.exports = (client) => {
 try {
const { updateMusicSystem, dj_role2, createBar, delay, escapeRegex } = require("../../functions");
const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, Permissions, SelectMenuBuilder, ButtonStyle} = require("discord.js");
const database = require("../../Json/database.json"); 
const moibot = require("../../Json/invite.json");
const emoji = require("../../Json/emoji.json");
const DisTube = require("distube");
const settings = { "test": "zz" };
const config = require("../../../config.json");
const playerintervals = new Map();
const PlayerMap = new Map();
let songEditInterval = null;
client.on(`interactionCreate`, async (interaction) => {
    if (!interaction.isButton() && !interaction.isSelectMenu()) return;
    var { guild, message, channel, member, user } = interaction;
    if (!guild) guild = client.guilds.cache.get(interaction.guildId);
    if (!guild) return;
    var prefix = client.settings.get(guild.id);
    var data = client.settings.get(guild.id, `music`);
    var musicChannelId = data.channel;
    var musicChannelMessage = data.message;
    if (!musicChannelId || musicChannelId.length < 5) return;
    if (!musicChannelMessage || musicChannelMessage.length < 5) return;
    if (!channel) channel = guild.channels.cache.get(interaction.channelId);
    if (!channel) return;
    if (musicChannelId != channel.id) return;
    if (musicChannelMessage != message.id) return;
    if (!member) member = guild.members.cache.get(user.id);
    if (!member) member = await guild.members.fetch(user.id).catch(() => {});
    if (!member) return;
    if (!member.voice.channel) return interaction.reply({ ephemeral: true, content: `**${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}!**` })
    if (!member.voice.channel)
      return interaction.reply({ content: `**${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}**`, ephemeral: true })
      if (!member.voice.channel) return message.reply({	embeds: [new EmbedBuilder()
        .setColor(database.colors.vang)
        .setTitle(`**${client.i18n.get(language, "handlers", "thamgiakenhvoicuatoi")}**`)
				],
			})
			if (member.voice.channel.userLimit != 0 && member.voice.channel.full)
				return message.reply({ embeds: [new EmbedBuilder()
            .setColor(database.colors.vang)
						.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
						.setTitle(`${client.i18n.get(language, "handlers", "kenhvoiceday")}`)
					],
				});
    let newQueue = client.distube.getQueue(guild.id);
    if (interaction.isButton()) {
      if (!newQueue || !newQueue.songs || !newQueue.songs[0]) {
        return interaction.reply({ content: `${client.i18n.get(language, "handlers", "danhsachnhactrong")}`, ephemeral: true })
      }
      if (newQueue && interaction.customId != `Lyrics` && dj_role2(client, member, newQueue.songs[0])) {
        return interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor(database.colors.vang)
						.setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
            .setTitle(`${emoji.x} **${client.i18n.get(language, "handlers", "dj_role")}**`)
            .setDescription(`**DJ-ROLES:**\n${dj_role2(client, member, newQueue.songs[0])}`)
          ],
          ephemeral: true
        });
      }
      switch (interaction.customId) {
        case `Skip`: {
          if (newQueue.songs.length == 0) {
            interaction.reply({
              embeds: [new EmbedBuilder()
                .setColor(database.colors.vang)
                .setTimestamp()
                .setTitle(`⏹ **${client.i18n.get(language, "handlers", "stop_leave")}**`)
                .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
              ]
            })
            await newQueue.stop()
            return
          }
          await newQueue.skip();
          interaction.reply({
            embeds: [new EmbedBuilder()
              .setColor(database.colors.vang)
              .setTimestamp()
              .setTitle(`⏭ **${client.i18n.get(language, "handlers", "skip_2")}!**`)
              .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
            ]
          }) 
        }
        break;
      case `Stop`: {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor(database.colors.vang)
            .setTimestamp()
            .setTitle(`⏹ **${client.i18n.get(language, "handlers", "stop_leave")}**`)
            .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
          ]
        })
        if (newQueue) {
          await newQueue.stop();
        }
        
      }
      break;
      case `Pause`: {
        if (newQueue.paused) {
          newQueue.resume();
          interaction.reply({
            embeds: [new EmbedBuilder()
              .setColor(database.colors.vang)
              .setTimestamp()
              .setTitle(`▶️ **${client.i18n.get(language, "handlers", "pause2")}!**`)
              .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
            ]
          })
        } else {
          await newQueue.pause();
          interaction.reply({
            embeds: [new EmbedBuilder()
              .setColor(database.colors.vang)
              .setTimestamp()
              .setTitle(`⏸ **${client.i18n.get(language, "handlers", "pause")}**`)
              .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
            ]
          })
        }
        
      }
      break;
      case `Autoplay`: {
        newQueue.toggleAutoplay();
        interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(database.colors.vang)
            .setTimestamp()
            .setTitle(`${newQueue.autoplay ? `${emoji.v} **${client.i18n.get(language, "handlers", "autoplay_1")}**`: `${emoji.x} **${client.i18n.get(language, "handlers", "autoplay_2")}**`}`)
            .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
          ]
        })       
      }
      break;
      case `Shuffle`: {
        client.maps.set(`beforeshuffle-${newQueue.id}`, newQueue.songs.map(track => track).slice(1));
        await newQueue.shuffle();
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor(database.colors.vang)
            .setTimestamp()
            .setTitle(`🔀 **${client.i18n.get(language, "handlers", "shuffle")} ${newQueue.songs.length} ${client.i18n.get(language, "handlers", "song")}**`)
            .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
          ]
        }) 
      }
      break;
      case `Song`: {
        if (newQueue.repeatMode == 1) {
          await newQueue.setRepeatMode(0);
        } else {
          await newQueue.setRepeatMode(1);
        }
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor(database.colors.vang)
            .setTimestamp()
            .setTitle(`${newQueue.repeatMode == 1 ? `${emoji.v} **${client.i18n.get(language, "handlers", "song_1")}**`: `${emoji.x} **${client.i18n.get(language, "handlers", "song_2")}**`}`)
            .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
          ]
        })
        
      }
      break;
      case `Queue`: {
        if (newQueue.repeatMode == 2) {
          await newQueue.setRepeatMode(0);
        } else {
          await newQueue.setRepeatMode(2);
        }
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor(database.colors.vang)
            .setTimestamp()
            .setTitle(`${newQueue.repeatMode == 2 ? `${emoji.v} **${client.i18n.get(language, "handlers", "queue_1")}**`: `${emoji.x} **${client.i18n.get(language, "handlers", "queue_2")}**`}`)
            .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
          ]
        }) 
      }
      break;
      case `Forward`: {
				let seektime = newQueue.currentTime + 10;
				if (seektime >= newQueue.songs[0].duration) seektime = newQueue.songs[0].duration - 1;
        await newQueue.seek(seektime);
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor(database.colors.vang)
            .setTimestamp()
            .setTitle(`⏩ **${client.i18n.get(language, "handlers", "forward_1")}!**`)
            .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
          ]
        })
      }
      break;
      case `Rewind`: {
				let seektime = newQueue.currentTime - 10;
				if (seektime < 0) seektime = 0;
				if (seektime >= newQueue.songs[0].duration - newQueue.currentTime) seektime = 0;
        await newQueue.seek(seektime);
        interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(database.colors.vang)
            .setTimestamp()
            .setTitle(`⏪ **${client.i18n.get(language, "handlers", "rewind_1")}!**`)
            .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
          ]
        })
      }
      break;
      case `Lyrics`: {
        const fetch = require("node-fetch");
        const song = (`${newQueue.songs[0].name}`)
        const json = await fetch(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`).then(r => r.json());
        if (json.error) return interaction.reply({ content: `${client.i18n.get(language, "handlers", "lyrics0")}`, ephemeral: true });
        const url = `${song.replace(" ", "+")}`;
        let lyrics = json.lyrics;
        if (lyrics.length > 4096)
          lyrics = `${client.i18n.get(language, "handlers", "lyrics1")} [https://popcat.xyz/lyrics/${url}](https://popcat.xyz/lyrics/${url}) ${client.i18n.get(language, "handlers", "lyrics2")}`;
          await interaction.reply({ embeds: [new EmbedBuilder()
            .setTitle(json.full_title === `${client.i18n.get(language, "handlers", "khongco")}` ? json.title : json.full_title)
            .setURL(json.url)
            .setThumbnail(json.image)
            .addField(`${client.i18n.get(language, "handlers", "casi")}`, json.artist)
            .setDescription(`${client.i18n.get(language, "handlers", "text_lyrics")} ${lyrics}`)
            .setColor(database.colors.vang)
          ], ephemeral: true });
      }
      break;
      }
      updateMusicSystem(newQueue);
    };
    if (interaction.isSelectMenu()) {
      let link = `https://open.spotify.com/playlist/5ravtOAghdGsfYeKhFx0xU`;
      if (interaction.values[0]) {
        if (interaction.values[0].toLowerCase().startsWith(`l`)) link = `https://open.spotify.com/playlist/2kLGCKLDSXu7d2VvApmiWg`;
        if (interaction.values[0].toLowerCase().startsWith(`t`)) link = `https://open.spotify.com/playlist/4Aj61H8LI3OdtHLwEf5wo5`;
        if (interaction.values[0].toLowerCase().startsWith(`r`)) link = `https://open.spotify.com/playlist/7yQiYrVwwV8TgGa1FwhCUl`;
        if (interaction.values[0].toLowerCase().startsWith(`g`)) link = `https://open.spotify.com/playlist/5ravtOAghdGsfYeKhFx0xU`;
        /**
         *  CÓ THỂ THÊM CÁC INTERACTION KHÁC VÀO VÍ DỤ: if (interaction.values[0].toLowerCase().startsWith(`Tên miền`)) link = `Link nhạc <ưu tiên các playlist>`;
         */
      }
      await interaction.reply({ content: `${emoji.Vong} ${client.i18n.get(language, "handlers", "dang_tai")} **'${interaction.values[0]}'**` });
			try {
				let options = { member: member }
				if (!newQueue) options.textChannel = guild.channels.cache.get(channel.id)
				await client.distube.play(member.voice.channel, link, options)
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				interaction.editReply({
					content: `${emoji.x} Lỗi: `,
					embeds: [new EmbedBuilder()
             .setColor(database.colors.vang)
						.setDescription(`\`\`\`${e}\`\`\``)
					],
				});
			};
    };
    });
   
    function generateQueueEmbed(client, guildId, leave) {
    let guild = client.guilds.cache.get(guildId)
    if (!guild) return;
    var embeds = [
      new EmbedBuilder()
      .setColor(database.colors.vang)
      .setTitle(`${emoji.Muiten} ${client.i18n.get(language, "settings", "hangdoicua")} ${guild.name}`)
      .setDescription(`${emoji.Muiten} **${client.i18n.get(language, "settings", "khongconhac")}**`)
      .setThumbnail(guild.iconURL({ dynamic: true })),
      new EmbedBuilder()
      .setColor(database.colors.vang)
      .setImage(guild.banner ? guild.bannerURL({ size: 4096 }) : database.avatar)
      .setTitle(`${client.i18n.get(language, "settings", "debatdauhat")}`)
      .setDescription(`=>> *${client.i18n.get(language, "settings", "mp3online")}*`)
    ]
    let newQueue = client.distube.getQueue(guild.id);
    var djs = client.settings.get(guild.id, `djroles`);
    if(!djs || !Array.isArray(djs)) djs = [];
    else djs = djs.map(r => `<@&${r}>`);
    if(djs.length == 0 ) djs = `${client.i18n.get(language, "handlers", "khongthietlap")}`;
    else djs.slice(0, 15).join(`, `);
    if (!leave && newQueue && newQueue.songs[0]) {
      embeds[1] = new EmbedBuilder().setImage(`https://img.youtube.com/vi/${newQueue.songs[0].id}/mqdefault.jpg`)
        .setAuthor({ name: `${newQueue.songs[0].name}`, iconURL: `https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif`, url: newQueue.url } )
        .addFields({ name: `${client.i18n.get(language, "handlers", "yeucauboi")}`, value: `>>> ${newQueue.songs[0].user}`, inline: true },
          { name: `${emoji.Muiten} ${client.i18n.get(language, "handlers", "am_luong")}`, value: `>>> \`${newQueue.volume} %\``, inline: true },
          { name: `${newQueue.playing ? `${emoji.Muiten} ${client.i18n.get(language, "handlers", "vong_lap")}` : `${client.i18n.get(language, "handlers", "pause")}:`}`, value: newQueue.playing ? `>>> ${newQueue.repeatMode ? newQueue.repeatMode === 2 ? `${emoji.v} ${client.i18n.get(language, "handlers", "hang_cho")}` : `${emoji.v} ${client.i18n.get(language, "handlers", "song")}` : `${emoji.x}`}` : `>>> ${emoji.v}`, inline: true },
          { name: `${emoji.Muiten} ${client.i18n.get(language, "handlers", "autoplay")}`, value: `${newQueue.autoplay ? `${emoji.v}` : `${emoji.x}`}`, inline: true },
          { name: `${emoji.Muiten} ${client.i18n.get(language, "handlers", "bo_loc")}${newQueue.filters.length > 0 ? ``: ``}:`, value: `>>> ${newQueue.filters && newQueue.filters.length > 0 ? `${newQueue.filters.map(f=>`\`${f}\``).join(`, `)}` : `${emoji.x}`}`, inline: newQueue.filters.length > 4 ? false : true },
          { name: `${emoji.Muiten} DJ-Role${client.settings.get(newQueue.id, `djroles`).length > 1 ? ``: ``}:`, value: `>>> ${djs}`, inline: newQueue.filters.length > 4 ? false : true },)
        .addFields({ name: `${emoji.Muiten} ${client.i18n.get(language, "handlers", "thoi_luong")}`, value: `\`${newQueue.formattedCurrentTime}\` ${createBar(newQueue.songs[0].duration, newQueue.currentTime, 13)} \`${newQueue.songs[0].formattedDuration}\``, inline: true },)  
      delete embeds[1].description;
      delete embeds[1].title;
      const tracks = newQueue.songs;
      var maxTracks = 10; 
      var songs = tracks.slice(0, maxTracks);
      embeds[0] = new EmbedBuilder()
      .setTitle(`${emoji.Dj} ${client.i18n.get(language, "handlers", "hangdoicua")} ${guild.name}  -  [ ${newQueue.songs.length} ${client.i18n.get(language, "handlers", "song")} ]`)
      .setColor(database.colors.vang)
      .setDescription(String(songs.map((track, index) => `**\` ${++index}. \` ${track.url ? `[${track.name.substr(0, 60).replace(/\[/igu, `\\[`).replace(/\]/igu, `\\]`)}](${track.url})` : track.name}** - \`${track.isStream ? `${client.i18n.get(language, "handlers", "truc_tiep")}` : track.formattedDuration}\`\n> *__${track.user?.tag}__*`).join(`\n`)).substr(0, 2048));
      if(newQueue.songs.length > 10)
        embeds[0] = new EmbedBuilder().addField(`**\`N.\` *${newQueue.songs.length > maxTracks ? newQueue.songs.length - maxTracks : newQueue.songs.length} ${client.i18n.get(language, "handlers", "cacbainhackhac")}***`, `\u200b`)
       embeds[0] = new EmbedBuilder().addField(`**\`0.\` ${client.i18n.get(language, "handlers", "baihathientai")}**`, `**${newQueue.songs[0].url ? `[${newQueue.songs[0].name.substr(0, 60).replace(/\[/igu, `\\[`).replace(/\]/igu, `\\]`)}](${newQueue.songs[0].url})`:newQueue.songs[0].name}** - \`${newQueue.songs[0].isStream ? `${client.i18n.get(language, "handlers", "truc_tiep")}` : newQueue.formattedCurrentTime}\`\n> *__${newQueue.songs[0].user?.tag}__*`)
    };
    var Emojis = [`0️⃣`, `1️⃣`, `2️⃣`, `3️⃣`]
    var musicmixMenu = new SelectMenuBuilder()
      .setCustomId(`MessageSelectMenu`)
      .addOptions([`Lofi chill`, `Real love`, `${client.i18n.get(language, "handlers", "thattinh")}`, `Gaming`].map((musicbot, index) => {
        return {
          label: musicbot.substr(0, 25),
          value: musicbot.substr(0, 25),
          description: `${client.i18n.get(language, "settings", "dowload_music")} '${musicbot}'`.substr(0, 50),
          emoji: Emojis[index]
        }
      }))
    var stopbutton = new ButtonBuilder()
    .setStyle('Danger')
    .setCustomId('Stop')
    .setEmoji(`🏠`)
    .setLabel(`${client.i18n.get(language, "handlers", "stop")}`)
    .setDisabled()
    var skipbutton = new ButtonBuilder()
    .setStyle('Primary')
    .setCustomId('Skip')
    .setEmoji(`⏭`)
    .setLabel(`${client.i18n.get(language, "handlers", "skip")}`)
    .setDisabled();
    var shufflebutton = new ButtonBuilder()
    .setStyle('Primary')
    .setCustomId('Shuffle')
    .setEmoji('🔀')
    .setLabel(`${client.i18n.get(language, "handlers", "shuffle")}`)
    .setDisabled();
    var pausebutton = new ButtonBuilder()
    .setStyle('Secondary')
    .setCustomId('Pause')
    .setEmoji('⏸')
    .setLabel(`${client.i18n.get(language, "handlers", "pause")}`)
    .setDisabled();
    var autoplaybutton = new ButtonBuilder()
    .setStyle('Success')
    .setCustomId('Autoplay')
    .setEmoji('🔁')
    .setLabel(`${client.i18n.get(language, "handlers", "autoplay")}`)
    .setDisabled();
    var songbutton = new ButtonBuilder()
    .setStyle('Success')
    .setCustomId('Song')
    .setEmoji(`🔁`)
    .setLabel(`${client.i18n.get(language, "handlers", "song")}`)
    .setDisabled();
    var queuebutton = new ButtonBuilder()
    .setStyle('Success')
    .setCustomId('Queue')
    .setEmoji(`🔂`)
    .setLabel(`${client.i18n.get(language, "handlers", "queue")}`)
    .setDisabled();
    var forwardbutton = new ButtonBuilder()
    .setStyle('Primary')
    .setCustomId('Forward')
    .setEmoji('⏩')
    .setLabel(`${client.i18n.get(language, "handlers", "forward")}`)
    .setDisabled();
    var rewindbutton = new ButtonBuilder()
    .setStyle('Primary')
    .setCustomId('Rewind')
    .setEmoji('⏪')
    .setLabel(`${client.i18n.get(language, "handlers", "rewind")}`)
    .setDisabled();
    var lyricsbutton = new ButtonBuilder()
    .setStyle('Primary')
    .setCustomId('Lyrics')
    .setEmoji('📝')
    .setLabel(`${client.i18n.get(language, "handlers", "lyrics")}`)
    .setDisabled();
    if (!leave && newQueue && newQueue.songs[0]) {
      skipbutton = skipbutton.setDisabled(false);
      shufflebutton = shufflebutton.setDisabled(false);
      stopbutton = stopbutton.setDisabled(false);
      songbutton = songbutton.setDisabled(false);
      queuebutton = queuebutton.setDisabled(false);
      forwardbutton = forwardbutton.setDisabled(false);
      rewindbutton = rewindbutton.setDisabled(false);
      autoplaybutton = autoplaybutton.setDisabled(false);
      pausebutton = pausebutton.setDisabled(false);
      lyricsbutton = lyricsbutton.setDisabled(false);
      if (newQueue.autoplay) {
        autoplaybutton = autoplaybutton.setStyle('Secondary')
      }
      if (newQueue.paused) {
        pausebutton = pausebutton.setStyle('Success')
        .setEmoji('▶️')
        .setLabel(`${client.i18n.get(language, "handlers", "pause2")}`)
      }
      switch(newQueue.repeatMode) {
        default: { 
          songbutton = songbutton.setStyle('Success')
          queuebutton = queuebutton.setStyle('Success')
        }break;
        case 1: {
          songbutton = songbutton.setStyle('Secondary')
          queuebutton = queuebutton.setStyle('Success')
        }break;
        case 2: {
          songbutton = songbutton.setStyle('Success')
          queuebutton = queuebutton.setStyle('Secondary')
        }break;
      }
    }
    var components = [
      new ActionRowBuilder().addComponents([ musicmixMenu ]),
      new ActionRowBuilder().addComponents([ skipbutton, stopbutton, pausebutton, autoplaybutton, shufflebutton ]),
      new ActionRowBuilder().addComponents([ songbutton, queuebutton, rewindbutton, forwardbutton, lyricsbutton ])
    ];
    return { embeds, components };
  };
    } catch (error) {
      console.log("interaction Distube lỗi: " + error)
    };
};