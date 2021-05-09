const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const config = require('../ayarlar');


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ıq"],
  permLevel: 0
};

exports.help = {
  name: "ıq"
};

exports.run = async (client, message, args) => {
    
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
         try {

    const iq = Math.floor(Math.random() * 226);
    const embed = new MessageEmbed()

    .setTitle(":brain: IQ Test:")
    .setDescription(`:bulb:   ${user}'s  **IQ is:**   \`${iq}\`  `)
    .setColor("FF0000")
    .setThumbnail("https://media.giphy.com/media/l44QzsOLXxcrigdgI/giphy.gif")
    .setTimestamp()
    .setFooter('©horhorik')
    .setColor(config.embedcolor);
    message.channel.send(embed);

        } catch (err) {
    message.channel.send({embed: {
      color: `${config.embedcolor}`,
      description: `${client.emotes.error} Something went wrong...`
    }})
  }
    }