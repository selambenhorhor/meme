const Discord = require('discord.js');
const superagent = require("superagent");
const config = require('../ayarlar.json');

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "hentai",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk <sebep>"
};

exports.run = async (client, message, args) => {
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send({embed: {
                    color: 16734039,
                    description: "You can use this command in an NSFW Channel!"
                }})
        }
        superagent.get('https://shiro.gg/api/images/nsfw/hentai')
            .end((err, response) => {
          const embed = new Discord.MessageEmbed()
          .setTitle(":smirk: Hentai")
          .setImage(response.body.url)
          .setColor(config.embedcolor)
          .setFooter(`Tags: Hentai`)
          .setURL(response.body.url);
      message.channel.send(embed);
        }).catch((err) => message.channel.send({embed: {
                    color: 16734039,
                    title: "Something went wrong... :cry:"
                }}));
    }