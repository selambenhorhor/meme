const Discord = require("discord.js");


exports.run = (client, message, params) => {
  
  let user = message.mentions.users.first()
  
      if (!user)
  return message.channel.send(":woman_shrugging: | Birisini Etiketlemen Lazım!");
      if (message.author.id == 777160096929153055)
  return message.channel.send(":woman_shrugging: | Bu Komudu Kullanamazsın, Kara Listedesin!");
      if (message.author.id == user)
  return message.channel.send(":woman_shrugging: | Kendini Fuckedlayamazsın!")
      if (user)
  return message.channel.send(`${user} ${message.author} Tarafından F*ck#dladı\n:hot_face: :sweat_drops: :hot_face:`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["fucked"],
  permLevel: 0
};

exports.help = {
  name: "fucked",
  description: "Kuralları yazar.",
  usage: "fucked"
};