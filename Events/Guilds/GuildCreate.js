module.exports = (client, guild, message) => {
    const database = require("../../Modules/Json/database.json");
    const { EmbedBuilder } = require("discord.js");
    if (!guild) return;
    let channel = guild.channels.cache.find(channel => channel.type == "GUILD_TEXT" && channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
    if (!channel) return;
    if (channel.permissionsFor(guild.me).has("EMBED_LINKS")) {
        channel.send({ embeds: [new EmbedBuilder()
                                .setTitle(`bot name: ` + client.user.username)
                                .setColor(database.colors.vang)
                                .setFooter({ text: `${client.user.username}`})
                                .setDescription(``)
        ], content: `join my discord:` + invite.discord });
    } else {
        channel.send({ content: `prefix: ${config.prefix}help to see all commands` });
    }; 
};