const Discord = require('discord.js');
var Jimp = require('jimp');

exports.run = async (client, message, args) => {

  var user = message.mentions.users.first() || message.author;
      message.channel.startTyping();
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        Jimp.read(user.displayAvatarURL({format: "png"}), (err, image) => {
            image.resize(200, 200)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://img2.pngindir.com/20171128/abb/usa-frame-png-clipart-5a1d41d27295f1.9382702615118668344694.jpg", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.MessageAttachment(`./img/wasted/${client.user.id}-${user.id}.png`));
                }, 1000);
          message.channel.stopTyping();
            });
        });
 
}

exports.conf = {
    enabled: true,
    guildOnly: true,
aliases:[],
    permLevel: 0
}

exports.help = {
name: 'amerika',     
description: 'Etiketlediğinin Kişinin Fotoğrafına Wasted Efekti Uygular',     
usage: "wasted @kullanıcı",
}
