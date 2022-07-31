const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const fs = require("fs");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["hvoice", "helpvc"], // lệnh phụ
    description: "hiển thị list voice", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Infomation", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
      fs.readdir("./Modules/sound", voice());
      //////
      function voice(err, files) {
      if (err) return message.reply({ content: `${client.i18n.get(language, "includes", "khongdocthumuc", {
        hienthiloi: err
      })}`});
      let sounds = []; 
      files.forEach(function(file) {
        sounds.push(file.substring(0, file.length - 4));
      });
      message.reply({ content: `${client.i18n.get(language, "includes", "dechaylenh", {
      prefix: prefix,
      hienthisound: sounds.join(", ")
      })}` }).catch(console.error);
      };
    },
};
