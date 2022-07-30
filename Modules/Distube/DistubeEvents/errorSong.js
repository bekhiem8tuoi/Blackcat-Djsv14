module.exports = (client) => {
   const { EmbedBuilder } = require("discord.js");
   client.distube.on('error', (channel, error) => {
      console.error(error)
      channel.send({ embeds: [new EmbedBuilder()
             .setDescription(`Đã xảy ra lỗi: ${error.slice(0, 1979)}`)
             .setColor("Random")
             .setTitle("có lỗi suất hiện")
      ]}).then(msg => {
          setTimeout(() => { 
            msg.delete();
          }, 10000);
      });
   })
};