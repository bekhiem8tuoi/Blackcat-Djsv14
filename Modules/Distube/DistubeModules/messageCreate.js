module.exports = (client) => {
 try {
const { dj_role2, createBar, delay, escapeRegex } = require("../music");
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
   client.on(`messageCreate`, async (message) => {
    if(!message.guild) return;
    client.settings.ensure(message.guild.id, {
      prefix: config.prefix,
      music: {
        channel: "",
        message: "",
      }
    });
    let data = client.settings.get(message.guild.id, `music`);
    if(!data.channel || data.channel.length < 5) return;
    let textChannel = message.guild.channels.cache.get(data.channel) || await message.guild.channels.fetch(data.channel).catch(() => {}) || false;
    if(!textChannel) {
      client.settings.set(message.guild.id, "", "music.channel");
      client.settings.set(message.guild.id, "", "music.message");
      return;
    }
    if(message.channel.id != textChannel.id) return;
    if (message.author.id === client.user.id) {
      setTimeout(()=>{
        if (!message.ChannelDelete) {
          message.delete().catch((e) => {
            console.log(e)
          })
        }
      }, 3000)
    } else {
      if (!message.ChannelDelete) {
        message.delete().catch((e) => {
          console.log(e)
        })
      }
    }
    if(message.author.bot) return;
    var prefix = client.settings.get(message.guild.id, `prefix`);
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`); 
    var args, cmd;
    if(prefixRegex.test(message.content)) {
       const [, matchedPrefix] = message.content.match(prefixRegex); 
       args = message.content.slice(matchedPrefix.length).trim().split(/ +/); 
       cmd = args.shift().toLowerCase(); 
       if (cmd || cmd.length === 0) return 
 
       var command = client.commands.get(cmd); 
       if (!command) command = client.commands.get(client.aliases.get(cmd)); 
       if (command);
       {
         return;
       };
    };
    args = message.content.split(` `);
    const { channel } = message.member.voice;
    if (!channel) return message.reply({ embeds: [new EmbedBuilder()
      .setColor(database.colors.vang)
      .setTitle(`${emoji.x} **${client.i18n.get(language, "handlers", "banphaithamgiakenhvoice")}!**`)
      ],
    })
    if (channel.userLimit != 0 && channel.full)
      return message.reply({ embeds: [new EmbedBuilder()
          .setColor(database.colors.vang)
          .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
          .setTitle(`${emoji.x} ${client.i18n.get(language, "handlers", "kenhvoiceday")}`)
        ],
      });
    const Text = args.join(` `);
    try {
      let queue = client.distube.getQueue(message.guild.id)
      let options = {
        member: message.member,
      };
      if (!queue) options.textChannel = message.guild.channels.cache.get(message.channel.id)
      await client.distube.play(channel, Text, options)
    } catch (e) {
      console.log(e.stack ? e.stack : e)
      message.reply({
        content: `${emoji.x} error: `,
        embeds: [new EmbedBuilder()
          .setColor(database.colors.vang)
          .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
        ]});
       };
    });
  } catch (error) {
    console.log("MessageCreate Distube" + error);
  };
};