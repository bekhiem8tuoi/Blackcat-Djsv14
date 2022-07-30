const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, version } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
const moibot = require("../../Modules/Json/invite.json");
let cpuStat = require("../../Modules/functions");
const Distube = require("distube");
let os = require("os");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "xem thông tin của bot", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: false, //: tắt // true : bật
    category:"Information", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
       try {
            cpuStat.usagePercent(function (e, percent, seconds) {
                try {
                    if (e) return console.log(String(e.stack).red);
                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                    const botinfo = new EmbedBuilder()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`})
                        .setTitle(`${client.i18n.get(language, "includes", "solieuthongke")}`)
                        .setColor(database.colors.vang)
                        .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
                        .addFields([
                          { name: `${client.i18n.get(language, "includes", "sdbonho")}`, value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\`` },
                          { name: `${client.i18n.get(language, "includes", "timehoatdong")}`, value: `${duration(client.uptime).map(i=>`\`${i}\``).join(", ")}` },
                          { name: `${client.i18n.get(language, "includes", "nguoidungz")}`, value: `${client.i18n.get(language, "includes", "toanbonguoidung", { tongsothanhvien: client.users.cache.size })}` },
                          { name: `${client.i18n.get(language, "includes", "allmaychu")}`, value: `${client.i18n.get(language, "includes", "tongsomaychu", { tongsomaychu2: client.guilds.cache.size })}` },
                          { name: `${client.i18n.get(language, "includes", "kenhvoice")}`, value: `\`${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\`` },
                          { name: `${client.i18n.get(language, "includes", "ketnoi")}`, value: `${connectedchannelsamount} ${client.i18n.get(language, "includes", "ketnoi")}` },
                          { name: `👾 Discord.js`, value: `\`v${version}\`` },
                          { name: `🎶 Distube`, value: `\`v${Distube.version}\`` },
                          { name: `⚖️ Node`, value: `\`${process.version}\`` },
                          { name: `⚖️ CPU`, value: `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\`` },
                          { name: `${client.i18n.get(language, "includes", "use_cpu")}`, value: `\`${percent.toFixed(2)}%\`` },
                          { name: `${client.i18n.get(language, "includes", "vom")}`, value: `\`${os.arch()}\`` },
                          { name: `${client.i18n.get(language, "includes", "nentang")}`, value: `\`\`\`${os.platform()}\`\`\`` },
                          { name: `${client.i18n.get(language, "includes", "dotreapi")}`, value: `\`${client.ws.ping}ms\`` },
                        ])
                        const button = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                            .setLabel(`${client.i18n.get(language, "handlers", "vao_discord")}`)
                            .setEmoji('880842478855536681')
                            .setStyle("Link")
                            .setURL(`${moibot.discord}`),
                            new ButtonBuilder()
                            .setLabel(`${client.i18n.get(language, "handlers", "moi_bot")}`)
                            .setEmoji('854047747547988080') 
                            .setStyle("Link")
                            .setURL(`${moibot.musicbot}`),
                            new ButtonBuilder()
                            .setLabel("Facebook")
                            .setEmoji('880834017593790474') 
                            .setStyle("Link")
                            .setURL(`${moibot.facebook}`)
                        ) 
                   message.reply({ embeds: [botinfo], components: [button] });
                 } catch (e) {
                    console.log(e)
                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                    const botinfo = new EmbedBuilder()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}`})
                        .setTitle(`${client.i18n.get(language, "includes", "solieuthongke")}`)
                        .setColor(database.colors.vang)
                        .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
                        .addFields([
                          { name: `${client.i18n.get(language, "includes", "sdbonho")}`, value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\`` },
                          { name: `${client.i18n.get(language, "includes", "timehoatdong")}`, value: `${duration(client.uptime).map(i=>`\`${i}\``).join(", ")}` },
                          { name: `${client.i18n.get(language, "includes", "nguoidungz")}`, value: `${client.i18n.get(language, "includes", "toanbonguoidung", { tongsothanhvien: client.users.cache.size })}` },
                          { name: `${client.i18n.get(language, "includes", "allmaychu")}`, value: `${client.i18n.get(language, "includes", "tongsomaychu", { tongsomaychu2: client.guilds.cache.size })}` },
                          { name: `${client.i18n.get(language, "includes", "kenhvoice")}`, value: `\`${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\`` },
                          { name: `${client.i18n.get(language, "includes", "ketnoi")}`, value: `${connectedchannelsamount} ${client.i18n.get(language, "includes", "ketnoi")}` },
                          { name: `👾 Discord.js`, value: `\`v${version}\`` },
                          { name: `🎶 Distube`, value: `\`v${Distube.version}\`` },
                          { name: `⚖️ Node`, value: `\`${process.version}\`` },
                          { name: `⚖️ CPU`, value: `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\`` },
                          { name: `${client.i18n.get(language, "includes", "use_cpu")}`, value: `\`${percent.toFixed(2)}%\`` },
                          { name: `${client.i18n.get(language, "includes", "vom")}`, value: `\`${os.arch()}\`` },
                          { name: `${client.i18n.get(language, "includes", "nentang")}`, value: `\`\`\`${os.platform()}\`\`\`` },
                          { name: `${client.i18n.get(language, "includes", "dotreapi")}`, value: `\`${client.ws.ping}ms\`` },
                        ])
                    message.reply({ embeds: [botinfo]});                   
                }
            })
            function duration(duration, useMilli = false) {
                let remain = duration;
                let days = Math.floor(remain / (1000 * 60 * 60 * 24));
                remain = remain % (1000 * 60 * 60 * 24);
                let hours = Math.floor(remain / (1000 * 60 * 60));
                remain = remain % (1000 * 60 * 60);
                let minutes = Math.floor(remain / (1000 * 60));
                remain = remain % (1000 * 60);
                let seconds = Math.floor(remain / (1000));
                remain = remain % (1000);
                let milliseconds = remain;
                let time = {
                    days,
                    hours,
                    minutes,
                    seconds,
                    milliseconds
                };
                let parts = []
                if (time.days) {
                    let ret = time.days + `${client.i18n.get(language, "includes", "time_ngay")}`
                    if (time.days !== 1) {
                        ret += ''
                    }
                    parts.push(ret)
                }
                if (time.hours) {
                    let ret = time.hours + `${client.i18n.get(language, "includes", "time_gio")}`
                    if (time.hours !== 1) {
                        ret += ''
                    }
                    parts.push(ret)
                }
                if (time.minutes) {
                    let ret = time.minutes + `${client.i18n.get(language, "includes", "time_phut")}`
                    if (time.minutes !== 1) {
                        ret += ''
                    }
                    parts.push(ret)

                }
                if (time.seconds) {
                    let ret = time.seconds + `${client.i18n.get(language, "includes", "time_giay")}`
                    if (time.seconds !== 1) {
                        ret += ''
                    }
                    parts.push(ret)
                }
                if (useMilli && time.milliseconds) {
                    let ret = time.milliseconds + `${client.i18n.get(language, "includes", "time_miligiay")}`
                    parts.push(ret)
                }
                if (parts.length === 0) {
                    return ['instantly']
                } else {
                    return parts
                }
            }
            return;
        } catch (e) {
            console.log(String(e.stack))
        };
    },
};