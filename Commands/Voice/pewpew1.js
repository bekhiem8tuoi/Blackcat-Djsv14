const { AudioPlayerStatus, joinVoiceChannel, createAudioResource, createAudioPlayer} = require('@discordjs/voice');
const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: `play voice: ${name.parse(__filename).name}`, // mô tả lệnh
    userPerms: ["Connect"], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Voice", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    const channel = message.member.voice.channel;
		if(!channel) return message.reply({ content: `${client.i18n.get(client.language, "voice", "voice_1")} :wink:` });
		const player = createAudioPlayer();
		const resource = createAudioResource('./Modules/sound/pewpew1.mp3');
		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});
    message.reply({ content: `${client.i18n.get(client.language, "voice", "voice_0", {
      voice_00: name.parse(__filename).name
    })}` }).then(msg => {
        setTimeout(() => { 
          msg.delete() 
        }, 5000);
    });
		player.play(resource);
		connection.subscribe(player);
		player.on(AudioPlayerStatus.Idle, () => {
			connection.destroy();
		});
    },
};
