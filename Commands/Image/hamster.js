const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const fetch = require('node-fetch');
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Image", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    const url = ['https://www.reddit.com/r/hamsters/hot.json'];
		let response;
		try {
			response = await fetch(url)
				.then(res => res.json())
				.then(json => json.data.children.map(v => v.data))
				.then(post => Randomimage(post));
		}
		catch (e) {
			return message.reply({ content: '\`Đã có lỗi xảy ra. Xin vui lòng thử lại!\`' });
		}
		function Randomimage(post) {
			const random = post[Math.floor(Math.random() * post.length) + 1];
			const embed = new EmbedBuilder()
				.setColor(database.colors.vang)
				.setURL(`https://www.reddit.com/r/${random.subreddit}/comments/${random.id}`)
				.setTitle(random.title)
				.setImage(random.url)
				.setFooter({ text: `👍 ${random.ups} | 💬 ${random.num_comments}`});
			message.reply({ embeds: [embed] });
    };
    },
};