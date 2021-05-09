const Discord = require('discord.js')
//Yuri
exports.run = (bot, message, args) => {
let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return bot.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name} Emojileri:`)
      .setDescription(
        `**Hareketli Emoji Sayısı [${Animated}]**:\n${EmojisAnimated}\n\n**Hareketsiz Emoji Sayısı [${EmojiCount}]**:\n${Emojis}\n\n**Toplam Emoji Sayısı[${OverallEmojis}]**`
      )
      .setColor(0x000000);
    message.channel.send(Embed);
}

exports.conf = {
    aliases: ["emojiler"]
}

exports.help = {
    name: 'emojiler',
}