module.exports = (client, queue, playlist) => {
     const { updateMusicSystem } = require("../../functions");
     const database = require("../../Json/database.json");
     const { EmbedBuilder } = require("discord.js");
     const emoji = require("../../Json/emoji.json");
     client.distube.on("addList", (queue, playlist) => {
       updateMusicSystem(queue);
       queue.textChannel.send({ embeds: [ new EmbedBuilder()
          .setColor(database.colors.vang)
          .setThumbnail(playlist.thumbnail.url ? playlist.thumbnail.url : `https://img.youtube.com/vi/${playlist.songs[0].id}/mqdefault.jpg`)
          .setFooter({ text: `💯 ${playlist.user.tag}`, iconURL: `${playlist.user.displayAvatarURL({ dynamic: true })}`})
          .setTitle(`${emoji.v} **${client.i18n.get(client.language, "handlers", "danhsachphatdaduocthem")}!**`)
          .setDescription(`👍 Danh sách: [\`${playlist.name}\`](${playlist.url ? playlist.url : ``})  -  \`${playlist.songs.length} ${client.i18n.get(client.language, "handlers", "song")}${playlist.songs.length > 0 ? `` : ``}\``)
          .addFields({ name: `${emoji.Cheme} **${client.i18n.get(client.language, "handlers", "thoigiandudinh")}**`, value: `\`${queue.songs.length - - playlist.songs.length} ${client.i18n.get(client.language, "handlers", "song")}${queue.songs.length > 0 ? `` : ``}\` - \`${(Math.floor((queue.duration - playlist.duration) / 60 * 100) / 100).toString().replace(`.`, `:`)}\``, inline: true },
                     { name: `${emoji.Cat} **${client.i18n.get(client.language, "handlers", "thoiluonghangdoi")}**`, value: `\`${queue.formattedDuration}\``, inline: true },)
       ]}).then(msg => {
          setTimeout(() => { 
            msg.delete();
          }, 11000);
      });
   });
};