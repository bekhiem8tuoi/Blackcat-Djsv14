const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, AttachmentBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const canvacord = require("canvacord");
const img = "https://cdn.discordapp.com/attachments/866970321977737217/867019317065547776/FB_IMG_1626186229672.jpg";
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Rankink", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        const Levels = client.Levels;
        const target = message.mentions.users.first() || message.author; 
        const user = await Levels.fetch(target.id, message.guild.id);
        if (!user) return message.reply({ content: `${client.i18n.get(language, "ranking", "khongcodiemrank")}`}); 
        const rankcmds = ``;
        const neededXp = Levels.xpFor(parseInt(user.level) + 1 )
        const rank = new canvacord.Rank()
           .setAvatar(target.displayAvatarURL({ dinamyc: false, format: 'png' }))
           .setBackground("IMAGE", img)
           .setRank(1, "RANK", false)
           .setLevel(user.level)
           .setCurrentXP(user.xp)
           .setRequiredXP(neededXp)
           .setStatus("online")
           .setProgressBar("#E4B400", "COLOR")
           .setUsername(target.username)
           .setDiscriminator(target.discriminator);
       rank.build()
          .then(data => {
              const attachment = new AttachmentBuilder(data, { name: "RankCard.png" });
              message.reply({ files: [attachment] });
        });
    },
};