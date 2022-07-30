module.exports = (client) => {
const { ButtonBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const { dj_role2, createBar, delay, escapeRegex } = require("../music");
const { updateMusicSystem } = require("../../functions");
const database = require("../../Json/database.json"); 
const moibot = require("../../Json/invite.json");
const config = require("../../../config.json");
const emoji = require("../../Json/emoji.json");
const { DisTube } = require("distube");
const language = client.language;
const playerintervals = new Map();
const PlayerMap = new Map();
let songEditInterval = null;
const settings = [];
  try {
    const autoconnect = async () => {
        let guilds = await client.autoresume.keys;
        if (!guilds || guilds.length == 0) return;
        for (const gId of guilds) {
          try {
            let guild = client.guilds.cache.get(gId);
            if (!guild) {
             await client.autoresume.delete(gId);
              continue;
            }
            let data = await client.autoresume.get(gId);
            let voiceChannel = guild.channels.cache.get(data.voiceChannel);
            if (!voiceChannel && data.voiceChannel) voiceChannel = await guild.channels.fetch(data.voiceChannel).catch(() => {}) || false;
            if (!voiceChannel || !voiceChannel.members || voiceChannel.members.filter(m => !m.user.bot && !m.voice.deaf && !m.voice.selfDeaf).size < 1) {
             await client.autoresume.delete(gId);
              continue;
            }

            let textChannel = guild.channels.cache.get(data.textChannel);
            if (!textChannel) textChannel = await guild.channels.fetch(data.textChannel).catch(() => {}) || false;
            if (!textChannel) {
             await client.autoresume.delete(gId);
              continue;
            }
            let tracks = data.songs;
            if(!tracks || !tracks[0]){
              continue;
            }
            const makeTrack = async track => {
              return new DisTube.Song(
                new DisTube.SearchResult({
                  duration: track.duration,
                  formattedDuration: track.formattedDuration,
                  id: track.id,
                  isLive: track.isLive,
                  name: track.name,
                  thumbnail: track.thumbnail,
                  type: "video",
                  uploader: track.uploader,
                  url: track.url,
                  views: track.views,
                }), guild.members.cache.get(track.memberId) || guild.me, track.source);
            };
            await client.distube.play(voiceChannel, tracks[0].url, {
              member: guild.members.cache.get(tracks[0].memberId) || guild.me,
              textChannel: textChannel
            });
            let newQueue = client.distube.getQueue(guild.id);
            for(const track of tracks.slice(1)){
              newQueue.songs.push(await makeTrack(track))
            };
            await newQueue.setVolume(data.volume)
            if (data.repeatMode && data.repeatMode !== 0) {
              newQueue.setRepeatMode(data.repeatMode);
            };
            if (!data.playing) {
              newQueue.pause();
            };
            await newQueue.seek(data.currentTime);
            await client.autoresume.delete(newQueue.id)
            if (!data.playing) {
              newQueue.pause();
            };
            await delay(settings["auto-resume-delay"] || 1000)
          } catch (e) {
            console.log(e)
          };
        };
      };
    client.on("ready", () => {
        setTimeout(async() => autoconnect(), 2 * client.ws.ping)
    });
    client.distube.on(`playSong`, async (queue, track) => {
        try {
          var newQueue = client.distube.getQueue(queue.id)
          updateMusicSystem(newQueue);
          var data = receiveQueueData(newQueue, track)
          if(queue.textChannel.id === client.settings.get(queue.id, `music.channel`)) return;
          let currentSongPlayMsg = await queue.textChannel.send(data).then(msg => {
            PlayerMap.set(`currentmsg`, msg.id);
            return msg;
          })
          var collector = currentSongPlayMsg.createMessageComponentCollector({
            filter: (i) => i.isButton() && i.user && i.message.author.id == client.user.id,
            time: track.duration > 0 ? track.duration * 1000 : 600000
          }); 
          let lastEdited = false;
          try{
             clearInterval(songEditInterval)
          }catch(e){/* */}
          songEditInterval = setInterval(async () => {
            if (!lastEdited) {
              try{
                var newQueue = client.distube.getQueue(queue.id)
                var data = receiveQueueData(newQueue, newQueue.songs[0])
                await currentSongPlayMsg.edit(data).catch((e) => {/**/})
              }catch (e){
                clearInterval(songEditInterval)
              }
            }
          }, 10000)

          collector.on('collect', async i => {
            if(i.customId != `10` && dj_role2(client, i.member, client.distube.getQueue(i.guild.id).songs[0])) {
              return i.reply({embeds: [new EmbedBuilder()
                .setColor(database.colors.vang)
                .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
                .setTitle(`**${client.i18n.get(language, "handlers", "dj_role")}!**`)
                .setDescription(`**DJ-ROLES:**\n${dj_role2(client, i.member, client.distube.getQueue(i.guild.id).songs[0])}`)
              ], ephemeral: true });
            }
            lastEdited = true;
            setTimeout(() => {
              lastEdited = false
            }, 10000)
            if (i.customId == `1`) {
              let { member } = i;
              const { channel } = member.voice
              if (!channel)
                return i.reply({ content: `**${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}**`, ephemeral: true });
              const queue = client.distube.getQueue(i.guild.id);
              if (!queue || !newQueue.songs || newQueue.songs.length == 0) {
                return i.reply({ content: `${client.i18n.get(language, "handlers", "danhsachnhactrong")}`, ephemeral: true });
              }
              if (channel.id !== newQueue.voiceChannel.id)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "thamgiakenhvoicuatoi")} <#${channel.id}>**`,
                  ephemeral: true
                });
              if (newQueue.songs.length == 0) {
                  i.reply({
                    embeds: [new EmbedBuilder()
                    .setColor(database.colors.vang)
                    .setTimestamp()
                    .setTitle(`⏹ **${client.i18n.get(language, "handlers", "stop_leave")}**`)
                    .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({dynamic: true})}`})]
                  });
                  clearInterval(songEditInterval);
                  await client.distube.stop(i.guild.id)
                  return
              }             
              await client.distube.skip(i.guild.id) 
              try {
              i.reply({embeds: [new EmbedBuilder()
                  .setColor(database.colors.vang)
                  .setTimestamp()
                  .setTitle(`⏭ **${client.i18n.get(language, "handlers", "skip_2")}!**`)
                  .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({dynamic: true})}`})
              ]});
              } catch (error) {
                console.log(`chưa thêm bài hát nào`)
              }
            };
            if (i.customId == `2`) {
              let { member } = i;
              const { channel } = member.voice
              if (!channel)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}**`,
                  ephemeral: true
                });
              if (channel.id !== newQueue.voiceChannel.id)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "thamgiakenhvoicuatoi")}! <#${channel.id}>**`,
                  ephemeral: true
                });
                i.reply({
                  embeds: [new EmbedBuilder()
                    .setColor(database.colors.vang)
                    .setTimestamp()
                    .setTitle(`⏹ **${client.i18n.get(language, "handlers", "stop_leave")}!**`)
                    .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({dynamic: true})}`})]
                });
                clearInterval(songEditInterval);
                await client.distube.stop(i.guild.id)
            }
            if (i.customId == `3`) {
              let { member } = i;
              const { channel } = member.voice
              if (!channel)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}**`,
                  ephemeral: true
                });
              if (channel.id !== newQueue.voiceChannel.id)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "thamgiakenhvoicuatoi")} <#${channel.id}>**`,
                  ephemeral: true
                });
              if (newQueue.playing) {
                await client.distube.pause(i.guild.id);
                var data = receiveQueueData(client.distube.getQueue(newQueue.id), newQueue.songs[0])
                currentSongPlayMsg.edit(data).catch((e) => {/* */})
                i.reply({
                  embeds: [new EmbedBuilder()
                    .setColor(database.colors.vang)
                    .setTimestamp()
                    .setTitle(`⏸ **${client.i18n.get(language, "handlers", "pause")}**`)
                    .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({dynamic: true})}`})]
                });
              } else {
                await client.distube.resume(i.guild.id);
                var data = receiveQueueData(client.distube.getQueue(newQueue.id), newQueue.songs[0])
                currentSongPlayMsg.edit(data).catch((e) => {/* */})
                i.reply({
                  embeds: [new EmbedBuilder()
                    .setColor(database.colors.vang)
                    .setTimestamp()
                    .setTitle(`▶️ **${client.i18n.get(language, "handlers", "pause2")}**`)
                    .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({dynamic: true})}`})]
                });
              }
            }
            if (i.customId == `4`) {
              let { member } = i;
              const { channel } = member.voice
              if (!channel)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}**`,
                  ephemeral: true
                });
              if (channel.id !== newQueue.voiceChannel.id)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "thamgiakenhvoicuatoi")}  <#${channel.id}>**`,
                  ephemeral: true
                });
              await newQueue.toggleAutoplay()
              if (newQueue.autoplay) {
                var data = receiveQueueData(client.distube.getQueue(newQueue.id), newQueue.songs[0])
                currentSongPlayMsg.edit(data).catch((e) => {/* */})
              } else {
                var data = receiveQueueData(client.distube.getQueue(newQueue.id), newQueue.songs[0])
                currentSongPlayMsg.edit(data).catch((e) => {/* */})
              }
              i.reply({
                embeds: [new EmbedBuilder()
                  .setColor(database.colors.vang)
                  .setTimestamp()
                  .setTitle(`${newQueue.autoplay ? `${emoji.v} **${client.i18n.get(language, "handlers", "autoplay_1")}**`: `${emoji.x} **${client.i18n.get(language, "handlers", "autoplay_2")}**`}`)
                  .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({dynamic: true})}`})]
                });
            }
            if(i.customId == `5`){
              let { member } = i;
              const { channel } = member.voice
              if (!channel)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}**`,
                  ephemeral: true
                });
              if (channel.id !== newQueue.voiceChannel.id)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "thamgiakenhvoicuatoi")} <#${channel.id}>**`,
                  ephemeral: true
                });
              client.maps.set(`beforeshuffle-${newQueue.id}`, newQueue.songs.map(track => track).slice(1));
              await newQueue.shuffle()
              i.reply({
                embeds: [new EmbedBuilder()
                  .setColor(database.colors.vang)
                  .setTimestamp()
                  .setTitle(`🔀 **${client.i18n.get(language, "handlers", "shuffle")} ${newQueue.songs.length} ${client.i18n.get(language, "handlers", "song")}!**`)
                  .setFooter({ text: `YC bởi: ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({dynamic: true})}`})]
              });
            }
            if(i.customId == `6`){
              let { member } = i;
              const { channel } = member.voice
              if (!channel)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}**`,
                  ephemeral: true
                });
              if (channel.id !== newQueue.voiceChannel.id)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "thamgiakenhvoicuatoi")}! <#${channel.id}>**`,
                  ephemeral: true
                });
              if(newQueue.repeatMode == 1){
                await newQueue.setRepeatMode(0)
              } 
              else {
                await newQueue.setRepeatMode(1)
              }
              i.reply({
                embeds: [new EmbedBuilder()
                  .setColor(database.colors.vang)
                  .setTimestamp()
                  .setTitle(`${newQueue.repeatMode == 1 ? `${emoji.v} **${client.i18n.get(language, "handlers", "song_1")}**`: `${emoji.x} **${client.i18n.get(language, "handlers", "song_2")}**`}`)
                  .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({dynamic: true})}`})]
              });
              var data = receiveQueueData(client.distube.getQueue(newQueue.id), newQueue.songs[0])
              currentSongPlayMsg.edit(data).catch((e) => {/* */})
            }
            if(i.customId == `7`){
              let { member } = i;
              const { channel } = member.voice
              if (!channel)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}**`,
                  ephemeral: true
                });
              if (channel.id !== newQueue.voiceChannel.id)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "thamgiakenhvoicuatoi")} <#${channel.id}>**`,
                  ephemeral: true
                });
              if(newQueue.repeatMode == 2){
                await newQueue.setRepeatMode(0)
              } 
              else {
                await newQueue.setRepeatMode(2)
              }
              i.reply({
                embeds: [new EmbedBuilder()
                  .setColor(database.colors.vang)
                  .setTimestamp()
                  .setTitle(`${newQueue.repeatMode == 2 ? `${emoji.v} **${client.i18n.get(language, "handlers", "queue_1")}**`: `${emoji.x} **${client.i18n.get(language, "handlers", "queue_2")}**`}`)
                  .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({dynamic: true})}`})]
                });
              var data = receiveQueueData(client.distube.getQueue(newQueue.id), newQueue.songs[0])
              currentSongPlayMsg.edit(data).catch((e) => {/* */})
            }
            if(i.customId == `8`){
              let { member } = i;
              const { channel } = member.voice
              if (!channel)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}**`,
                  ephemeral: true
                });
              if (channel.id !== newQueue.voiceChannel.id)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "thamgiakenhvoicuatoi")}! <#${channel.id}>**`,
                  ephemeral: true
                });
              let seektime = newQueue.currentTime + 10;
              if (seektime >= newQueue.songs[0].duration) seektime = newQueue.songs[0].duration - 1;
              await newQueue.seek(Number(seektime))
              collector.resetTimer({time: (newQueue.songs[0].duration - newQueue.currentTime) * 1000})
              i.reply({
                embeds: [new EmbedBuilder()
                  .setColor(database.colors.vang)
                  .setTimestamp()
                  .setTitle(`⏩ **${client.i18n.get(language, "handlers", "forward_1")}!**`)
                  .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({dynamic: true})}`})]
              });
              var data = receiveQueueData(client.distube.getQueue(newQueue.id), newQueue.songs[0])
              currentSongPlayMsg.edit(data).catch((e) => {/* */})
            }
            if(i.customId == `9`){
              let { member } = i;
              const { channel } = member.voice
              if (!channel)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}**`,
                  ephemeral: true
                });
              if (channel.id !== newQueue.voiceChannel.id)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "thamgiakenhvoicuatoi")} <#${channel.id}>**`,
                  ephemeral: true
                });
              let seektime = newQueue.currentTime - 10;
              if (seektime < 0) seektime = 0;
              if (seektime >= newQueue.songs[0].duration - newQueue.currentTime) seektime = 0;
              await newQueue.seek(Number(seektime))
              collector.resetTimer({time: (newQueue.songs[0].duration - newQueue.currentTime) * 1000})
              i.reply({
                embeds: [new EmbedBuilder()
                  .setColor(database.colors.vang)
                  .setTimestamp()
                  .setTitle(`⏪ **${client.i18n.get(language, "handlers", "rewind_1")}!**`)
                  .setFooter({ text: `${client.i18n.get(language, "handlers", "yeucauboi")} ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({dynamic: true})}`})]
              });
              var data = receiveQueueData(client.distube.getQueue(newQueue.id), newQueue.songs[0])
              currentSongPlayMsg.edit(data).catch((e) => {/* */})
            }
            if(i.customId == `10`){
              let { member } = i;
              const { channel } = member.voice
              if (!channel) return i.reply({
                content: `${emoji.x} **${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}**`,
                ephemeral: true
              });
              if (channel.id !== newQueue.voiceChannel.id)
                return i.reply({
                  content: `${emoji.x} **${client.i18n.get(language, "handlers", "thamgiakenhvoicuatoi")}! <#${channel.id}>**`, ephemeral: true
                });
                const fetch = require("node-fetch");
                const song = (`${newQueue.songs[0].name}`)
                const json = await fetch(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`).then(r => r.json());
                if (json.error) return i.reply({ content: `${client.i18n.get(language, "handlers", "lyrics0")}` });
                const url = `${song.replace(" ", "+")}`;
                let lyrics = json.lyrics;
                if (lyrics.length > 4096)
                      lyrics = `${client.i18n.get(language, "handlers", "lyrics1")} [https://popcat.xyz/lyrics/${url}](https://popcat.xyz/lyrics/${url}) ${client.i18n.get(language, "handlers", "lyrics2")}`;
                const embed = new EmbedBuilder()
                     .setTitle(json.full_title === `${client.i18n.get(language, "handlers", "khongco")}` ? json.title : json.full_title)
                     .setURL(json.url)
                     .setThumbnail(json.image)
                     .addField(`${client.i18n.get(language, "handlers", "casi")}`, json.artist)
                     .setDescription(`${client.i18n.get(language, "handlers", "text_lyrics")} ${lyrics}`)
                     .setColor(database.colors.vang);
                i.reply({ embeds: [embed] });
            }
          });
        } catch (error) {
          console.error(error)
        }
      }).on(`finishSong`, (queue, song) => {
        var embed = new EmbedBuilder()
        .setColor(database.colors.vang)
        .setAuthor({ name: `${song.name}`, iconURL: `https://cdn.discordapp.com/attachments/883978730261860383/883978741892649000/847032838998196234.png`, url: song.url })
        .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
        .setFooter({ text: `💯 ${song.user.tag}\n${client.i18n.get(language, "handlers", "phathetnhac2")}`, iconURL: `${song.user.displayAvatarURL({ dynamic: true })}`});
          queue.textChannel.messages.fetch(PlayerMap.get(`currentmsg`)).then(currentSongPlayMsg => {
          currentSongPlayMsg.edit({embeds: [embed], components: []}).catch((e) => {/* */})}).catch((e) => {/* */})
      }).on(`initQueue`, queue => {
        try {
          if(PlayerMap.has(`deleted-${queue.id}`)) {
            PlayerMap.delete(`deleted-${queue.id}`)
          }
          let data = client.settings.get(queue.id)
          queue.autoplay = Boolean(data.defaultautoplay);
          queue.volume = Number(50);
          var checkrelevantinterval = setInterval(async () => {
            if (client.settings.get(queue.id, `music.channel`) && client.settings.get(queue.id, `music.channel`).length > 5) {
              let messageId = client.settings.get(queue.id, `music.message`);
              let guild = client.guilds.cache.get(queue.id);
              if (!guild) return
              let channel = guild.channels.cache.get(client.settings.get(queue.id, `music.channel`));
              if (!channel) channel = await guild.channels.fetch(client.settings.get(queue.id, `music.channel`)).catch(() => {}) || false
              if (!channel) return 
              if (!channel.permissionsFor(channel.guild.me).has(Permissions.FLAGS.MANAGE_MESSAGES)) return 
              let messages = await channel.messages.fetch();
              if (messages.filter(m => m.id != messageId).size > 0) {
                channel.bulkDelete(messages.filter(m => m.id != messageId)).catch(() => {})
              } else {/* */}
            }
          }, settings["music-system-relevant-checker-delay"] || 60000);
          playerintervals.set(`checkrelevantinterval-${queue.id}`, checkrelevantinterval);
        
          var autoresumeinterval = setInterval(async () => {
            var newQueue = client.distube.getQueue(queue.textChannel.guildId);
            var andQueue = await client.settings.get(queue.textChannel.guildId, `autoresume`);
            if (newQueue && andQueue) {
              const makeTrackData = track => {
                return {
                  memberId: track.member.id, 
                  source: track.source,
                  duration: track.duration,
                  formattedDuration: track.formattedDuration,
                  id: track.id,
                  isLive: track.isLive,
                  name: track.name,
                  thumbnail: track.thumbnail,
                  type: "video",
                  uploader: track.uploader,
                  url: track.url,
                  views: track.views,
                }
              }
              client.autoresume.ensure(newQueue.id, {
                guild: newQueue.id,
                voiceChannel: newQueue.voiceChannel ? newQueue.voiceChannel.id : null,
                textChannel: newQueue.textChannel ? newQueue.textChannel.id : null,
                songs: newQueue.songs && newQueue.songs.length > 0 ? [...newQueue.songs].map(track => makeTrackData(track)) : null,
                volume: newQueue.volume,
                repeatMode: newQueue.repeatMode,
                playing: newQueue.playing,
                currentTime: newQueue.currentTime,
                autoplay: newQueue.autoplay,
              });
              let data = client.autoresume.get(newQueue.id);
              if (data.guild != newQueue.id) client.autoresume.set(newQueue.id, newQueue.id, `guild`)
              if (data.voiceChannel != newQueue.voiceChannel ? newQueue.voiceChannel.id : null) client.autoresume.set(newQueue.id, newQueue.voiceChannel ? newQueue.voiceChannel.id : null, `voiceChannel`)
              if (data.textChannel != newQueue.textChannel ? newQueue.textChannel.id : null) client.autoresume.set(newQueue.id, newQueue.textChannel ? newQueue.textChannel.id : null, `textChannel`)
              if (data.volume != newQueue.volume) client.autoresume.set(newQueue.id, newQueue.volume, `volume`)
              if (data.repeatMode != newQueue.repeatMode) client.autoresume.set(newQueue.id, newQueue.repeatMode, `repeatMode`)
              if (data.playing != newQueue.playing) client.autoresume.set(newQueue.id, newQueue.playing, `playing`)
              if (data.currentTime != newQueue.currentTime) client.autoresume.set(newQueue.id, newQueue.currentTime, `currentTime`)
              if (data.autoplay != newQueue.autoplay) client.autoresume.set(newQueue.id, newQueue.autoplay, `autoplay`)
              if (newQueue.songs && !arraysEqual(data.songs, [...newQueue.songs])) client.autoresume.set(newQueue.id, [...newQueue.songs].map(track => makeTrackData(track)), `songs`)
              function arraysEqual(a, b) {
                if (a === b) return true;
                if (a == null || b == null) return false;
                if (a.length !== b.length) return false;

                for (var i = 0; i < a.length; ++i) {
                  if (a[i] !== b[i]) return false;
                }
                return true;
              }
            }
          }, settings["auto-resume-save-cooldown"] || 5000);
          playerintervals.set(`autoresumeinterval-${queue.id}`, autoresumeinterval);

          var musicsystemeditinterval = setInterval(async () => {
            if (client.settings.get(queue.id, `music.channel`) && client.settings.get(queue.id, `music.channel`).length > 5) {
              let messageId = client.settings.get(queue.id, `music.message`);
              let guild = client.guilds.cache.get(queue.id);
              if (!guild) return 
              let channel = guild.channels.cache.get(client.settings.get(queue.id, `music.channel`));
              if (!channel) channel = await guild.channels.fetch(client.settings.get(queue.id, `music.channel`)).catch(() => {}) || false
              if (!channel) return 
              if (!channel.permissionsFor(channel.guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) return 
              let message = channel.messages.cache.get(messageId);
              if (!message) message = await channel.messages.fetch(messageId).catch(() => {}) || false;
              if (!message) return 
              if(!message.editedTimestamp) return
              if(Date.now() - message.editedTimestamp > (settings["music-request-edit-delay"] || 7000) - 100)
              {
                var data = generateQueueEmbed(client, queue.id)
                message.edit(data).catch((e) => {
                  console.log(e)
                }).then(m => { /* */ })
              }
            }
          }, settings["music-request-edit-delay"] || 7000);
          playerintervals.set(`musicsystemeditinterval-${queue.id}`, musicsystemeditinterval);
        } catch (error) {
          console.error(error)
        }
    });
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }; 
  function receiveQueueData(newQueue, newTrack) {
    if(!newQueue) return new EmbedBuilder()
    .setColor(database.colors.vang)
    .setTitle(`${client.i18n.get(language, "handlers", "khongthetimkiembaihat")}`)
    var djs = client.settings.get(newQueue.id, `djroles`);
    if(!djs || !Array.isArray(djs)) djs = [];
    else djs = djs.map(r => `<@&${r}>`);
    if(djs.length == 0 ) djs = `${client.i18n.get(language, "handlers", "khongthietlap")}`;
    else djs.slice(0, 15).join(`, `);
    if(!newTrack) return new EmbedBuilder()
    .setColor(database.colors.vang)
    .setTitle(`${client.i18n.get(language, "handlers", "khongthetimkiembaihat")}`) 
    var embed = new EmbedBuilder()
      .setAuthor({ name: `${newTrack.name}`,  iconURL: `https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`, url: newTrack.url })
      .setImage(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
      .setColor(database.colors.vang)
      .addFields(
        { name: `${emoji.Muiten} ${client.i18n.get(language, "handlers", "thoi_luong")}`, value: `>>> \`${newQueue.formattedCurrentTime} / ${newTrack.formattedDuration}\``, inline: true },
        { name: `${emoji.Muiten} ${client.i18n.get(language, "handlers", "hang_cho")}`, value: `>>> \`${newQueue.songs.length} ${client.i18n.get(language, "handlers", "song")}\`\n\`${newQueue.formattedDuration}\``, inline: true },
        { name: `${emoji.Muiten} ${client.i18n.get(language, "handlers", "am_luong")}`, value: `>>> \`${newQueue.volume} %\``, inline: true },
        { name: `${emoji.Muiten} ${client.i18n.get(language, "handlers", "vong_lap")}`, value: `>>> ${newQueue.repeatMode ? newQueue.repeatMode === 2 ? `${emoji.v} ${client.i18n.get(language, "handlers", "hang_cho")}` : `${emoji.v} ${client.i18n.get(language, "handlers", "song")}` : `${emoji.x}`}`, inline: true },
        { name: `${emoji.Muiten} ${client.i18n.get(language, "handlers", "autoplay")}`, value: `>>> ${newQueue.autoplay ? `${emoji.v}` : `${emoji.x}`}`, inline: true },
        { name: `${emoji.Muiten} ${client.i18n.get(language, "handlers", "tai_nhac")}`, value: `>>> [${client.i18n.get(language, "handlers", "click_vaoday")}](${newTrack.streamURL})`, inline: true },
        { name: `${emoji.Muiten} ${client.i18n.get(language, "distube", "distube_0")}`, value: `${(newQueue.songs[0].views).toLocaleString()}`, inline: true },
        { name: `${emoji.Muiten} Likes`, value: `>>>👍 ${(newQueue.songs[0].likes).toLocaleString()}`, inline: true },
        { name: `${emoji.Muiten} Dislikes`, value: `>>>👎 ${(newQueue.songs[0].dislikes).toLocaleString()}`, inline: true},
        { name: `${emoji.Muiten} DJ-Role${client.settings.get(newQueue.id, `djroles`).length > 1 ? ``: ``}:`, value: `>>> ${djs}`, inline: client.settings.get(newQueue.id, `djroles`).length > 1 ? false :true },
      )
    let skip = new ButtonBuilder()
    .setStyle('Primary')
    .setCustomId('1')
    .setEmoji(`⏭`)
    .setLabel(`${client.i18n.get(language, "handlers", "skip")}`)
    let stop = new ButtonBuilder()
    .setStyle('Danger')
    .setCustomId('2')
    .setEmoji(`😢`)
    .setLabel(`${client.i18n.get(language, "handlers", "stop")}`)
    let pause = new ButtonBuilder()
    .setStyle('Secondary')
    .setCustomId('3')
    .setEmoji('⏸')
    .setLabel(`${client.i18n.get(language, "handlers", "pause")}`)
    let autoplay = new ButtonBuilder()
    .setStyle('Success')
    .setCustomId('4')
    .setEmoji('🧭')
    .setLabel(`${client.i18n.get(language, "handlers", "autoplay")}`)
    let shuffle = new ButtonBuilder()
    .setStyle('Primary')
    .setCustomId('5')
    .setEmoji('🔀')
    .setLabel(`${client.i18n.get(language, "handlers", "shuffle")}`)
    if (!newQueue.playing) {
      pause = pause
      .setStyle('Success')
      .setEmoji('▶️')
      .setLabel(`${client.i18n.get(language, "handlers", "pause2")}`)
    }
    if (newQueue.autoplay) {
      autoplay = autoplay.setStyle('Secondary')
    }
    let songloop = new ButtonBuilder()
    .setStyle('Success')
    .setCustomId('6')
    .setEmoji(`🔁`)
    .setLabel(`${client.i18n.get(language, "handlers", "song")}`)
    let queueloop = new ButtonBuilder()
    .setStyle('Success')
    .setCustomId('7')
    .setEmoji(`🔂`)
    .setLabel(`${client.i18n.get(language, "handlers", "queue")}`)
    let forward = new ButtonBuilder()
    .setStyle('Primary')
    .setCustomId('8')
    .setEmoji('⏩')
    .setLabel(`${client.i18n.get(language, "handlers", "forward")}`)
    let rewind = new ButtonBuilder()
    .setStyle('Primary')
    .setCustomId('9')
    .setEmoji('⏪')
    .setLabel(`${client.i18n.get(language, "handlers", "rewind")}`)
    let lyrics = new ButtonBuilder()
    .setStyle('Primary')
    .setCustomId('10')
    .setEmoji('📝')
    .setLabel(`${client.i18n.get(language, "handlers", "lyrics")}`)
    let discord = new ButtonBuilder()
    .setLabel(`${client.i18n.get(language, "handlers", "vao_discord")}`)
    .setEmoji('880842478855536681')
    .setStyle("Link")
    .setURL(`${moibot.discord}`)
    let invitebot = new ButtonBuilder()
    .setLabel(`${client.i18n.get(language, "handlers", "moi_bot")}`)
    .setEmoji('854047747547988080') 
    .setStyle("Link")
    .setURL(`${moibot.musicbot}`)
    let facebook = new ButtonBuilder()
    .setLabel("Facebook")
    .setEmoji('880834017593790474') 
    .setStyle("Link")
    .setURL(`${moibot.facebook}`)
    if (newQueue.repeatMode === 0) {
      songloop = songloop.setStyle('Success')
      queueloop = queueloop.setStyle('Success')
    };
    if (newQueue.repeatMode === 1) {
      songloop = songloop.setStyle('Secondary')
      queueloop = queueloop.setStyle('Success')
    };
    if (newQueue.repeatMode === 2) {
      songloop = songloop.setStyle('Success')
      queueloop = queueloop.setStyle('Secondary')
    };
    if (Math.floor(newQueue.currentTime) < 10) {
      rewind = rewind.setDisabled()
    } else {
      rewind = rewind.setDisabled(false)
    };
    if (Math.floor((newTrack.duration - newQueue.currentTime)) <= 10) {
      forward = forward.setDisabled()
    } else {
      forward = forward.setDisabled(false)
    };
    const row = new ActionRowBuilder()
    .addComponents([ skip, stop, pause, autoplay, shuffle ]);
    const row2 = new ActionRowBuilder()
    .addComponents([ songloop, queueloop, rewind, forward, lyrics ]);
    const row3 = new ActionRowBuilder()
    .addComponents([ discord, invitebot,  facebook ]);
    return { embeds: [embed], components: [row, row2, row3] };
  };
};