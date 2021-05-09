const { MessageEmbed } = require("discord.js");
const config = require("../ayarlar.json");
const nekos = require("nekos.life");
const {
  sfw: { smug },
} = new nekos();

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sevin"],
  permLevel: 0
};

exports.help = {
  name: "smile"
};

exports.run = async (client, message, args) => {
    const { url } = await smug().catch(() => {});

    if (!url) return message.channel.send(`Could not connect to nekos.life`);

    message.channel.send(
      new MessageEmbed()
        .setColor(config.embedcolor)
        .setImage(url)
        .setDescription(`${message.member} smile.`)
    );
  }