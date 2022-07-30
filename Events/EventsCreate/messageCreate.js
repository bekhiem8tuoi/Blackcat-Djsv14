module.exports = async (client, message) => {
  const { EmbedBuilder, PermissionsBitField } = require("discord.js");
  const GPrefix = require("../../Modules/Databases/Schema/Prefix.js");
  const GLang = require('../../Modules/Databases/Schema/Language.js');
  const channells = require("../../Modules/Json/channell.json");
  const database = require("../../Modules/Json/database.json");
  const { onCoolDown } = require("../../Modules/functions");
  const emoji = require("../../Modules/Json/emoji.json");
  const config = require("../../config.json");     
  if(message.author.bot || !message.guild) return;
  client.settings.ensure(message.guild.id, {
    defaultvolume: 50,
    defaultautoplay: false
  });
  var start = new Date();
  let PREFIX = config.prefix;
  let LANGUAGE = client.i18n; 
  let guildModel = await GLang.findOne({ guild: message.guild.id });
  if(guildModel && guildModel.language) LANGUAGE = guildModel.language;
  const GuildPrefix = await GPrefix.findOne({ guild: message.guild.id });
  if(GuildPrefix && GuildPrefix.prefix) PREFIX = GuildPrefix.prefix;
  const prefix = PREFIX;
  client.language = LANGUAGE;
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [ matchedPrefix ] = message.content.match(prefixRegex);
  if(!message.content.startsWith(matchedPrefix)) return;       
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if(message.content.match(mention)) {
      const embed = new EmbedBuilder()
        .setDescription(client.i18n.get(client.language, "events", "my_prefix", {
            prefix: prefix,
      }));
      message.reply({ embeds: [embed] })
  };
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) {
        try {   
             const embed = new EmbedBuilder()
               .setTitle(`${client.i18n.get(client.language, "events", "no_premission")}`)
               .setColor(database.colors.vang)
             if (onCoolDown(message, command)) {
                 return message.channel.send({ content: `❌ ${client.i18n.get(client.language, "events", "thoigianhoilenh", {
                     thoigian: onCoolDown(message, command),
                     tenlenh: command.name
                 })}`});
              };
             if (command.userPerms) {
                if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                   embed.setDescription(`${client.i18n.get(client.language, "events", "premission_user", {
                     premission_01: command.userPerms,
                     permission_02: message.channelId,
                     premission_03: command.name
                   })}`);
                return message.reply({ embeds: [embed] });
                };
              }; 
              if (command.owner && message.author.id !== database.developer) {
                 embed.setDescription(`${client.i18n.get(client.language, "events", "premission_owner", {
                    premission_001: database.developer 
                 })}`);
               return message.reply({ embeds: [embed] });
              };
              command.run(client, message, args, prefix, database, emoji, language = client.language);
              var end = new Date() - start;
              let channel = client.channels.cache.get(channells.CHANNEL_LOGCMDS);
              if (channel) {
                   channel.send({ embeds: [new EmbedBuilder()
                      .setColor(database.colors.vang)
                      .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
                      .setTimestamp(Date.now())
                      .setDescription(`${emoji.Hihi} - ${emoji.Hihi}\n${emoji.Muiten} \`Tên Discord : ${message.guild.name}\`\n${emoji.Muiten} \`Tên Kênh  SD: ${message.channel.name}\`\n${emoji.Muiten} \`Tên Người SD: ${message.author.tag}\`\n${emoji.Muiten} \`Lệnh được SD: ${message.content}\``)
                  ]});
              };
          } catch (error){
              console.log(error.toString())
              message.reply({ content: `${client.i18n.get(client.language, "events", "loigoidi")}` })
          };
  } else {
    return message.reply({ embeds: [new EmbedBuilder()
        .setTitle(`${client.i18n.get(client.language, "events", "sailenhroinhe")}`)
        .setDescription(`${emoji.Muiten} ${client.i18n.get(client.language, "events", "sailenhroinhe2", {
          emoji: emoji.Muiten,
          help: prefix
        })}`)
        .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
        .setColor(database.colors.vang)
        .setTimestamp(Date.now())],
    }).then(msg => {
        setTimeout(() => { 
          msg.delete() 
        }, 5000);
    });
  }; 
};