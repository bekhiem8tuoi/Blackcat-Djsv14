const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "xet item cho shop", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: true, //: tắt // true : bật
    category:"Developer", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        client.cs.setItems({
            guild: { id: null },
            shop: [{
                name: 'Watch',
                price: 20
            },{
                name: 'Rolex',
                price: 1230
            },{
              name: "lamborghini",
              price: 16000000
            }]
        });
        return message.reply("Đã thêm thành công")
    },
};
