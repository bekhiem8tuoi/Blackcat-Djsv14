const BlackCat_Database = require("../../Includes/Joshdb/core/index");
const provider = require("../../Includes/Joshdb/mongo/index");
const { mongourl } = require("../../../config.json");
module.exports = (client) => {
     client.settings =  new BlackCat_Database({
         name: "settings",
         provider: provider,
         providerOptions: {
            url: process.env.mongourl || mongourl,
            collection: "settings",
            dbName: client.user.username.replace(" ", ""),
         },
     }); 
  
    client.autoresume = new BlackCat_Database({
        name: "autoresume",
        provider: provider,
        providerOptions: {
            url: process.env.mongourl,
            collection: "autoresume",
            dbName: client.user.username.replace(" ", ""),
       },
   });

   client.infos = new BlackCat_Database({
         name: "infos",
         provider: provider,
         providerOptions: {
            url: process.env.mongourl || mongourl,
            collection: "infos",
            dbName: client.user.username.replace(" ", ""),
         },
    });

    client.jointocreatemap = new BlackCat_Database({
         name: "jointocreatemap",
         provider: provider,
         providerOptions: {
            url: process.env.mongourl || mongourl,
            collection: "jointocreatemap",
            dbName: client.user.username.replace(" ", ""),
         },
    });

    client.reactionrole = new BlackCat_Database({
         name: "reactionrole",
         provider: provider,
         providerOptions: {
            url: process.env.mongourl || mongourl,
            collection: "reactionrole",
            dbName: client.user.username.replace(" ", ""),
         },
    });

    client.cmds1 = new BlackCat_Database({
         name: "cmds1",
         provider: provider,
         providerOptions: {
            url: process.env.mongourl || mongourl,
            collection: "cmds1",
            dbName: client.user.username.replace(" ", ""),
         },
    });
    client.cmds2 = new BlackCat_Database({
         name: "cmds2",
         provider: provider,
         providerOptions: {
            url: process.env.mongourl || mongourl,
            collection: "cmds2",
            dbName: client.user.username.replace(" ", ""),
         },
    });
    client.cmds3 = new BlackCat_Database({
         name: "cmds3",
         provider: provider,
         providerOptions: {
            url: process.env.mongourl || mongourl,
            collection: "cmds3",
            dbName: client.user.username.replace(" ", ""),
         },
    });
    client.jointocreatemap = new BlackCat_Database({
         name: "jointocreatemap",
         provider: provider,
         providerOptions: {
            url: process.env.mongourl || mongourl,
            collection: "jointocreatemap",
            dbName: client.user.username.replace(" ", ""),
         },
    });
};                                      