const { GetUser, GetGlobalUser } = require("../../Modules/functions");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["ava", "avt"], // lệnh phụ
    description: "avatar user", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Utility", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, blackcat, prefix, database, emoji, language) => {
      const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder } = blackcat;
      var user;
      try{
        if(args[1] && args[1].toLowerCase() == "global"){
          args.pop()
          user = await GetGlobalUser(message, args)
        } else {
          user = await GetUser(message, args)
        };
      } catch (e){
        return message.reply(e)
      };
      await message.reply({ content: `${user.displayAvatarURL({ extension: "png", size: 512 })}`});
    },
};
