const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "xoá tiền người dùng", // mô tả lệnh
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
             return message.reply({ content: "Chỉ định một người dùng!"});
        }
        let wheretoPutMoney = args[2] || "wallet"; 
        let amount = args[1];
        if (!amount) return message.reply({ content: "Nhập số tiền để Xóa."});
        let result = await client.cs.removeMoney({
           user: user,
           guild: { id: null},
           amount: amount,
           wheretoPutMoney: wheretoPutMoney
        });
        if (result.error) return message.reply({ content:"Bạn không thể xóa tiền tiêu cực"});
        else message.reply({ content: `Đã xóa thành công tất cả tiền khỏi ${user.username}, ( bằng ${wheretoPutMoney})`})
    },
};
