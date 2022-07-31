const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const fetch = require("node-fetch");
const fs = require("fs");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "thay đổi avatar của bot", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Developer", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    try {
      var url;
      if (message.attachments.size > 0) {
        if (message.attachments.every(attachIsImage)) {
          const response = await fetch(url);
          const buffer = await response.buffer();
          await fs.writeFile(`./image.jpg`, buffer, () => {
            console.log('👍')
          });
          client.user.setAvatar(`./image.jpg`)
            .then(user => {
              try {
                fs.unlinkSync("./image.jpg")
              } catch {}
              return message.reply({ content: `${emoji.Hihi} \`Đã thay đổi avatar thành công\``});
            })
            .catch(e => {
              return message.reply({ content: `${emoji.Muiten} \`Đã xảy ra lỗi:\`\n\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\`` });
            });
        } else {
          return message.reply({ content: `${emoji.Hihi} \`Không thể sử dụng Hình ảnh của bạn làm avatar, hãy đảm bảo rằng nó là: png/jpg\``});
        }
      } else if (message.content && textIsImage(message.content)) {
        url = args.join(" ")
        const response = await fetch(url);
        const buffer = await response.buffer();
        await fs.writeFile(`./image.jpg`, buffer, () =>
          console.log('👍'));
        client.user.setAvatar(`./image.jpg`)
          .then(user => {
            try {
              fs.unlinkSync("./image.jpg")
            } catch {

            }
            return message.reply({ content: `${emoji.Hihi} \`Đã thay đổi avatar bot thành công\`` });
          })
          .catch(e => {
            return message.reply({ content: `\`Đã xảy ra lỗi:\`\n\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\`` });
          });

      } else {
        return message.reply({ embeds: [new EmbedBuilder()
          .setTitle(`${emoji.x} \`Không thể sử dụng Hình ảnh của bạn làm avatar, hãy đảm bảo rằng đó là: png/jpg/webp\``)
          .setDescription(`Sử Dụng: \`${prefix}botavatar <ảnh/Link ảnh>\``)
          .setColor(database.colors.vang)
          .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
        ]});
      }

      function attachIsImage(msgAttach) {
        url = msgAttach.url;
        return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
          url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
          url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
      }

      function textIsImage(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
      }


    } catch (e) {
      console.log(String(e.stack))
      return message.reply({ content: `\`Đã xảy ra lỗi:\`\n\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\`` });
    }
    },
};
