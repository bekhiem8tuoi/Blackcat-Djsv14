module.exports = ( client ) => {
    const { prefix } = require("../../config.json");
    const { Activity } = require("discord.js");
    console.log(`Tên của bot  : ${client.user.username}`.red);
    console.log(`Tổng số lệnh : ${client.commands.size}`.blue);
    console.log(`Tổng số người: ${client.users.cache.size}`.green);
    console.log(`Tổng số sever: ${client.guilds.cache.size}`.yellow);
    console.log(`Tổng số kênh : ${client.channels.cache.size}`.green);
    console.log("\n");
    let statuses = [
      `${prefix}help/@botname help`,
      `Prefix ${prefix}`, 
      `${client.guilds.cache.size} Guilds and ${client.guilds.cache.filter((e) => e.memberCount).reduce((a, g) => a + g.memberCount, 0)} member`
    ];
    setInterval(function() {
  		let status = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setActivity(status, {type: Activity.Playing});
  	}, 5000);
    client.user.setStatus('idle');
};