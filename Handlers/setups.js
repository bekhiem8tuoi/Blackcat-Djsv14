module.exports = (client) => {
    const Blackcat_Money = require("../Modules/Includes/commands/economy");
    const mongoose = require("mongoose");
    const cs = new Blackcat_Money;
    cs.setMongoURL(process.env.mongourl || mongourl);
    /**
     ** Events mongoose xem kết nối có thành công hay là không
    **/
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
  
    /**
     ** Events Economy
    **/
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
  
    /**
     ** Evnets Anti-Spam message 
    **/
  /*
const AntiSpam = require("discord-anti-spam");
const antiSpam = new AntiSpam({
  warnThreshold: 3, // Số lượng tin nhắn được gửi trong một lúc sẽ gây ra cảnh báo.
  muteThreshold: 45, // Số lượng tin nhắn được gửi trong một lúc sẽ mute người dùng
  kickThreshold: 70, // Số lượng tin nhắn được gửi liên tiếp buộc phải kick.
  banThreshold: 7, // Số lượng tin nhắn được gửi trong một lúc sẽ gây ra lệnh cấm.
  maxInterval: 50000, // Khoảng thời gian (tính bằng mili giây) trong đó thư được coi là thư rác.
  warnMessage: "{@user}, Vui lòng ngừng gửi thư rác.", // Tin nhắn sẽ được gửi trong cuộc trò chuyện khi cảnh báo người dùng.
  kickMessage: "**{user_tag}** đã bị kick vì gửi thư rác.", // Tin nhắn sẽ được gửi trong cuộc trò chuyện khi đá người dùng.
  muteMessage: "**{user_tag}** đã bị muted vì gửi thư rác.", // Tin nhắn sẽ được gửi trong cuộc trò chuyện khi muted người dùng.
  banMessage: "**{user_tag}** đã bị cấm vì gửi thư rác.", // Tin nhắn sẽ được gửi trong cuộc trò chuyện khi cấm người dùng.
  maxDuplicatesWarning: 6, // Số lượng tin nhắn trùng lặp kích hoạt cảnh báo.
  maxDuplicatesKick: 10, // Số lượng tin nhắn trùng lặp kích hoạt cảnh báo.
  maxDuplicatesBan: 12, // Số lượng tin nhắn trùng lặp kích hoạt cảnh báo.
  maxDuplicatesMute: 8, // Số lượng tin nhắn trùng lặp khi muted muted.
  ignoredPermissions: ["Administrator"], // Bỏ qua người dùng bằng bất kỳ quyền nào trong số này.
  ignoreBots: true, // Bỏ qua tin nhắn bot.
  verbose: true, // Nhật ký mở rộng từ mô-đun.
  ignoredMembers: [], // Mảng User ID bị bỏ qua.
  unMuteTime:  10, // Khoảng thời gian (tính bằng phút) người dùng sẽ bị ẩn.
  removeMessages: true, // Nếu bot nên xóa tất cả các tin nhắn rác khi thực hiện hành động với người dùng!
  modLogsEnabled: false, // Nếu để bật modlog
  modLogsChannelName: "mod-logs", // kênh để gửi các modlog!
  modLogsMode: "embed",
  // Và nhiều tùy chọn khác ... Xem tài liệu.
});

client.on("messageCreate", (message) => antiSpam.message(message));
*/
};  