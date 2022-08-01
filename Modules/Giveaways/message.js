const database = {
  "everyoneMention": false,
  "hostedBy": true
};
module.exports = {
  giveaway: (database.everyoneMention ? "@everyone\n\n" : "") + "🎉 **GIVEAWAY** 🎉",
  giveawayEnded: (database.everyoneMention ? "@everyone\n\n" : "") + "🎉 **GIVEAWAY ENDED** 🎉",
  drawing: `Kết thúc sau: **{timestamp}**`,
  inviteToParticipate: `Phản ứng với 🎉 để tham gia!`,
  winMessage: "\`Xin chúc mừng bạn:\` {winners}!\n\`Bạn đã thắng:\` **{this.prize}**!",
  embedFooter: "Giveaways",
  noWinner: "\`\`\`\nGiveaway bị hủy, không có người tham gia hợp lệ\n\`\`\`",
  hostedBy: "Tổ chức bởi: {this.hostedBy}",
  winners: "người chiến thắng",
  endedAt: "Đã kết thúc lúc"
};
