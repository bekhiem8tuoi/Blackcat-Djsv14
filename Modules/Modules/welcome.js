module.exports = (client) => {
  const name = require("../Includes/commands/path");
  const description = {
        name: name.parse(__filename).name,
        filename: name.parse(__filename).name,
        version: "5.0"
    };
    console.log(` :: ⬜️ modules: ${description.name} | Phiên bản đã tải ${description.version} Từ ("${description.filename}")`.red)
    client.on("guildMemberAdd", async(member) => { 
      const { EmbedBuilder } = require("discord.js");
      const database = require("../Json/database.json");
      const guildConfig = require('../Databases/Schema/guildConfig');
      const data = await guildConfig.findOne({ guildId: member.guild.id })
      if (!data) return
      const channel = member.guild.channels.cache.find(c => c.id === data.welcomeChannel)
      if (!channel) return;
      channel.send({ content: `chào mừng bạn <@${member.id}> đã tham gia sever`})
      /*
      const Canvas = require("canvas");
      const canvas = Canvas.createCanvas(1772, 633);     
      const ctx = canvas.getContext('2d');     
      const background = await Canvas.loadImage(`./welcome.png`);
      const language = client.language;
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f2f2f2';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      var textString3 = `${member.user.username}`;
      if (textString3.length >= 14) {
        ctx.font = 'bold 100px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      } else {
        ctx.font = 'bold 150px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      var textString2 = `#${member.user.discriminator}`;
      ctx.font = 'bold 40px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString2, 730, canvas.height / 2 + 58);      
      var textString4 = `${client.i18n.get(language, "modules", "thanhvienthu", {
        sothanhvien: member.guild.memberCount
      })}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 750, canvas.height / 2 + 125);      
      var textString4 = `${member.guild.name}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 700, canvas.height / 2 - 150);
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);      
      const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome-image.png' }); 
      const welcomeembed = new EmbedBuilder()
      .setImage("attachment://welcome-image.png")
      channel.send({ embeds: [welcomeembed], files: [attachment] }); 
      */
  });
};