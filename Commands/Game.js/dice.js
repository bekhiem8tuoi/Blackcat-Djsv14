const diceUtils = require("../../Modules/Includes/commands/taixiu");
const { wait } = require("../../Modules/functions");
const name = require("../../Modules/Includes/commands/path");
const { roll } = diceUtils;
module.exports = {
    name: name.parse(__filename).name,
    usage: "",
    category: "Game",
    aliases: ["dice", "tx"],
    description: "Chơi game tài xỉu vui nhộn",
    run: async(client, message, args, prefix, superbot, database, emoji) => {
      /*
      const random = require("../../includes/suports/random/random");
        const taixiu = [
          "<:taixiu1:929000081435279380>",
          "<:taixiu2:929000191229591563>",
          "<:taixiu3:929000260150378577>",
          "<:taixiu4:929000630306099240>",
          "<:taixiu5:929000711801434183>",
          "<:taixiu6:929000801391747092>"
        ]
          const emo = '<a:taixiu:928992087276396576>'
          let r1 = await random(0, taixiu.length-1)
          let r2 = await random(0, taixiu.length-1)
          let r3 = await random(0, taixiu.length-1)
          const i1 = taixiu[r1]
          const i2 = taixiu[r2]
          const i3 = taixiu[r3]
          const diem = (r1 + 1) + (r2 + 1) + (r3 + 1) 
          const message1 = await message.channel.send(`**Đang lắc tài xỉu**`)
          const msg = await message.channel.send(` ${emo}  ${emo}  ${emo}`)
          await wait(2000)
          await msg.edit(` ${i1}  ${emo}  ${emo}`)
          await wait(2000)
          await msg.edit(` ${i1}  ${i2}  ${emo}`)
          await wait(2000)
          await msg.edit(` ${i1}  ${i2}  ${i3}`)
          let taixiuu
          if(diem >= 1 && diem <=10) {
            taixiuu = "Xỉu"
          } else if (diem > 10 && diem <= 18) {
            taixiuu = "Tài"
          }
          let chanle = diem%2 == 0 ? "Chẵn" : "Lẻ"
           await message1.edit(`Bạn đã lắc được: **${diem} điểm • ${chanle} • ${taixiuu}**`)
     */
    const dice = roll('3d6');
    const result = dice.results;
    const total = dice.total;
  
    const emo = '<a:taixiu:928992087276396576>'

    const map = {
      '1': '<:taixiu1:929000081435279380>',
      '2': '<:taixiu2:929000191229591563>',
      '3': '<:taixiu3:929000260150378577>',
      '4': '<:taixiu4:929000630306099240>',
      '5': '<:taixiu5:929000711801434183>',
      '6': '<:taixiu6:929000801391747092>'
      };

    
    const message1 = await message.reply({ content: `**Bỏ cái tay bỏ cái tay để mở bát nào...**`})
     
    if (result[0] == result[1] == result[2], total == 3, total == 18) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)       
    message.channel.send({ content: `**__Kết Quả :__\n${total}**`})  
    }
    if (total == 18) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)   
    message.channel.send(`**__Kết Quả :__\n${total} • Chẵn • Tài**`)
    }
    if (total == 3) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)         
    message.channel.send(`**__Kết Quả :__\n${total} • Lẻ • Xỉu**`)
    }
    if (total <= 4) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)   
    message.channel.send(`**__Kết Quả :__\n${total} • Chẵn • Xỉu**`)   
    }
    if (total == 5) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)      
    message.channel.send(`**__Kết Quả :__\n${total} • Lẻ • Xỉu**`)
    }
    if (total == 6) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)        
    message.channel.send(`**__Kết Quả :__\n${total} • Chẵn • Xỉu**`)
    }
    if (total == 7) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)      
    message.channel.send(`**__Kết Quả :__\n${total} • Lẻ • Xỉu**`)
    }
    if (total == 8) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)         
    message.channel.send(`**__Kết Quả :__\n${total} • Chẵn • Xỉu**`)
    }
    if (total == 9) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)
            
    message.channel.send(`**__Kết Quả :__\n${total} • Lẻ • Xỉu**`)
    }
    if (total == 10) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)    
    message.channel.send(`**__Kết Quả :__\n${total} • Chẵn • Xỉu**`)
    }
    if (total == 11) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)       
    message.channel.send(`**__Kết Quả :__\n${total} • Lẻ • Tài**`)
    }
    if (total == 12) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`) 
    message.channel.send(`**__Kết Quả :__\n${total} • Chẵn • Tài**`)
    }
    if (total == 13) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)       
    message.channel.send(`**__Kết Quả :__\n${total} • Lẻ • Tài**`)
    }
    if (total == 14) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)       
    message.channel.send(`**__Kết Quả :__\n${total} • Chẵn • Tài**`)
    }
    if (total == 15) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)            
    message.channel.send(`**__Kết Quả :__\n${total} • Lẻ • Tài**`)
    }
    if (total == 16) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)      
    message.channel.send(`**__Kết Quả :__\n${total} • Chẵn • Tài**`)
    }
    if (total == 17) {
    let msg = await message.reply({ content: ` ${emo}  ${emo}  ${emo}`})
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${emo} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${emo}`)
    await wait(2000)
    await msg.edit(` ${map[result[0]]} ${map[result[1]]} ${map[result[2]]}`)    
    message.channel.send(`**__Kết Quả :__\n${total} • Lẻ • Tài**`)
    }
  }
};