const Discord = require('discord.js');
 const { Client, MessageEmbed } = require('discord.js');



exports.run = (client, message, args) => {
  message.delete();
const mesaj = args.slice(0).join(' '); 

  if(!mesaj) return message.channel.send(`Mesajınızı Yazın`)
        const embed = new MessageEmbed()
  .setTitle(message.author.tag+" Duyurdu")
.setColor("RANDOM")

        .setDescription("mesaj");
message.channel.send("@everyone");
message.channel.send(embed);
  
         
message.delete();
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5,
};

exports.help = {
  name: 'duyuru',
  description: '',
  usage: 'duyuru <mesaj>'
};  
