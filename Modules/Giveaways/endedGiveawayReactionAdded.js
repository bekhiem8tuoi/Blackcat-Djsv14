module.exports = {
  async execute(member, reaction){
     reaction.users.remove(member.user);
     member.send(`**Ôi, hỏng! Có vẻ như giveaway đó đã kết thúc!**`).catch(e => {})
  },
};
