const { MessageEmbed } = require("discord.js");
const config = require("../ayarlar.json");
const nekos = require("nekos.life");
const {
  sfw: { slap },
} = new nekos();
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["slap"],
  permLevel: 0
};

exports.help = {
  name: "tokat"
};

exports.run = async (client, message, args) => {
    const { url } = await slap().catch(() => {});

    if (!url) return message.channel.send(`Could not connect to nekos.life`);

    const embed = new MessageEmbed();

    if (
      message.mentions.members.size &&
      message.mentions.members.first().id === client.user.id
    ) {
      return message.channel.send(
        `${
          [`Ouch! How dare you slap me!`, `Stop that!`, `It hurts! ;-;`][
            Math.floor(Math.random() * 2)
          ]
        }`
      );
    } else if (
      message.mentions.members.size &&
      message.mentions.members.first().id === message.author.id
    ) {
      return message.channel.send(`Wai~ Seriously!?`);
    } else if (message.mentions.members.size) {
      return message.channel.send(
        embed
          .setColor(config.embedcolor)
          .setDescription(
            `${message.member} slapped ${message.mentions.members.first()}!`
          )
          .setImage(url)
      );
    } else {
      return message.channel.send(
        `${message.member}, are you practicing to slap or something?`
      );
    }
  }