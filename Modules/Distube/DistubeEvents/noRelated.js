module.exports = (client) => {
    client.distube.on("noRelated", (queue) => {
       queue.textChannel.send({
         content:"Không thể tìm thấy video, nhạc liên quan để phát."
       }).then(msg => {
          setTimeout(() => { 
            msg.delete();
          }, 10000);
      });
    });
};