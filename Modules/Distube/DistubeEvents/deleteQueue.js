module.exports = (client, queue) => {
      const { updateMusicSystem } = require("../../functions");
      const database = require("../../Json/database.json");
      const emoji = require("../../Json/emoji.json");
      const { EmbedBuilder } = require("discord.js");
      const language = client.language;
      const PlayerMap = new Map();
      client.distube.on(`deleteQueue`, queue => {
        var newQueue = client.distube.getQueue(queue.id) 
        if(!PlayerMap.has(`deleted-${queue.id}`)) {
          PlayerMap.set(`deleted-${queue.id}`, true);
          if(client.maps.has(`beforeshuffle-${queue.id}`)){
            client.maps.delete(`beforeshuffle-${queue.id}`); // newQueue.id = xáo trộn bài hát
          }
          try {
            clearInterval(playerintervals.get(`checkrelevantinterval-${queue.id}`))
            playerintervals.delete(`checkrelevantinterval-${queue.id}`);
            clearInterval(playerintervals.get(`autoresumeinterval-${queue.id}`))
            if (client.autoresume.has(queue.id)) client.autoresume.delete(queue.id); 
            playerintervals.delete(`autoresumeinterval-${queue.id}`);
            clearInterval(playerintervals.get(`musicsystemeditinterval-${queue.id}`))
            playerintervals.delete(`musicsystemeditinterval-${queue.id}`);
          } catch(e){}
          updateMusicSystem(queue, true);
          queue.textChannel.send({
            embeds: [new EmbedBuilder()
              .setColor(database.colors.vang)
              .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
              .setTitle(`${client.i18n.get(language, "handlers", "phathetnhac1")}`)
              .setDescription(`${emoji.Khockhoc} **${client.i18n.get(language, "handlers", "phathetnhac2")}**`)
              .setTimestamp()
            ]
          }).then(msg => {
            setTimeout(() =>{
                msg.delete();
              }, 10000);
          });
        };
    });
};