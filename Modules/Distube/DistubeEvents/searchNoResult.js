module.exports = (client) => {
    client.distube.on(`searchNoResult`, message => message.channel.send({
      content: `${client.i18n.get(client.language, "handlers", "khongthetimkiembaihat")}`
    }).catch((e)=>console.log(e)));
};