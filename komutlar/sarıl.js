const Discord = require('discord.js');
const config = require('../ayarlar.json');
const superagent = require('superagent');

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["sarıl"],
  permLevel: 0 
};

exports.help = {
  name: 'hug',
  description: 'Tavsiye bildirirsiniz',
  usage: 'öneri <öneriniz>'
};
exports.run = async (client, message, args) => { 
        let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
        const { body } = await superagent
          .get("https://nekos.life/api/v2/img/hug");
              const embed = new Discord.MessageEmbed()
             .setColor(config.embedcolor)
              .setTitle("Here's your Hug, 🤗")
          .setDescription(`${victim} is hugged by ${message.author}`)
          .setImage(body.url)
           .setTimestamp()
          .setFooter(`©HORHORİK`)
      
        message.channel.send(embed);
        
    }
