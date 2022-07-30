module.exports = (client) => {
    client.distube.on(`empty`, (queue) => {
      queue.textChannel.send({ content: `${client.i18n.get(client.language, "handlers", "voicechongroikenh")}`
      }).then(msg => {
          setTimeout(() => { 
            msg.delete();
          }, 10000);
      });
    });
};