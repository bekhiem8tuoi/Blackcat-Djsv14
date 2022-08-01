const ascii = require('../Modules/Includes/commands/cmds_log');
const { GiveawaysManager } = require("discord-giveaways");
const database = require("../Modules/Json/database.json");
const { EmbedBuilder } = require("discord.js")
const database = require("../Modules/Json/database.json");
let table = new ascii('BlackCat - commands');
table.setHeading("Tên file", "Tình trạng");
const { readdirSync } = require("fs");
module.exports = (client) => {
    try{ 
        client.on("ready", () => {
          require("./setups")(client);
          require("../Modules/language")(client);
          require("../Modules/Databases/Enmap/enmap")(client);
        });
        readdirSync("./Commands/").forEach(dir => {
            const commands = readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith(".js"));
            for (let file of commands) {
                let pull = require(`../Commands/${dir}/${file}`);
                if (pull.name) {
                    client.commands.set(pull.name, pull);
                    table.addRow(file, '✔ => Sẵn sàng');
                } else {
                    table.addRow(file, '❌ => thiếu help name');
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
            }
        });
        console.log(table.toString().blue);
    } catch(err){
        console.log(err);
    };
    /**
     **  Giveaway create
    **/
    const mongoose = require('mongoose');
    const giveaways = new mongoose.Schema({
        messageId: String,
        channelId: String,
        guildId: String,
        startAt: Number,
        endAt: Number,
        ended: Boolean,
        winnerCount: Number,
        prize: String,
        messages: {
            giveaway: String,
            giveawayEnded: String,
            title: String,
            inviteToParticipate: String,
            drawing: String,
            dropMessage: String,
            winMessage: mongoose.Mixed,
            embedFooter: mongoose.Mixed,
            noWinner: String,
            winners: String,
            endedAt: String,
            hostedBy: String
        },
        thumbnail: String,
        image: String,
        hostedBy: String,
        winnerIds: { type: [String], default: undefined },
        reaction: mongoose.Mixed,
        botsCanWin: Boolean,
        embedColor: mongoose.Mixed,
        embedColorEnd: mongoose.Mixed,
        exemptPermissions: { type: [], default: undefined },
        exemptMembers: String,
        bonusEntries: String,
        extraData: mongoose.Mixed,
        lastChance: {
            enabled: Boolean,
            content: String,
            threshold: Number,
            embedColor: mongoose.Mixed
        },
        pauseOptions: {
            isPaused: Boolean,
            content: String,
            unPauseAfter: Number,
            embedColor: mongoose.Mixed,
            durationAfterPause: Number,
            infiniteDurationText: String
        },
        isDrop: Boolean,
        allowedMentions: {
            parse: { type: [String], default: undefined },
            users: { type: [String], default: undefined },
            roles: { type: [String], default: undefined }
        }
    },{
      id: false
    });
    const giveawayModel = mongoose.model('giveaways', giveaways);
    const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
        async getAllGiveaways() {
           return await giveawayModel.find().lean().exec();
        }
        async saveGiveaway(messageId, giveawayData) {
           await giveawayModel.create(giveawayData);
           return true;
        }
        async editGiveaway(messageId, giveawayData) {
           await giveawayModel.updateOne({ messageId }, giveawayData).exec();
          return true;
        }
        async deleteGiveaway(messageId) {
           await giveawayModel.deleteOne({ messageId }).exec();
         return true;
        }
    };
    client.giveawaysManager = new GiveawayManagerWithOwnDatabase(client, {
       default: {
         botsCanWin: false,
         embedColor: database.colors.vang,
         reaction: "🎉",
       },
    });
    client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
        winners.forEach((member) => {
           member.send({ embeds: [new EmbedBuilder()
               .setTitle(`${client.i18n.get(client.language, "moderation", "give_47")}`)
               .setColor(database.colors.vang)
               .setDescription(`${client.i18n.get(client.language, "moderation", "give_48", {
                 give_481: member.user,
                 give_482: giveaway.guildId,
                 give_483: giveaway.channelId,
                 give_484: giveaway.messageId,
                 give_485: giveaway.prize
               })}`)
               .setFooter({ text: `${database.name}`, iconURL: `${database.avatar}`})
               .setTimestamp()
          ]}).catch(e => {});
        });
    });
    client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
          console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageId} (${reaction.emoji.name})`);
    });
};
