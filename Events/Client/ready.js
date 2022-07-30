module.exports = ( client ) => {
    const { prefix } = require("../../config.json");
    const { Activity } = require("discord.js");
    const Discord = require("discord.js");
    console.table({ 
      'Tên Bot:' : `${client.user.tag}`,
      'Guild(s):' : `${client.guilds.cache.size} Servers` ,
      'Channel:' : `${client.channels.cache.size}`,
      'Watching:' : `${client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0)} Thành viên` ,
      'Prefix:' : `${prefix}` ,
      'Commands:' : `${client.commands.size}` ,
      'Discord.js:' : `v${Discord.version}` ,
      'Node.js:' : `${process.version}` ,
      'Dạng platt:' : `${process.platform} ${process.arch}` ,
      'memory:' : `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
    });
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