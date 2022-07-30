const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const { GetUser, GetGlobalUser, trimArray } = require("../../Modules/functions")
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        const statuses = {
          "online" : "♥️",
          "idle" : "😐",
          "dnd" : "👑",
          "offline" : "👻",
        };
        const flags = {
        	DISCORD_EMPLOYEE: 'Discord staff',
	        DISCORD_PARTNER: 'Discord Partner',
	        BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	        BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	        HYPESQUAD_EVENTS: 'HypeSquad . Events',
	        HOUSE_BRAVERY: 'The House of Courage',
	        HOUSE_BRILLIANCE: 'Brilliant house',
	        HOUSE_BALANCE: 'House of balance',
        	EARLY_SUPPORTER: 'Early supporter',
	        TEAM_USER: 'Team member',
	        SYSTEM: 'System',
	        VERIFIED_BOT: 'Verified bot',
	        VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };
        try {   
      var user;
      if(args[0]){
        try{
          if(args[1] && args[1].toLowerCase() == "global"){
            args.pop()
            user = await GetGlobalUser(message, args)
          }else {
            user = await GetUser(message, args)
          }
        } catch (e){
          if(!e) return message.reply(`${client.i18n.get(language, "includes", "khongthaythongtin")}`)
          return message.reply(e)
        }
      } else {
        user = message.author;
      }
      if(!user || user == null || user.id == null || !user.id) return message.reply(`${client.i18n.get(language, "includes", "khongthaythongtin2")}`)
      try{
        const member = message.guild.members.cache.get(user.id);
        const roles = member.roles;
        const userFlags = member.user.flags.toArray();
        const msg = await message.channel.send(`${client.i18n.get(language, "includes", "doixiunhe")}`); 
        let ttnguoidung = new EmbedBuilder()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setAuthor({ name: `${client.i18n.get(language, "includes", "thongtinve")} ${member.user.username + "#" + member.user.discriminator}`,  iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
        .setColor(database.colors.vang)
        .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`}) 
        .addFields([
          { name: `**=> ${client.i18n.get(language, "includes", "tentk")}**`, value: `<@${member.user.id}>\n\`${member.user.tag}\`` },
          { name: `**=> ID:**`, value: `\`${member.id}\`` },
          { name: `**=> ${client.i18n.get(language, "includes", "avatar")}**`, value: `[${client.i18n.get(language, "handlers", "click_vaoday")}](${member.user.displayAvatarURL({ format: "png" })})` },
          { name: `**=> ${client.i18n.get(language, "includes", "ngaythamgiadis")}**`, value: `<t:${~~(member.user.createdTimestamp / 1000)}:f>`},
          { name: `**=> ${client.i18n.get(language, "includes", "ngaythamgiasv")}**`, value: `<t:${~~(member.joinedTimestamp / 1000)}:f>` },
          { name: `**=> ${client.i18n.get(language, "includes", "huyhieu2")}**`, value: `\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : `${client.i18n.get(language, "includes", "khongcoemoji")}`}\`` },
          { name: `**=> ${client.i18n.get(language, "includes", "rolecaonhat")}**`, value: `${member.roles.highest.id === message.guild.id ? `${client.i18n.get(language, "includes", "khongcoemoji")}` : member.roles.highest}` },
          { name: `**=> Bot:**`, value: `\`${member.user.bot ? "✔️" : "❌"}\`` },
          { name: `**=> ${client.i18n.get(language, "includes", "quyenhan")}**`, value: `${member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}` },
          { name: `=> [${roles.cache.size}] Roles: `, value: `${roles.cache.size < 25 ? Array.from(roles.cache.values()).sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : `${client.i18n.get(language, "includes", "khongcoemoji")}`}`},
        ]);
      await message.reply({ embeds: [ttnguoidung]})
      msg.delete();
      }catch (e){
        console.log(e)
        const userFlags = user.flags.toArray();
        const msg = await message.channel.send(`${client.i18n.get(language, "includes", "doixiunhe")}`);
        let ttnguoidung = new superbot.MessageEmbed()
        .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setAuthor({ name: `${client.i18n.get(language, "includes", "thongtinve")} ${member.user.username + "#" + member.user.discriminator}`,  iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
        .setColor(database.colors.vang)
        .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
        .addFields([
          { name: `**=> ${client.i18n.get(language, "includes", "tentk")}**`, name: `<@${user.id}>\n\`${user.tag}\`` },
          { name: `**=> ID:**`, name: `\`${user.id}\`` },
          { name: `**=> ${client.i18n.get(language, "includes", "avatar")}**`, name: `[${client.i18n.get(language, "includes", "click_vaoday")}](${user.displayAvatarURL({ format: "png" })})` },
          { name: `**=> ${client.i18n.get(language, "includes", "huyhieu2")}**`, name: `\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : `${client.i18n.get(language, "includes", "khongcoemoji")}`}\`` },
          { name: `**=> Bot:**`, name: `\`${user.bot ? "👌" : "❌"}\`` },
          { name: `**=> ${client.i18n.get(language, "includes", "quyenhan")}**`, name: `${member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}` },
        ])
       await message.reply({ embeds: [ttnguoidung] })
       msg.delete();
      }
    } catch (e) {
      console.log(String(e.stack));
      return;
    };
    },
};