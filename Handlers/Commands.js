const ascii = require('../Modules/Includes/commands/cmds_log');
const { GiveawaysManager } = require("discord-giveaways");
const database = require("../Modules/Json/database.json");
let table = new ascii('BlackCat - commands');
table.setHeading("Tên file", "Tình trạng");
const { readdirSync, readdir } = require("fs");
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
       storage: "./Modules/Json/giveaways.json",
       default: {
         botsCanWin: false,
         embedColor: database.colors.vang,
         reaction: "🎉",
       },
     });
     readdir("./Modules/Giveaways", (_err, files) => {
       files.forEach((file) => {
         if (!file.endsWith(".js")) return;
         const event = require(`../Modules/Giveaways/${file}`);
         let eventName = file.split(".")[0];
         client.giveawaysManager.on(eventName, (...file) => event.execute(...file, client)), delete require.cache[require.resolve(`../Modules/Giveaways/${file}`)];
       });
     });
};
