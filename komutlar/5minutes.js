const Discord = require('discord.js');
const config = require('../ayarlar.json');
const superagent = require('superagent')


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["neko"],
  permLevel: 0
};

exports.help = {
  name: "neko"
};

exports.run = async (client, message, args) => {
       
  
        superagent.get('https://shiro.gg/api/images/neko')
        .end((err, response) => {
      const embed = new Discord.MessageEmbed()
      .setTitle("Here's your Neko")
      .setImage(response.body.url)
      .setColor(config.embedcolor)
      .setTimestamp()
      .setFooter(`© HORHORİK `)
      .setURL(response.body.url);
  message.channel.send(embed);
    }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
            }}));
}