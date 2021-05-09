const Discord = require("discord.js");
const client = new Discord.Client();
exports.run = (client, message, args) => {
  if ( message.react('😨')) {
      var gif = [
      "https://media.giphy.com/media/11HeubLHnQJSAU/giphy.gif",  
          "https://media.giphy.com/media/f5UwtpUbrAEE0/giphy.gif",
          "https://media.giphy.com/media/IveNG2ncVNmmc/giphy.gif",
          "https://media.giphy.com/media/nLJAs215zpyqA/giphy.gif",
          "https://media.giphy.com/media/KmG26GNmdWOUE/giphy.gif",
          "https://media.giphy.com/media/l3fQeGeJ6M3BiVwBi/giphy.gif",
          "https://media.giphy.com/media/c4p59oQhRFE1W/giphy.gif",
          "https://media.giphy.com/media/iqkCNZIzSSXSM/giphy.gif",
          "https://media.giphy.com/media/h3Jxu7a7pd72w/giphy.gif",
          "https://media.giphy.com/media/vxXLJxa2gDaord2eib/giphy.gif",
          "https://media.giphy.com/media/vxXLJxa2gDaord2eib/giphy.gif",
          "https://media.giphy.com/media/XNoeJAKvw5Vja/giphy.gif",
          "https://media.giphy.com/media/So4Yp61bm4pO1wYo1W/giphy.gif",
          "https://media.giphy.com/media/Zaj8ggkt66BfoWsuUj/giphy.gif",
          "https://media.giphy.com/media/yVE9aEo7sIq0o/giphy.gif",
          "https://media.giphy.com/media/1mhlbUDAVlQD4E32ZZ/giphy.gif",
      "https://media.giphy.com/media/l0Iy87qFTu0gDegw0/giphy.gif",
      "https://media.giphy.com/media/GRM7Z2s6AougoR3rvv/giphy.gif",
      "https://media.giphy.com/media/l1J3G5lf06vi58EIE/giphy.gif",
      "https://media.giphy.com/media/3ohc0QQkTH6YK8g4zS/giphy.gif",
      "https://media.giphy.com/media/X0YkzoS6UqVfa/giphy.gif",
      "https://media.giphy.com/media/dg9iAv4yxCD9m/giphy.gif",
      "https://media.giphy.com/media/dg9iAv4yxCD9m/giphy.gif",
      "https://media.giphy.com/media/HIxtxVhs1LRm0/giphy.gif",
      "https://media.giphy.com/media/e37RbTLYjfc1q/giphy.gif",
      "https://media.giphy.com/media/gw3zMXiPDkOyVBsc/giphy.gif",
      "https://media.giphy.com/media/rcRwO8GMSfNV6/giphy.gif",
      ]
      var gifler = gif[Math.floor(Math.random() * gif.length)];
  }
  let kullanıcı = message.mentions.members.first() || message.member;
    if (message.react('😯')) {
    const op = new Discord.MessageEmbed()
    .setDescription(`**${kullanıcı} ayıranı ben döverim olum, aga öyle vurmayacan ya sağdan çak **`)
    .setColor('RANDOM')
    .setImage(gifler)
    .setFooter(`SİKİM SEWGİ WE BARIŞ KAWGA DOVUJ AMUNAKOYE`)
    return message.channel.send(op)
    }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dövüş'],
  permLevel: 0
};

exports.help = {
  name: 'döwüş',
  description: 'Coffindance gifi gönderir.',
  usage: 'coffindance'
};