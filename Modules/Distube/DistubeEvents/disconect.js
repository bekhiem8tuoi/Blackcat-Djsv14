module.exports = (client) => {
    const { EmbedBuilder } = require("discord.js");
    client.distube.on("disconnect", (queue) => {
        const embed = new EmbedBuilder()
            .setDescription(":x: | Đã ngắt kết nối khỏi kênh voice")
        queue.textChannel.send({ embeds: [embed] }).then(msg => {
          setTimeout(() => { 
            msg.delete();
          }, 10000);
      });
    });
};