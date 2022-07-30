module.exports = (client) => {
    client.distube.on("searchResult", (message, results) => {
    let i = 0
    message.channel.send(`**Chọn một tùy chọn từ bên dưới**\n${results.map((song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Nhập bất kỳ thứ gì khác hoặc đợi 60 giây để hủy*`);
   });
};