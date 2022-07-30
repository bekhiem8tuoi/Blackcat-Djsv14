module.exports = (client) => {
    const { EmbedBuilder } = require("discord.js");
    client.distube.on("finish", (queue) => {
      queue.textChannel.send({ embeds: [new EmbedBuilder()
            .setColor("Random")
            .setDescription("Đã phát hết nhạc trong hàng đợi,.. rời khỏi kênh voice")
      ]}).then(msg => {
          setTimeout(() => { 
            msg.delete();
          }, 10000);
      });
    });
};