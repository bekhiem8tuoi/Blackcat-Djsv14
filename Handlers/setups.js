module.exports = (client) => {
    const Blackcat_Money = require("../Modules/Includes/commands/economy");
    const mongoose = require("mongoose");
    const cs = new Blackcat_Money;
    cs.setMongoURL(process.env.mongourl || mongourl);
    mongoose.connection.on("connected", () => {
          console.log("Mongoose đã kết nối thành công!".red);
    });
    mongoose.connection.on("err", err => {
          console.error(`Lỗi kết nối Mongoose: \n${err.stack}`.red);
    });
    mongoose.connection.on("disconnected", () => {
          console.warn("Kết nối Mongoose khoing thành công".green);
    });
    mongoose.set('useCreateIndex', true);

    Blackcat_Money.cs.on('debug', (debug, error) => {
        console.log(debug);
        if (error) console.error(error);
    })
    .on('userFetch', (user, functionName) => {
        console.log(`( ${functionName} ) Người dùng đã tìm nạp:  ${client.users.cache.get(user.userID).tag}`);
    })
    .on('userUpdate', (oldData, newData) => {
        console.log('Người dùng cập nhật: ' + client.users.cache.get(newData.userID).tag);
    })

    cs.setDefaultBankAmount(1000);
    cs.setDefaultWalletAmount(1000);
    cs.setMaxBankAmount(100000000000);
    cs.setMaxWalletAmount(1000);
    client.cs = new Blackcat_Money;
};  