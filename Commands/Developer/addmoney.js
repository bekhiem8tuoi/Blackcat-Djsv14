const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "thêm tiềm cho thamhf viên", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: true, //: tắt // true : bật
    category:"Developer", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]);
            if (user) user = user.user;;
        } else if (!args[0]) {
            return message.channel.send({ content: "Chỉ định một người dùng!" });
        }
        let wheretoPutMoney = args[2] || "ví tiền"; 
        let amount = parseInt(args[1]);
        if (!amount) return message.reply({ content: "Nhập số tiền để thêm." });
        let money = parseInt(amount);
        let result = await client.cs.addMoney({
            user: user,
            guild: {
              id : null
            },
            amount: money,
            wheretoPutMoney: wheretoPutMoney
        });
        if (result.error) return message.reply({ content: "Bạn không thể thêm tiền âm" });
        else message.reply({ content: `Thêm thành công ${await client.cs.format(money)} cho ${user.username}, ( vào ${wheretoPutMoney} )` })
    },
};
