const Discord = require('discord.js');
const config = require('../ayarlar.json');
const superagent = require('superagent');



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["pat"],
  permLevel: 0
};

exports.help = {
  name: "pat"
};

exports.run = async (client, message, args) => {
        let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
        const { body } = await superagent
          .get("https://nekos.life/api/v2/img/pat");
              const embed = new Discord.MessageEmbed()
             .setColor(config.embedcolor)
              .setTitle("Here's your Pat, 👀")
          .setDescription(`${victim} Pats ${message.author}`)
          .setImage(body.url)
           .setTimestamp()
          .setFooter(`© horhorik `)
      
               message.channel.send(embed);
    }
