module.exports = (client) => {
    const { CHANNEL_LOGCMDS } = require("../../Modules/Json/channell.json");
    const { EmbedBuilder } = require("discord.js");
    client.on("guildCreate", guild => {
    const embed = new EmbedBuilder()
        .setTitle("Tôi đã được thêm vào một máy chủ mới")
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`Tôi được thêm vào: ${guild.name} | ID ${guild.id}\n Server member: ${guild.memberCount}\nTotal server: ${client.guilds.cache.size}`)
        .setTimestamp()
    const logchannel = client.channels.cache.get(process.env.CHANNEL_LOGCMDS || CHANNEL_LOGCMDS)
    logchannel.send({ embeds: [embed] })
});
client.on("guildDelete", guild => {
    const embed = new EmbedBuilder()
        .setTitle("Tôi rời khỏi một máy chủ")
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`Tôi đã rời khỏi: ${guild.name} | ID ${guild.id}\n Server member: ${guild.memberCount}\nTotal server: ${client.guilds.cache.size}`)
        .setTimestamp()
    const logchannel = client.channels.cache.get(process.env.CHANNEL_LOGCMDS || CHANNEL_LOGCMDS)
    logchannel.send({ embeds: [embed] })
});
};