const Discord = require('discord.js')
const lyricsFinder = require('lyrics-finder');
exports.run = async(client, message, args) => {
    (async function(artist, title) {
        let lyrics = await lyricsFinder(artist, title) || "Lütfen Şarkının Adını Doğru Bir Şekilde Yazın! Daha Kapsamlı Arama İçin Sanatçının Adını Girebilirsiniz.";
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`${args.slice(0).join(" ")} Şarkı Sözleri`)
        .setDescription(lyrics)
        .setColor('#4285f4'));
        if(lyrics.length > 2000) return message.channel.send('Yazdığınız Şarkının Sözleri 2000 Karakterden Fazla Olduğu İçin Gönderemedim :(')
    })(args.slice(0).join(" "));
    }

exports.conf = {
enabled: false,
guildOnly: false,
aliases: ['lyrics'], 
permLevel: 0
};
exports.help = {
name: 'şarkısözü',
description: 'Girdiğiniz şarkının sözlerini atar',
usage: 'şarkısözü'
};