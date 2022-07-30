const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const name = require("../../Modules/Includes/commands/path");
module.exports = {
    name: name.parse(__filename).name,
    usage: `${name.parse(__filename).name}`,
    aliases: ["", ""], // lệnh phụ
    description: "", // mô tả lệnh
    userPerms: [], // Administrator, ....
    owner: true, //: tắt // true : bật
    category:"", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, prefix, database, emoji, language) => {
       let user = await client.cs.balance({ 
             user: message.author.id,
             guild: { 
              id : null
            },
       });
       const euro = new EmbedBuilder()
            .setColor(database.colors.vang)
            .setTimestamp()
            .setDescription(`${client.i18n.get(language, "game", "scratch_0", { scratch_prefix: prefix })}`)
        let moneyEarned = parseInt(args[0]);
        if (moneyEarned > user.wallet) return message.reply({ embeds: [euro.setDescription(`${client.i18n.get(language, "game", "khongdutien")}`)]});
        if (!moneyEarned) return message.reply({ embeds: [euro] })
        if (moneyEarned < 10) return message.reply({ embeds: [euro.setDescription(`${client.i18n.get(language, "game", "nhohon1k")}`)]});
        if (moneyEarned > 30000) return message.reply({ embeds: [euro.setDescription(`${client.i18n.get(language, "game", "nhohon30k")}`)]});
        if (isNaN(args[0])) return message.reply({ embeds: [euro.setDescription(`${client.i18n.get(language, "game", "chidinhsohople")}`)]});
        const money = moneyEarned;
        let result = await client.cs.removeMoney({
                user: message.author.id,
                guild: { id: null },
                amount: money,
        });
        let clicks = 3;
        let options = {
            ic: '💵',
            jc: '🧧'
        };

        let positions = [{
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r1',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a1',
                    type: 2,
                }
            },{
                r: {
                    label: `-`,
                    style: 'DANGER',
                    custom_id: 'r2',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a2',
                    type: 2,
                }
            },{
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r3',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a3',
                    type: 2,
                }
            },{
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r4',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a4',
                    type: 2,
                }
            },{
                r: {
                    label: `${options.jc}`,
                    style: 'PRIMARY',
                    custom_id: 'r5',
                    disabled: true,
                    type: 2,
                },
                a: {
                    label: `-`, //
                    style: 'SECONDARY',
                    custom_id: 'a5',
                    type: 2,
                }
            },{
                r: {
                    label: `-`,
                    style: 'DANGER',
                    custom_id: 'r6',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a6',
                    type: 2,
                }
            },{
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r7',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a7',
                    type: 2,
                }
            },{
                r: {
                    label: `-`,
                    style: 'DANGER',
                    custom_id: 'r8',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a8',
                    type: 2,
                }
            },{
                r: {
                    label: `-`,
                    style: 'DANGER',
                    custom_id: 'r9',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a9',
                    type: 2,
                },
            },{
                r: {
                    label: `-`,
                    style: 'DANGER',
                    custom_id: 'r10',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a10',
                    type: 2,
                },
            },{
                r: {
                    label: `-`,
                    style: 'DANGER',
                    custom_id: 'r11',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a11',
                    type: 2,
                },
            },{
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r12',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a12',
                    type: 2,
                },
            },{
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r13',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a13',
                    type: 2,
                }
            },{
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r14',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a14',
                    type: 2,
                }
            },{
                r: {
                    emoji: `${options.ic}`,
                    style: 'SUCCESS',
                    custom_id: 'r15',
                    disabled: true,
                    type: 2,

                },
                a: {
                    label: `-`,
                    style: 'SECONDARY',
                    custom_id: 'a15',
                    type: 2,
                }
            }];
        
        function shuffle(array) {
            let currentIndex = array.length, randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }
            return array;
        }
        positions = shuffle(positions);
        let row1 = new ActionRowBuilder()
            .addComponents(positions[0].a, positions[1].a, positions[2].a)
        let row2 = new ActionRowBuilder()
            .addComponents(positions[3].a, positions[4].a, positions[5].a)
        let row3 = new ActionRowBuilder()
            .addComponents(positions[6].a, positions[7].a, positions[8].a)
        let row4 = new ActionRowBuilder()
            .addComponents(positions[9].a, positions[10].a, positions[11].a)
        let row5 = new ActionRowBuilder()
            .addComponents(positions[12].a, positions[13].a, positions[14].a)
        let embed = new EmbedBuilder()
            .setColor(database.colors.vang)
            .setTimestamp()
            .setTitle(`${client.i18n.get(language, "game", "scratch_00", { scratch_thanhvien: message.author.username })}`)
            .setDescription(`${client.i18n.get(language, "game", "scratch_1", {
              scratch_tiencuoc: moneyEarned.toLocaleString(),
              scratch_clicks: clicks
            })}`)
      
        let allbuton = [ row1, row2, row3, row4, row5 ];      
        let vecao = await message.reply({ embeds: [embed], components: allbuton }).catch(e=>{ console.log("Lỗi: " + e)});
        const filter = i => i.user.id === message.author.id;
        let collector = vecao.createMessageComponentCollector({ filter, time: 120000, max: 3 });
        collector.on('collect', async (i) => {
            if (!i.isButton()) return;
            i.deferUpdate();
            let used = positions.find(x => x.a.custom_id === i.customId);
            if (used.r.style === 'DANGER') {
                let moneylost = moneyEarned * 0.25
                moneyEarned -= Math.trunc(moneylost)
                clicks -= 1;
            } else if (used.r.style === 'SUCCESS') {
                let moneywon = moneyEarned * 0.09
                moneyEarned += Math.trunc(moneywon)
                clicks -= 1;
            } else if (used.r.style === 'PRIMARY') {
                let moneyjackpot = moneyEarned * 8.99
                moneyEarned += moneyjackpot 
                clicks -= 1;
            }
            used.a = used.r;
            let row1 = new ActionRowBuilder()
                .addComponents(positions[0].a, positions[1].a, positions[2].a)
            row2 = new ActionRowBuilder()
                .addComponents(positions[3].a, positions[4].a, positions[5].a)
            row3 = new ActionRowBuilder()
                .addComponents(positions[6].a, positions[7].a, positions[8].a)
            row4 = new ActionRowBuilder()
                .addComponents(positions[9].a, positions[10].a, positions[11].a)
            row5 = new ActionRowBuilder()
                .addComponents(positions[12].a, positions[13].a, positions[14].a)
            embed = new EmbedBuilder()
                .setColor('RANDOM')
                .setTitle(`${client.i18n.get(language, "game", "scratch_00", { scratch_thanhvien: message.author.username })}`)
                .setTimestamp()
                .setDescription(`${client.i18n.get(language, "game", "scratch_2", {
                  scratch_tienthang: moneyEarned.toLocaleString(),
                  scratch_clicks2: clicks
                })}`)
            msg.edit({ embeds: [embed], components: [row1, row2, row3, row4, row5] })
        })
        collector.on('end', async (end) => {
            positions.forEach((g) => {
                g.a = g.r
                row1 = new ActionRowBuilder()
                    .addComponents(positions[0].a, positions[1].a, positions[2].a)
                row2 = new ActionRowBuilder()
                    .addComponents(positions[3].a, positions[4].a, positions[5].a)
                row3 = new ActionRowBuilder()
                    .addComponents(positions[6].a, positions[7].a, positions[8].a)
                row4 = new ActionRowBuilder()
                    .addComponents(positions[9].a, positions[10].a, positions[11].a)
                row5 = new ActionRowBuilder()
                    .addComponents(positions[12].a, positions[13].a, positions[14].a)
            })
            const moneyEarnedd = (`${Math.trunc(moneyEarned)}`);
            const money = moneyEarnedd;
            await client.cs.addMoney({
            user: message.author.id,
            guild: { id: null },
            amount: money,
            });
            embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "game", "scratch_3", {
                  scratch_caoduoc: moneyEarned.toLocaleString(),
                  scratch_tiennhanduoc: await client.cs.format(money)
                })}`)
                .setColor(database.colors.vang)
                .setTitle(`${client.i18n.get(language, "game", "scratch_00", { scratch_thanhvien: message.author.username })}`)
                .setTimestamp()
            msg.edit({ embeds: [embed], components: [row1, row2, row3, row4, row5] })
        });
    },
};