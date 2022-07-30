module.exports = (client) => {
    client.distube.on(`searchCancel`, (queue) => {
      queue.textChannel.send({ content: `${client.i18n.get(client.language, "handlers", "timkiembihuy")}`
    }).then(msg => {
          setTimeout(() => { 
            msg.delete();
          }, 10000);
      });
    });
};