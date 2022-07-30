const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonStyle } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Game", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    let profile; 
    try {
         profile = await client.cs.balance({ 
          user: message.author.id,
          guild: { 
            id : null
          },
        });
    if(!profile) {
      return message.reply(`${client.i18n.get(language, "game", "coinfl_0")}`)
     }
    let amountToBet = args
    if(!amountToBet){
       let embed = new EmbedBuilder()
           .setDescription(`${client.i18n.get(language, "game", "coinfl_1")}`)
           .setColor("#6F8FAF")
         return message.reply({ embeds: [embed] })
    }
    if(!Number(amountToBet)) {
        let embed = new EmbedBuilder()
           .setDescription(`${client.i18n.get(language, "game", "coinfl_2")}`)
           .setColor("#6F8FAF")
        return message.reply({ embeds: [embed] })
    }
    if(amountToBet > 30000){
       let embed = new EmbedBuilder()
        .setDescription(`${client.i18n.get(language, "game", "coinfl_3")}`)
        .setColor("#6F8FAF")
      return message.reply({ embeds: [embed] })
    }
    if(amountToBet > profile.wallet){
       let embed = new EmbedBuilder()
        .setDescription(`${client.i18n.get(language, "game", "coinfl_4")}`)
        .setColor("#6F8FAF")
       return message.reply({ embeds: [embed] })
     }
    let betEmbed = new EmbedBuilder()
        .setAuthor({ name: `COINFLIP BUTTONS`})
        .setDescription(`${client.i18n.get(language, "game", "coinfl_5")}`)
        .setColor("#6F8FAF")
		let h = new ButtonBuilder()
					.setCustomId('heads')
					.setLabel(`${client.i18n.get(language, "game", "coinfl_ngua")}`)
					.setStyle(ButtonStyle.Danger);
    let t = new ButtonBuilder()
					.setCustomId('tails')
					.setLabel(`${client.i18n.get(language, "game", "coinfl_sap")}`)
					.setStyle(ButtonStyle.Success);	
     const coin = new ActionRowBuilder().addComponents(h, t);
     let sentMsg = await message.reply({ embeds: [betEmbed], components: [coin] })
     var CoinFlip = ["Ngửa", "Sấp"]
     let Fliped = CoinFlip[Math.floor(Math.random() * CoinFlip.length)];
     const collector = message.channel.createMessageComponentCollector({ time: 20000 , max: 1});
     collector.on('collect', async i => {
	      if (i.customId === 'heads') {
          if(Fliped === CoinFlip[0]) { 
          await i.reply({ embeds: [new EmbedBuilder()
                .setImage("https://i.imgur.com/C4lYV1X.png")
                .setTitle("win game")
                .setColor(database.colors.vang)
                .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}` })
                .setDescription(`${client.i18n.get(language, "game", "coinfl_6", {
                  coinfl_code0: Fliped,
                  coinfl_code1: await client.cs.format(amountToBet * 2)
                })}`)], components: []
          });
          profile = await client.cs.addMoney({
            user: message.author.id,
            guild: { id: null },
            amount: amountToBet * 2,
          });
         } else {
         await i.reply({ embeds: [new EmbedBuilder()
                .setImage("https://i.imgur.com/SUpIkmJ.png")
                .setTitle("lose game")
                .setDescription(`${client.i18n.get(language, "game", "coinfl_7", {
                  coinfl_code3: Fliped,
                  coinfl_code4: await client.cs.format(amountToBet)
                })}`)
                .setColor(database.colors.vang)
                .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}` })
             ], components: []
        });
         profile = await client.cs.removeMoney({
            user: message.author.id,
            guild: { id: null },
            amount: amountToBet,
        });
      }
  	}
    if (i.customId === 'tails') {
        if(Fliped === CoinFlip[1]){
        await i.reply({ embeds: [new EmbedBuilder()
            .setImage("https://i.imgur.com/SUpIkmJ.png")
            .setTitle("win game")
            .setColor(database.colors.vang)
            .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}` })
            .setDescription(`${Fliped} thắng. GG Bạn kiếm được ${await client.cs.format(amountToBet * 2)}`)
          ], components: []
       })
        profile = await client.cs.addMoney({
            user: message.author.id,
            guild: { id: null },
            amount: amountToBet * 4.99,
        });
      
    } else {
      await i.reply({ embeds: [new EmbedBuilder()
        .setImage("https://i.imgur.com/C4lYV1X.png")
        .setTitle("lose game")
        .setDescription(`${client.i18n.get(language, "game", "coinfl_7", {
                  coinfl_code3: Fliped,
                  coinfl_code4: await client.cs.format(amountToBet)
        })}`)
        .setColor(database.colors.vang)
        .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}` })
     ], components: []
    })
      profile = await client.cs.removeMoney({
        user: message.author.id,
        guild: { id: null },
        amount: amountToBet,
      });
    }
    }
    });
    let disabledRow = new ActionRowBuilder().addComponents(
        h.setDisabled(true).setStyle(ButtonStyle.Success),
        t.setDisabled(true).setStyle(ButtonStyle.Success)
    );
    collector.on('end', (i, reason) => {
       if(reason == "time"){
            sentMsg.edit({content: "Bạn đã hết thời gian", components: [disabledRow]})
       }else {
          sentMsg.edit({ components: [disabledRow] })          
       }
    });
    } catch(err) {
          message.reply(`\`\`\`${err}\`\`\``)
    };
   },
};