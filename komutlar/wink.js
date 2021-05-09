const Discord = require('discord.js');
const config = require('../ayarlar.json');
const superagent = require('superagent');

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gözkırp'],
  permLevel: 0
};

exports.help = {
  name: "wink",
  description: "5 dakika sonra efekti",
  usage: "afewlater"
};

    
  
exports.run = async (client, message, args) => { 
        let { body } = await superagent.get(`https://some-random-api.ml/animu/wink`);
        const embed = new Discord.MessageEmbed()
          .setColor(config.embedcolor)
          .setTitle("Here's your Wink 😉 ")
          .setImage(body.link)
          .setTimestamp()
          .setFooter(`© horhorik`);
        message.channel.send(embed);
    }