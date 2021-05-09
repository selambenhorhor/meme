const Discord = require("discord.js");
const client = new Discord.Client();
exports.run = (client, message, args) => {
  if ( message.react('😣')) {
      var gif = [

      "https://media.giphy.com/media/shVJpcnY5MZVK/giphy.gif",
      "https://media.giphy.com/media/TRgyI2f0hRHBS/giphy.gif",
      "https://media.giphy.com/media/o8nHLRBIS2vcc/giphy.gif",
      "https://media.giphy.com/media/TRgyI2f0hRHBS/giphy.gif",
      "https://media.giphy.com/media/shVJpcnY5MZVK/giphy.gif",
      "https://media.giphy.coam/media/Xqlsn2kLPBquI/giphy.gif",
      "https://media.giphy.com/media/1hMJTkDXPTBiU/giphy.gif",
      "https://media.giphy.com/media/on9LDLF5JskaQ/giphy.gif",
      "https://media.giphy.com/media/kUYWowJqB78jK/giphy.gif",
      "https://media.giphy.com/media/VkJ7okLnPBTy0/giphy.gif",
      "https://media.giphy.com/media/RBdwNQim7Y6HK/giphy.gif",
      ]
      var gifler = gif[Math.floor(Math.random() * gif.length)];
  }
  let kullanıcı = message.mentions.members.first() || message.member;
    if (message.react('😯')) {
    const op = new Discord.MessageEmbed()
    .setDescription(`**${kullanıcı} ağlamaaa :<**`)
    .setColor('RANDOM')
    .setImage(gifler)
    .setFooter(`ağla ağla gözün temizlenir`)
    return message.channel.send(op)
    }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ağlasana'],
  permLevel: 0
};

exports.help = {
  name: 'ağla',
  description: 'Coffindance gifi gönderir.',
  usage: 'coffindance'
};