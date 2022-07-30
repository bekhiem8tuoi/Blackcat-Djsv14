const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "xem tất cả các lệnh", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Information", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
    const { Hihi, Heyhey, Meow, Chem, Jum, Ricado, Zitdance, Cat, Lacdau, Hack, Cheme, Laclac, Dj, Omg, Muiten } = emoji;
    const { duration, phan_bo_tung_danh_muc } = require("../../Modules/functions")
    let settings = client.settings.get(message.guild.id);
    try {
      if (args[0]) {
        const embed = new EmbedBuilder()
        .setColor(database.colors.vang);
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        if (cmd.name) embed.addFields({ name: `${client.i18n.get(language, "includes", "tenlenhchinh")}`, value: `\`\`\`${cmd.name}\`\`\``});
        if (cmd.name) embed.setTitle(`${client.i18n.get(language, "includes", "thongtinchitiet", { thongtinlenh: cmd.name })}`);
        if (cmd.description) embed.addFields({ name: `${client.i18n.get(language, "includes", "motalenh")}`, value: `\`\`\`${cmd.description}\`\`\``});
        if (cmd.aliases && cmd.aliases.length > 0 && cmd.aliases[0].length > 1) 
          try {
          embed.addFields({ name: `${client.i18n.get(language, "includes", "lenhphu")}`, value: `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``});
          } catch { }
        if (cmd.cooldown) embed.addFields({ name: `${client.i18n.get(language, "includes", "thoigianhoi")}`, value: `\`\`\`${cmd.cooldown}s\`\`\`` });
        else embed.addField(`${client.i18n.get(language, "includes", "thoigianhoi")}`, `\`\`\`3s\`\`\``);
        if (cmd.usage) {
          embed.addFields({ nme: `${client.i18n.get(language, "includes", "sudunglenh")}`,  value: `\`\`\`${prefix}${cmd.usage}\`\`\`` });
        }
        return message.reply({embeds: [embed]});
      } else {
        let button_back = new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId('1').setEmoji("833802907509719130").setLabel(`${client.i18n.get(language, "includes", "trangtruoc")}`)
        let button_home = new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId('2').setEmoji("854047764077477910").setLabel(`${client.i18n.get(language, "includes", "trangchu")}`)
        let button_forward = new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId('3').setEmoji('832598861813776394').setLabel(`${client.i18n.get(language, "includes", "trangsau")}`)        
        let button_tutorial = new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji("882105781078618142").setLabel("Webshite").setURL("https://blackcatz.herokuapp.com/index.html")
        let menuOptions = [{
            label: `${client.i18n.get(language, "includes", "trangchu")}`,
            value: "Trang chủ",
            emoji: Cat,
            description: `${client.i18n.get(language, "includes", "trangchu1")}`
          },{
            label: "Economy",
            value: "Economy",
            emoji: Heyhey,
            description: `${client.i18n.get(language, "includes", "economy")}`
          },{
            label: "Developer",
            value: "Developer",
            emoji: Ricado,
            description: `${client.i18n.get(language, "includes", "emotions")}`
          },{
            label: "Filter",
            value: "Filter",
            emoji: Jum,
            description: `${client.i18n.get(language, "includes", "filter")}`
          },{
            label: "Game",
            value: "Game",
            emoji: Chem,
            description: `${client.i18n.get(language, "includes", "game")}`
          },{
            label: "Giveaway",
            value: "Giveaway",
            emoji: Laclac,
            description: `${client.i18n.get(language, "includes", "giveaway")}`
          },{
            label: "Image",
            value: "Image",
            emoji: Dj,
            description: `${client.i18n.get(language, "includes", "image")}`
          },{
            label: "Information",
            value: "Information",
            emoji: Heyhey,
            description: `${client.i18n.get(language, "includes", "includes")}`
          },{
            label: "Moderation",
            value: "Moderation",
            emoji: Muiten,
            description: `${client.i18n.get(language, "includes", "moderation")}`
          },{
            label: "Music",
            value: "Music",
            emoji: Dj,
            description: `${client.i18n.get(language, "includes", "music")}`
          },{
            label: "Ranking",
            value: "Ranking",
            emoji: Zitdance,
            description: `${client.i18n.get(language, "includes", "ranking")}`
          },{
            label: "Utility",
            value: "Utility",
            emoji: Omg,
            description: `${client.i18n.get(language, "includes", "utility")}`
          },{
            label: "Voice",
            value: "Voice",
            emoji: Cheme,
            description: `${client.i18n.get(language, "includes", "voice")}`
          },{
            label: "Voice Setup",
            value: "Voice Setup",
            emoji: Lacdau,
            description: `${client.i18n.get(language, "includes", "voicesetup")}`
          }
        ];
        menuOptions = menuOptions.map(i=>{
          if(settings[`${i?.value.toUpperCase()}`] === undefined){
            return i; 
          } else if(settings[`${i?.value.toUpperCase()}`]){
            return i;
          } else if(settings.showdisabled && settings[`${i?.value.toUpperCase()}`] === false){
            return i;
          } else {
            /**/
          };
        });
        let menuSelection = new SelectMenuBuilder()
          .setCustomId("MenuSelection")
          .setPlaceholder(`${client.i18n.get(language, "includes", "clickdexemtrogiup")}`)
          .setMinValues(1)
          .setMaxValues(5)
        .addOptions(menuOptions.filter(Boolean))
        let buttonRow = new ActionRowBuilder().addComponents([button_back,button_home, button_forward, button_tutorial])
        let SelectionRow = new ActionRowBuilder().addComponents([menuSelection])
        const allbuttons = [buttonRow, SelectionRow]
        let homeEmbeds = new EmbedBuilder()
        .setColor(database.colors.vang)
        .setDescription(`${client.i18n.get(language, "includes", "tongquantrangchu", {
          emojidong: Meow,
          pingbot: client.ws.ping,
          tientobot: prefix,
          thumuclenh: client.categories.length,
          lenhchinh: client.commands.size,
          lenhphu: client.aliases.size,
          lenhlash: client.slashCommands.size + client.slashCommands.map(d => d.options).flat().length,
          emojidong2: Hihi
        })}`)
        .setTimestamp(Date.now())
        .setColor(database.colors.vang)
        .setFooter({ text: `${client.i18n.get(language, "includes", "tongquanvetrang")} ${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`})
        .setTitle(`${client.i18n.get(language, "includes", "trogiupcua")} ${client.user.username}`)
        let helpmsg = await message.reply({   
            content: `***${client.i18n.get(language, "includes", "nhapcacnut")}***`,
            embeds: [homeEmbeds], 
            components: allbuttons
        }).catch(e=>{
          console.log(e.stack ? String(e.stack) : String(e))
          return message.reply(`:x: ${client.i18n.get(language, "includes", "khongthegoihelp")}`).catch(() => {})
        });
        var edited = false;
        var embeds = [homeEmbeds]
        for(const e of phan_bo_tung_danh_muc(true))
          embeds.push(e)        
        let currentPage = 0;
        const collector = helpmsg.createMessageComponentCollector({filter: (i) => (i?.isButton() || i?.isSelectMenu()) && i?.user && i?.message.author.id == client.user.id, time: 180e3 });
        collector.on('collect', async b => {
          try{
            if(b?.isButton()){
            if(b?.user.id !== message.author.id)
              return b?.reply({ content: `${client.i18n.get(language, "includes", "chinguoihelpmoiduocdung", { prefix: prefix })}`, ephemeral: true });
              if(b?.customId == "1") {
                  if (currentPage !== 0) {
                    currentPage -= 1
                  } else {
                      currentPage = embeds.length - 1
                  }
              } else if(b?.customId == "2"){
                  currentPage = 0;
              } else if(b?.customId == "3"){
                  if (currentPage < embeds.length - 1) {
                      currentPage++;
                  } else {
                      currentPage = 0
                  }
              }
              await helpmsg.edit({embeds: [embeds[currentPage]], components: allbuttons }).catch(e=>{});
              b?.deferUpdate().catch(e=>{})
            }
            if(b?.isSelectMenu()){
              let index = 0;
              let vembeds = []
              let theembeds = [homeEmbeds, ...phan_bo_tung_danh_muc()];
              for(const value of b?.values){
                switch (value.toLowerCase()){
                  case "Trang chủ": index = 0; break;
                  case "economy": index = 1; break;
                  case "developer": index = 2; break;
                  case "filter": index = 3; break;
                  case "game": index = 4; break;
                  case "giveaway": index = 5; break;
                  case "image": index = 6; break;
                  case "information": index = 7; break;
                  case "moderation": index = 8; break;
                  case "music": index = 9; break;
                  case "ranking": index = 10; break;
                  case "settings": index = 11; break;
                  case "utility": index = 12; break;
                  case "voice": index = 13; break;
                  case "voicesetup": index = 14; break;
                }
                vembeds.push(theembeds[index])
              }
              b?.reply({
                embeds: vembeds,
                ephemeral: true
              });
            }
          }catch (e){
            console.log(e.stack ? String(e.stack).grey : String(e).grey)
            console.log(String(e).italic.italic.grey.dim)
          }
        });
        collector.on('end', collected => {
          let d_buttonRow = new ActionRowBuilder().addComponents([button_back.setDisabled(true),button_home.setDisabled(true), button_forward.setDisabled(true), button_tutorial])
          const alldisabledbuttons = [d_buttonRow]
          if(!edited){
            edited = true;
            helpmsg.edit({content: `${client.i18n.get(language, "includes", "hetthoigian", { prefix: prefix })}!`, embeds: [helpmsg.embeds[0]], components: alldisabledbuttons}).catch((e)=>{})
          }
        });
        }        
    } catch (e) {
      console.log(String(e.stack))
      return message.reply({embeds: [new EmbedBuilder()
        .setColor(database.colors.vang)
        .setTitle(`${client.i18n.get(language, "moderation", "sayraloi")}`)
        .setDescription(`${e}`)
      ]});
    };
  },
}; 