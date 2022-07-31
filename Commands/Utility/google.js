const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "Tìm kiếm mọi thứ trên google", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Utility", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    const text1 = args.join(" ");
    const text2 = args.join("+");
    const google = `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`;
    if (!text2) {
      return message.reply({ content: `${client.i18n.get(language, "utility", "nhapcaigidodetim")}` });
    };
    const embed = new EmbedBuilder()
      .setAuthor({ name: "Google", iconURL: `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`})
      .setThumbnail(`https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`)
      .setDescription(`**Search: **\n${text1} \n\n**${client.i18n.get(language, "utility", "ketquatimkiem")} **\n[${client.i18n.get(language, "utility", "nhunggitimthay")}](https://google.com/search?q=${text2})`)
      .setThumbnail(google)
      .setColor("Random");
    message.reply({ embeds: [embed] });

    },
};
