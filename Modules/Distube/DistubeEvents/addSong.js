module.exports = (client) => {
    const { updateMusicSystem } = require("../../functions");
    const database = require("../../Json/database.json");
    const { EmbedBuilder } = require("discord.js");
    const language = client.language;
    client.distube.on("addSong", (queue, song) => {
       updateMusicSystem(queue);
       queue.textChannel.send({ embeds: [new EmbedBuilder()
          .setColor(database.colors.vang)
          .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
          .setFooter({ text: `💯 ${song.user.tag}`, iconURL: `${song.user.displayAvatarURL({ dynamic: true })}`})
          .setAuthor({ name: `${client.i18n.get(language, "handlers", "baihatdathemvaohangdoi")}!`, iconURL: `${song.user.displayAvatarURL({ dynamic: true })}`, url: `${song.url}` })
          .setDescription(`👍 ${client.i18n.get(language, "handlers", "song")}: [${song.name}](${song.url})  -  ${song.formattedDuration}`)
          .addFields({ name: `⌛ **${client.i18n.get(language, "handlers", "thoigiandudinh")}**`, value: `\`${queue.songs.length - 1} ${client.i18n.get(language, "handlers", "song")}${queue.songs.length > 0 ? `.` : ``}\` - \`${(Math.floor((queue.duration - song.duration) / 60 * 100) / 100).toString().replace(`.`, `:`)}\``, inline: true },
                     { name: `🎥 ${client.i18n.get(language, "distube", "distube_0")}`, value: `${(queue.songs[0].views).toLocaleString()}`, inline: true },
                     { name: `👍 Likes`, value: `${(queue.songs[0].likes).toLocaleString()}`, inline: true },
                     { name: `👎 Dislikes`, value: `${(queue.songs[0].dislikes).toLocaleString()}`, inline: true},
                     { name: `🌀 **${client.i18n.get(language, "handlers", "thoiluonghangdoi")}**`, value: `\`${queue.formattedDuration}\``, inline: true },)
        ]}).then(msg => {
              setTimeout(() => {
                msg.delete();
              }, 30000);
        });
    });
};