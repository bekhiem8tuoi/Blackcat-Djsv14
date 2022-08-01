const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const ms  = require("ms");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["gv", ""], // lệnh phụ
    description: "Giveaway start", // mô tả lệnh
    userPerms: ["Administrator", "ManageMessages"], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Moderation", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    if(!args[0]) return message.reply({ embeds: [new EmbedBuilder()
        .setDescription(`${client.i18n.get(client.language, "moderation", "give_0")}`)
    ]});
    if(args[0].toLowerCase() === "start"){
        let time = "";
        let winnersCount;
        let prize = "";
        let channel = "";
        const msg = await message.reply(`${client.i18n.get(client.language, "moderation", "give_1")}`);
        let xembed = new EmbedBuilder()
          .setTitle(`${client.i18n.get(client.language, "moderation", "give_2")}`)
          .setColor(database.colors.vang)
          .setDescription(`${client.i18n.get(client.language, "moderation", "give_3")}`)
          .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`})
          .setTimestamp()
        const filter = m => m.author.id === message.author.id && !m.author.bot
        const collector = await message.channel.createMessageCollector(filter, { max: 3, time: 30000 });
        collector.on("collect", async collect => {
          const response = collect.content
          if(response == "hủy") {
            return collector.stop(msg.reply(`${client.i18n.get(client.language, "moderation", "give_4")}`));
          } else if (response == "cancel") {
            return collector.stop(msg.reply(`${client.i18n.get(client.language, "moderation", "give_4")}`));
          };
          let chn = collect.mentions.channels.first() || message.guild.channels.cache.get(response)
          if (!chn) {
            return msg.edit(`${client.i18n.get(client.language, "moderation", "give_5")}`)
          } else {
            channel = chn
            collector.stop(msg.edit(`${client.i18n.get(client.language, "moderation", "give_6", {
              gvchannel: channel
            })}`));
          };
          const collector2 = await message.channel.createMessageCollector(filter, { max: 3, time: 30000 });
          collector2.on("collect", async collect2 => {
            if(collect2.content == "hủy"){
                return collector2.stop(msg.reply(`${client.i18n.get(client.language, "moderation", "give_4")}`));
            } else if(collector2.content == "cancel") {
                return collector2.stop(msg.reply(`${client.i18n.get(client.language, "moderation", "give_4")}`));
            };
            let mss = ms(collect2.content);
            if (!mss) {
              return msg.edit(`${client.i18n.get(client.language, "moderation", "give_7")}`);
            } else {
              time = mss;
              collector2.stop(msg.edit(`${client.i18n.get(client.language, "moderation", "give_8")}`));
            };
            const collector3 = await message.channel.createMessageCollector(filter, { max: 3, time: 30000, errors: ['time'] });
            collector3.on("collect", async collect3 => {
              const response3 = collect3.content.toLowerCase()
              if(response3 == "hủy"){
                return collector3.stop(msg.reply(`${client.i18n.get(client.language, "moderation", "give_4")}`));
              } else if(response3 == "cancel"){
                return collector3.stop(msg.reply(`${client.i18n.get(client.language, "moderation", "give_4")}`));
              };
              if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
                return msg.edit(`${client.i18n.get(client.language, "moderation", "give_9")}`);
              } else {
                winnersCount = parseInt(response3);
                collector3.stop(msg.edit(`${client.i18n.get(client.language, "moderation", "give_10")}`));
              };
              const collector4 = await message.channel.createMessageCollector(filter, { max: 3, time: 30000 });
              collector4.on("collect", async collect4 => {
                const response4 = collect4.content.toLowerCase();
                if(response4 == "hủy"){
                    return collector4.stop(msg.reply(`${client.i18n.get(client.language, "moderation", "give_4")}`));
                } else if(response4 == "cancel"){
                  return response4.stop(msg.reply(`${client.i18n.get(client.language, "moderation", "give_4")}`));
                };
                prize = response4;
                collector4.stop(msg.edit((`${client.i18n.get(client.language, "moderation", "give_11", {
                  gv_prize: prize,
                  gv_channel: channel,
                  gv_time: ms(time, {
                  long: true
                  }),
                  gv_winnersCount: winnersCount
                })}`)));
                      await collect.delete();
                      await collect2.delete();
                      await collect3.delete();
                      await collect4.delete();
                      const giveawayss = {
                         "everyoneMention": false,
                         "hostedBy": true
                      };
                      client.giveawaysManager.start(channel, {
                        duration: parseInt(time),
                        prize: `Giải thưởng: ${prize}`,
                        hostedBy: message.author,
                        winnerCount: parseInt(winnersCount),
                        thumbnail: `${database.avatar}`,
                        lastChance: {
                          enabled: true,
                          content: `🛑 **Cơ hội cuối cùng để vào** 🛑`,
                          threshold: 50000,
                          embedColor: '#FF0000'
                        },
                        pauseOptions: {
                          isPaused: false,
                          content: '⏸️ **GIVEAWAY NÀY ĐÃ TẠM DỪNG!** ⏸️',
                          unPauseAfter: null,
                          embedColor: '#FFFF00'
                        },
                        messages: {
                          giveaway: (giveawayss.everyoneMention ? "@everyone\n\n" : "") + "🎉 **GIVEAWAY** 🎉",
                          giveawayEnded: (giveawayss.everyoneMention ? "@everyone\n\n" : "") + "🎉 **GIVEAWAY ENDED** 🎉",
                          drawing: `Kết thúc sau: **{timestamp}**`,
                          inviteToParticipate: `Phản ứng với 🎉 để tham gia!`,
                          winMessage: "\`Xin chúc mừng bạn:\` {winners}!\n\`Bạn đã thắng:\` **{this.prize}**!",
                          embedFooter: "Giveaways",
                          noWinner: "\`\`\`\nGiveaway bị hủy, không có người tham gia hợp lệ\n\`\`\`",
                          hostedBy: "Tổ chức bởi: {this.hostedBy}",
                          winners: "người chiến thắng",
                          endedAt: "Đã kết thúc lúc"
                        },
                      });
                    });
                });
              });
            });
        collector.on('end', (collected, reason) => {
          if (reason == 'time') {
             message.reply({ embeds: [xembed]});
          };
        });
        try {
          collector.on('end', (collected, reason) => {
            if (reason == 'time') {
              message.reply({ embeds: [xembed]});
            };
          });
          collector.on('end', (collected, reason) => {
            if (reason == 'time') {
               message.reply({ embeds: [xembed]});
            };
          });
          collector.on('end', (collected, reason) => {
            if (reason == 'time') {
               message.reply({ embeds: [xembed]})
            };
          });
          collector.on('end', (collected, reason) => {
            if (reason == 'time') {
              message.reply({ embeds: [xembed]});
            };
          });
        } catch (e) {
          message.reply({ content: "Error: " + e });
        };
    } else if (args[0].toLowerCase() === "end") {
        args.shift();
        if(!args[0]){
            return message.reply(`${client.i18n.get(client.language, "moderation", "give_12")}`);
        };
        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageId == args[0]);
        if(!giveaway){
            return message.reply(`${client.i18n.get(client.language, "moderation", "give_13", {
              gv_end: args.join(' ')
            })}`);
        };
        client.giveawaysManager.end(giveaway.messageId).then(() => {
            message.reply(`${client.i18n.get(client.language, "moderation", "give_14")}`);
        }).catch((e) => {
                message.reply({ content: e });
        });
    } else if (args[0].toLowerCase() === "list") {
        const select = new SelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder(`${client.i18n.get(client.language, "moderation", "give_15")}`)
        .addOptions([{
              label: `${client.i18n.get(client.language, "moderation", "give_16")}`,
              description: `${client.i18n.get(client.language, "moderation", "give_17")}`,
              value: 'normal',
            },{
              label: `${client.i18n.get(client.language, "moderation", "give_18")}`,
              description: `${client.i18n.get(client.language, "moderation", "give_19")}`,
              value: "guildReq"
            }])
          const row = new ActionRowBuilder().addComponents([select])
          let giveaways = client.giveawaysManager.giveaways.filter(g => g.guildId === `${message.guild.id}` && !g.ended);
          if (!giveaways.some(e => e.messageId)) {
            return message.reply(`${client.i18n.get(client.language, "moderation", "give_20")}`)
          }
          const msg = await message.reply({ embeds: [new EmbedBuilder().setDescription(`${client.i18n.get(client.language, "moderation", "give_21")}`).setColor("#2F3136").setTimestamp()], components: [row] })
          let embed = new EmbedBuilder()
            .setTitle(`${client.i18n.get(client.language, "moderation", "give_22")}`)
            .setColor("#2F3136")
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp()
          let embedGuild = new EmbedBuilder()
            .setTitle(`${client.i18n.get(client.language, "moderation", "give_23")}`)
            .setColor("#2F3136")
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp()
          const filter = x => x.customId == "select" && x.user.id == message.author.id
          const collector = await message.channel.createMessageComponentCollector({ filter, time: 60000, max: 1 })
          collector.on("collect", async (i) => {
            i.update({ components: [] });
            const val = i.values[0]
            if (val == "normal") {
              await Promise.all(giveaways.map(async (x) => {
                embed.addFields({ name: `${client.i18n.get(client.language, "moderation", "give_24")}`, value: `**${client.i18n.get(client.language, "moderation", "give_27")}** **[${x.prize}](https://discord.com/channels/${x.guildID}/${x.channelID}/${x.messageID})\n${client.i18n.get(client.language, "moderation", "give_29")}** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**${client.i18n.get(client.language, "moderation", "give_30")}** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)` })
              }));
             msg.edit({ embeds: [embed] });
            };
            if (val == "guildReq") {
              if (!giveaways.some(e => e.extraData)) return msg.edit({ content: `${client.i18n.get(client.language, "moderation", "give_20")}`, embeds: [] }).catch(e => console.error(e))
              await Promise.all(giveaways.map(async (x) => {
                if (x.extraData) {
                  const guild = client.guilds.cache.get(x.extraData.server)
                  const channel = guild.channels.cache
                    .filter((channel) => channel.type === 'text')
                    .first()
                  const inv = await channel.createInvite()
                  embedGuild.addField({ name: `${client.i18n.get(client.language, "moderation", "give_25")}`, value: `**${client.i18n.get(client.language, "moderation", "give_27")}** **[${x.prize}](https://discord.com/channels/${x.guildID}/${x.channelID}/${x.messageID})**\n**${client.i18n.get(client.language, "moderation", "give_28")}(${inv})**\n**${client.i18n.get(client.language, "moderation", "give_29")}** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**${client.i18n.get(client.language, "moderation", "give_30")}** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)` })
                }
              }));
              msg.edit({ embeds: [embedGuild] })
            }
          })
          collector.on("end",(collected, reason) => {
           if(reason == "time")
           msg.edit({ content: `${client.i18n.get(client.language, "moderation", "give_26")}`, components: [] })
          });
       } else if (args[0].toLowerCase() === "pause") {
           args.shift();
            if (!args[0]) {
                return message.reply({ content: `${client.i18n.get(client.language, "moderation", "give_12")}`});
            }
            let giveaway = client.giveawaysManager.giveaways.find((g) => g.messageId === args[0]);
            if (!giveaway) {
                return message.reply({ content: `${client.i18n.get(client.language, "moderation", "give_13", {
                  gv_end: args.join(' ')
                })}`});
            }
            client.giveawaysManager.pause(giveaway.messageId).then(() => {
                    message.reply( { content: `${client.i18n.get(client.language, "moderation", "give_31")}` } );
            }).catch((e) => {
                console.log(e)
            });
       } else if (args[0].toLowerCase() === "unpause") {
            args.shift();
            if (!args[0]) {
                return message.reply({content: `${client.i18n.get(client.language, "moderation", "give_12")}`});
            };
            let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageId === args[0]);
            if (!giveaway) {
                return message.reply({ content: `${client.i18n.get(client.language, "moderation", "give_13", {
                  gv_end: args.join(' ')
                })}`});
            };
            client.giveawaysManager.unpause(giveaway.messageId).then(() => {
                    message.reply( { content: `${client.i18n.get(client.language, "moderation", "give_32")}`});
            }).catch((e) => {
              console.log(e);
            });
       };
    },
};
