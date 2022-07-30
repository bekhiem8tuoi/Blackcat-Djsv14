const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["sinfo", "svinfo"], // lệnh phụ
    description: "thông tin server", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Information", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    try {
      const guild = message.guild;
      function trimArray(arr, maxLen = 25) {
        if ([...arr.values()].length > maxLen) {
          const len = [...arr.values()].length - maxLen;
          arr = [...arr.values()].sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
          arr.map(role => `<@&${role.id}>`)
          arr.push(`${len} ...`);
        }
        return arr.join(", ");
      }
      await message.guild.members.fetch();
      function emojitrimarray(arr, maxLen = 30) {
        if (arr.length > maxLen) {
          const len = arr.length - maxLen;
          arr = arr.slice(0, maxLen);
          arr.push(`${len} ...`);
        }
        return arr.join(", ");
      }
      let boosts = message.guild.premiumSubscriptionCount;
      var boostlevel = 0;
      if (boosts >= 2) boostlevel = "1";
      if (boosts >= 15) boostlevel = "2";
      if (boosts >= 30) boostlevel = "3 / ∞";
      let maxbitrate = 96000;
      if (boosts >= 2) maxbitrate = 128000;
      if (boosts >= 15) maxbitrate = 256000;
      if (boosts >= 30) maxbitrate = 384000; 
       const all1 = new EmbedBuilder()
        .setAuthor({ name: `${guild.name} (${guild.id})`, iconURL: `${guild.iconURL({dynamic: true})}`})
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor(database.colors.vang)
        .addFields([
                  { name: `${client.i18n.get(language, "includes", "chusever")}` , value: `<@${message.guild.ownerId}>\n(ID:${message.guild.ownerId})`, inline: true },
                  { name: `${client.i18n.get(language, "includes", "ngaytaosv")}` , value: `<t:${~~(guild.createdTimestamp / 1000)}:f>`, inline: true },
                  { name: `${client.i18n.get(language, "includes", "ngaybantg")}` , value: `<t:${~~(message.member.joinedTimestamp / 1000)}:f>`, inline: true },
                  { name: `${client.i18n.get(language, "includes", "danhmuc")}` , value: `\`${guild.channels.cache.filter((ch) => ch.type === "Guild_Category").size}\``, inline: true },
                  { name: `${client.i18n.get(language, "includes", "tatcakemh")}` , value: `\`${guild.channels.cache.size} Channels\ntext: ${guild.channels.cache.filter((ch) => ch.type === "Guildtext").size}\nvoice: ${guild.channels.cache.filter((ch) => ch.type === "Guildvoice").size}\``, inline: true },
                  { name: `${client.i18n.get(language, "includes", "kenhwel")}` , value: `${guild.systemChannel}`, inline: true },
                  { name: `${client.i18n.get(language, "includes", "kenhquytac")}` , value: `${guild.rulesChannel}`, inline: true },
                  { name: `${client.i18n.get(language, "includes", "kenhafk")}` , value: `${guild.afkChannel}`, inline: true }, 
                  { name: `${client.i18n.get(language, "includes", "tatcatv")}` , value: `\`${message.guild.memberCount}\``, inline: true },
                  { name: `${client.i18n.get(language, "includes", "maxtv")}` , value: `\`${guild.maximumMembers}\``, inline: true },
                  { name: `${client.i18n.get(language, "includes", "nguoidung")}` , value: `\`${message.guild.members.cache.filter(member => !member.user.bot).size}\``, inline: true },
                  { name: "Bots:" , value: `\`${message.guild.members.cache.filter(member => member.user.bot).size}\``, inline: true },
                  { name: `${client.i18n.get(language, "includes", "tvbiband")}` , value: `\`${guild.bans.cache.size}\``, inline: true },
                  { name: `${client.i18n.get(language, "includes", "tatcabot")}` , value: `\`${message.guild.premiumSubscriptionCount}\``, inline: true },
                  { name: "Boost-Level:" , value: `\`${boostlevel}\``, inline: true }, 
                  { name: `${client.i18n.get(language, "includes", "tocdobit")}` , value: `\`${maxbitrate}\``, inline: true },                     
      ]) 
      const embedsemojis = new EmbedBuilder()
        .setAuthor({ name: `${client.i18n.get(language, "includes", "thongtinemojisv")} ${guild.name}`, iconURL: `${guild.iconURL({dynamic: true})}`})
        .setColor(database.colors.vang)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields({ name: `[${message.guild.emojis.cache.size}] Emojis:`, value: `${message.guild.emojis.cache.size < 30 ? message.guild.emojis.cache.map(emoji => `${emoji}`).join(", ") : message.guild.emojis.cache.size > 30 ? emojitrimarray(message.guild.emojis.cache.map(emoji => `${emoji}`)).substr(0, 1024) : `${client.i18n.get(language, "includes", "khongcoemoji")}`}`, inline: true },)
      const embedsroles =  new EmbedBuilder()
        .setAuthor({ name: `${client.i18n.get(language, "includes", "thongtinrolesv")} ${guild.name}`, iconURL: `${guild.iconURL({dynamic: true})}`})
        .setColor(database.colors.vang)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields({ name: `[${message.guild.roles.cache.size}] Roles:`, value: `${"> "+message.guild.roles.cache.size < 25 ? [...message.guild.roles.cache.values()].sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : message.guild.roles.cache.size > 25 ? trimArray(message.guild.roles.cache) : `${client.i18n.get(language, "includes", "khongcoemoji")}`}`, inline: true },)
        .setFooter({ text: `ID SEVER: ${message.guild.id}`, iconURL: `${message.guild.iconURL({ dynamic: true })}`})
        const row = new ActionRowBuilder()
        .addComponents(new SelectMenuBuilder()
            .setCustomId('ServerInfo')
            .setPlaceholder(`${client.i18n.get(language, "includes", "motsothongtinkhac")}`)
            .addOptions([{
                    label: `${client.i18n.get(language, "includes", "thongtinchungsv")}`,
                    value: 'GI',
                    description: `${client.i18n.get(language, "includes", "thongtinchungsv")}`,
                },{
                    label: 'Emojis Sever',
                    value: 'EM',
                    description: `${client.i18n.get(language, "includes", "thongtinbooster")}`,
                },{
                    label: 'Role sever',
                    value: 'RO',
                    description: `${client.i18n.get(language, "includes", "roleif")}`,
        }]))
        message.reply({ embeds: [all1], components: [row]})
        const filter = (message) => {
            if(message.user.id === message.user.id) return true;
        }
        const collector = message.channel.createMessageComponentCollector({
            filter
        });
        collector.on("collect", async (collected) => {
            const value = collected.values;
            if(value == 'GI') return collected.update({ embeds: [all1], components: [row]})
            if(value == 'EM') return collected.update({ embeds: [embedsemojis], components: [row]})
            if(value == 'RO') return collected.update({ embeds: [embedsroles], components: [row]})
        });
    } catch (e) {
      console.log(String(e.stack))
      return message.reply({ content: `${client.i18n.get(language, "handlers", "sayraloi")}` });
    };
  },
};