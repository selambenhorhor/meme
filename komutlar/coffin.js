const Discord = require('discord.js')

exports.run = (client, message, args) => {
  if ( message.react(':flag_tr:')) {
      var gif = [
      'https://media.tenor.com/images/a406d4c835aa1c31dcb45105975575ac/tenor.gif', 'https://media.giphy.com/media/ggF7lWJROMXcfgXDox/giphy.gif', 'https://media.tenor.com/images/7d91ed9a7280b838b40bba2602922fdb/tenor.gif', 'https://media0.giphy.com/media/dX3JH7ry1aJMW5yYAC/giphy.gif'];

      var gifler = gif[Math.floor(Math.random() * gif.length)];
  }
  let kullanıcı = message.mentions.members.first() || message.member;
    if (message.react(':flag_tr:')) {
    const op = new Discord.MessageEmbed()
    .setDescription(`**${kullanıcı} öldü!**`)
    .setColor('RANDOM')
    .setImage(gifler)
    .setFooter(`COFFİN DANCE SJSJ`)
    return message.channel.send(op)
    }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['coffin'],
  permLevel: 0
};

exports.help = {
  name: 'coffindance',
  description: 'Coffindance gifi gönderir.',
  usage: 'coffindance'
};