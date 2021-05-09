
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  
let replies = ["https://cdn.weeb.sh/images/r11uGvEsb.png",
  "https://cdn.weeb.sh/images/HywVbPNib.png",
  "https://cdn.weeb.sh/images/B1fpjEon-.png",
  "https://cdn.weeb.sh/images/r1uuzPVjb.png",
  "https://cdn.weeb.sh/images/B1mVgB4Yf.png",
  "https://cdn.weeb.sh/images/ryCjX13qz.gif",
  "https://cdn.weeb.sh/images/rktcMPVjW.png",
  "https://cdn.weeb.sh/images/BkhMWvVsb.png",
  "https://cdn.weeb.sh/images/SJr2Mv4jW.jpeg",
  "https://cdn.weeb.sh/images/rkcFzv4ib.png",
  "https://cdn.weeb.sh/images/SJzKzv4oW.png",
  "https://cdn.weeb.sh/images/HJ__MinRZ.jpeg",
  "https://cdn.weeb.sh/images/BJ3V-PEob.png",
  "https://cdn.weeb.sh/images/ryKLMPEj-.png",
               "https://cdn.weeb.sh/images/rkWPGvNsZ.png",
               "https://cdn.weeb.sh/images/BJtjMwVs-.gif",
               "https://cdn.weeb.sh/images/B1QGZDEo-.png",
               "https://cdn.weeb.sh/images/rkwHqNxdG.png",
               "https://cdn.weeb.sh/images/BkGcKzJUG.png",
               "https://cdn.weeb.sh/images/BJ6NJlqJG.png"
              ]
    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new Discord.MessageEmbed()
        .setTitle("Discord Meme:")
        .setColor("PURPLE")
        .setFooter(`${message.author.username} `, message.author.avatarURL)
        .setImage(replies[result]);

    message.channel.send(gifembed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['vine'],
    permLevel: 0
};

exports.help = {
    name: 'discordmeme',
    description: 'Rastgele komik paylaşımlar atar.',
    usage: 'kp'
};