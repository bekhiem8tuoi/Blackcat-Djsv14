const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "đổi tên của bot", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: true, //: tắt // true : bật
    category:"Developer", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    try {
      if(!args[0]) return message.reply("vui lòng nhập tên muốn đổi");
      if (args.join(" ").length > 32){
        return message.reply({ content: `tên bot quá dài, tên bot không thể dài hơn 32 chữ cái` });
      }
      client.user.setUsername(args.join(" ")).then(user => {
          return message.reply({ content: `Đã đổi tên thành: \`${user.username}\`` });
      }).catch(e => {
          return message.reply({ content: 'Đã sảy ra lỗi thử lại sau' });
      });
    } catch (e) {
      console.log(String(e.stack))
      return;
    }
    },
};
