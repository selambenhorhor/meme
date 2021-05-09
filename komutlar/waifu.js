const Discord = require('discord.js');
const config = require('../ayarlar.json');
const superagent = require('superagent');


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['waifu'],
  permLevel: 0
};

exports.help = {
  name: "waifu",
  description: "5 dakika sonra efekti",
  usage: "afewlater"
};

    
  
exports.run = async (client, message, args) => { 
        try {
            superagent
              .get("https://nekos.life/api/v2/img/waifu")
              .end((err, response) => {
                const embed = new Discord.MessageEmbed()
                .setTitle("Here's your Waifu")
                  .setDescription(message.author.toString())
                  .setImage(response.body.url)
                  .setColor(config.embedcolor)
              .setTimestamp()
                  .setFooter('©HORHORİK');
                message.channel.send(embed);
              })
              .catch(err =>
                message.channel.send({
                  embed: {
                    color: config.embedcolor,
                    description: "Something went wrong... :cry:"
                  }
                })
              );
            }catch(err){
              console.log(err)
            }
    }
