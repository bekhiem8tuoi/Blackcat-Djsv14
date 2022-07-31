const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "thêm món hàng vào shopp", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: true, //: tắt // true : bật
    category:"Developer", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
        message.reply({ content: 'Tên mục nên là gì?'});
    let Name = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });

    message.reply({ content: 'Giá của nó nên là bao nhiêu?' });
    let Price = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
    message.reply({ content: 'Mô tả của nó nên là gì?' });
    let description = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
    let result = await client.cs.addItem({
        guild: { id : null },
        inventory: {
            name: Name.first().content,
            price: parseInt(Price.first().content),
            description: description.first().content
        }
    });
    if (result.error) {
        if (result.type == 'No-Inventory-Name') return message.reply({ content: 'Đã xảy ra lỗi, Vui lòng nhập tên mục để sửa lỗi.!'})
        if (result.type == 'Invalid-Inventory-Price') return message.reply({ content: 'Đã xảy ra lỗi, giá không hợp lệ!' })
        if (result.type == 'No-Inventory-Price') return message.reply({ content: 'Đã xảy ra lỗi, Bạn không chỉ định giá!' })
        if (result.type == 'No-Inventory') return message.reply({ contemt: 'Đã xảy ra lỗi, Không nhận được dữ liệu!' })
    } else { 
        message.reply({ content: `Làm xong! Đã thêm thành công ${Name.first().Content} vào cửa hàng!` })
    };
    },
};
