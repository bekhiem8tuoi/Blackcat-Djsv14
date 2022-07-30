module.exports = ( client ) => {
  const config = require("../../config.json");
  const Levels =  require("../../Modules/Includes/commands/ranking");
  Levels.setURL(`${process.env.mongourl || config.mongourl }`);
  client.on("messageCreate", async (message) => {
       if (!message.guild || message.author.bot) return;
       const blackcat = client.language;
       const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; 
       const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
           if (hasLeveledUp) {
               const user = await Levels.fetch(message.author.id, message.guild.id);
               const money = Math.floor(Math.random() * 3000) + 1;;
               await client.cs.addMoney({
                user: message.author,
                guild: { id: null },
                amount: money,
               });
               message.channel.send({ content: `${client.i18n.get(blackcat, "handlers", "reply_ranking", {
                 thanhvien: message.author,
                 levelup: user.level,
                 themtien: await client.cs.format(money)
               })}`});
          };
    });
    client.Levels = Levels;
};