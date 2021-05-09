const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const yazi = args.slice(0).join(' '); 

  if(yazi.length < 0) return message.channel.send(`**Yapacağım logonun ismini yazınız...**`).then(message.delete({timeout: 5000}))
  const linqo = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=harry-potter-logo&text=${yazi}`
  .replace(' ', '+') //Gamer Bot

  
 message.channel.send(new Discord.MessageEmbed() .setColor('GREY') .setTitle('Harry Potter Logo Oluşturuldu!') .setImage(linqo) .setFooter(message.author.tag+'Tarafından Kullanıldı.', message.author.displayAvatarURL({dynamic: true})))
}
exports.conf = { //Gamer Bot
    enabled: true,
    guildOnly: false, //Gamer Bot
    aliases: ['harry'],
    permLevel: 0
}

exports.help = {
    name: 'harry',
    description: 'Yazdığınız yazıyı harry potter logoya değiştirir.',
    usage: 'harry'
} 