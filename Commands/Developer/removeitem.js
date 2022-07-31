const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "xoá mặt hàng trong shop", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: true, //: tắt // true : bật
    category:"Developer", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        if (!args[0]) return message.reply({ content: 'Loại bỏ mục nào?'})
        let result = await client.cs.removeItem({
            guild: { id: null },
            item: parseInt(args[0])
        });
        if (result.error) {
            if (result.type == 'Invalid-Item-Number') return message.reply({ content: 'Đã xảy ra lỗi, Vui lòng nhập số mục để loại bỏ.!'})
            if (result.type == 'Unknown-Item') return message.reply({ content: 'Đã xảy ra lỗi, Mục không tồn tại!'})
        } else message.reply({ content: `Đã xóa thành công ${result.inventory.name} từ shop`})
    },
};
