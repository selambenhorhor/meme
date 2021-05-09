const Discord = require('discord.js');
const narcos = require('canvacord');
exports.run = async(client, message, args) => {
  let mesaj = args[0];
  if (!mesaj) return message.channel.send('Bir Yazı Yazmalısın! Örnek: /cmm HORHORİK')
  let image = await narcos.Canvas.changemymind(mesaj);
  let attachment = new Discord.MessageAttachment(image, "cmm.png");
        return message.channel.send(attachment);
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'cmm'
};