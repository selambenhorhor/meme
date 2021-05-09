const { MessageEmbed } = require("discord.js");
const ayarlar = require("../ayarlar.json");
const nekos = require("nekos.life");
const {
  sfw: { poke },
} = new nekos();


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["poke"],
  permLevel: 0
};

exports.help = {
  name: "poke"
};

exports.run = async (client, message, args) => {
    const { url } = await poke().catch(() => {});

    if (!url) return message.channel.send(`Could not connect to nekos.life`);

    const embed = new MessageEmbed();

    if (
      message.mentions.members.size &&
      message.mentions.members.first().id === client.user.id
    ) {
      return message.channel.send(
        `${message.member}, I'm already here! You need something?`
      );
    } else if (
      message.mentions.members.size &&
      message.mentions.members.first().id === message.author.id
    ) {
      return message.channel.send(`What?`);
    } else if (message.mentions.members.size) {
      return message.channel.send(
        embed
          .setDescription(
            `${message.member} pokes ${message.mentions.members.first()}!`
          )
          .setImage(url)
      );
    } else {
      return message.channel.send(
        `${message.member}, I can't poke your imaginary friend! :(`
      );
    }
  }