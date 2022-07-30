const emoji = require("../Json/emoji.json")
module.exports.dj_role2 = dj_role2;
module.exports.createBar = createBar;
module.exports.delay = delay;
module.exports.escapeRegex = escapeRegex;

  function dj_role2(client, member, song) {
    if(!client) return false;
    var roleid = client.settings.get(member.guild.id, `djroles`)
    if (String(roleid) == "") return false;
    var isdj = false;
    for (let i = 0; i < roleid.length; i++) {
        if (!member.guild.roles.cache.get(roleid[i])) continue;
        if (member.roles.cache.has(roleid[i])) isdj = true;
    }
    if (!isdj && !member.permissions.has("Administrator") && song.user.id != member.id)
        return roleid.map(i=>`<@&${i}>`).join(", ");
    else
        return false;
  }
  
  function createBar(total, current, size = 25, line = "▬", slider = `${emoji.Hihi}`) {
    try {
      if (!total) throw "BỎ LỠ LẦN TỐI ĐA";
      if (!current) return `**[${slider}${line.repeat(size - 1)}]**`;
      let bar = current > total 
          ? [line.repeat(size / 2 * 2), (current / total) * 100] 
          : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) 
            + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
      if (!String(bar).includes(slider)) {
        return `**[${slider}${line.repeat(size - 1)}]**`;
      } else{
        return `**[${bar[0]}]**`;
      }
    } catch (e) {
      console.log(String(e.stack))
    }
  }

  function delay(delayInms) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    } catch (e) {
      console.log(String(e.stack))
    }
  }

  function escapeRegex(str) {
    try {
      return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
                                          }