const { MessageEmbed, MessageAttachment } = require("discord.js");

exports.run = async (client, message, args) => {

  let kullanıcı = message.mentions.users.first() || message.author;
  let link = `https://api.devs-hub.xyz/gun?image=${kullanıcı.avatarURL({ format: "png", size: 1024 })}`;

  const ek = new MessageAttachment(link, `https://i1.wp.com/ytimg.googleusercontent.com/vi/q-9pGjY5nHU/mqdefault.jpg`);

  const embed = new MessageEmbed()
    .setTitle(`Silah efekti uygulamış avatar!`)
    .setColor(`RANDOM`)
    .attachFiles(ek)
    .setImage(``)
    .setFooter(`${message.author.tag} tarafından istendi`, message.author.avatarURL({ dynamic: true }))
    .setTimestamp();

  return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gun"],
  permLevel: 0
};

exports.help = {
  name: "silah",
  description: "gun <etiket>",
  usage: ""
};