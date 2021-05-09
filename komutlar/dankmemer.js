
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  
let replies = ["https://i.redd.it/fgx23lrzf9x61.jpg",
               "https://i.redd.it/1pgi18w236x61.jpg",
               "https://i.redd.it/rzmfu3khh8x61.jpg",
               "https://i.redd.it/v42pbnnffax61.jpg",
               "https://i.redd.it/t3d9dut5t8x61.gif",
               "https://i.redd.it/fl3184cjh7x61.jpg",
               "https://i.redd.it/rjod6b0bs6x61.gif",
               "https://i.redd.it/yalcp8ere9x61.jpg",
               "https://i.redd.it/rk56ymlju7x61.gif",
              "https://i.redd.it/c1dd3y671ax61.png",
               "https://i.redd.it/n6tomuasi5x61.jpg",
               "https://i.redd.it/3vtqb9osq9x61.gif",
               "https://i.redd.it/omerud79aax61.jpg",
               "https://i.redd.it/fc49dgc45ax61.gif",
               "https://i.redd.it/nnghqkp6m6x61.jpg",
               "https://i.redd.it/lwuv2udtg9x61.jpg"
              ]
    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new Discord.MessageEmbed()
        .setTitle("dank Memer:")
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
    name: 'dankmemer',
    description: 'Rastgele komik paylaşımlar atar.',
    usage: 'kp'
};