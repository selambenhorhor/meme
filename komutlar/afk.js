const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`);
  if (kisi) return;
  const sebep = args[0];
  if (!args[0]) {
    let kullanıcı = message.guild.members.cache.get(message.author.id);
    const Wenzy = kullanıcı.displayName;

    await db.set(
      `afkSebep_${message.author.id}_${message.guild.id}`,
      "Sebep Girilmemiş"
    );
    await db.set(
      `afkid_${message.author.id}_${message.guild.id}`,
      message.author.id
    );
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, Wenzy);

    const Lrows = await db.fetch(
      `afkSebep_${message.author.id}_${message.guild.id}`
    );

    message.channel.send(`Başarıyla Afk Oldunuz \n Sebep: ${Lrows}`);

    message.member.setNickname(`[AFK] ` + Wenzy);
  }
  if (args[0]) {
    let sebep = args.join(" ");
    let kullanıcı = message.guild.members.cache.get(message.author.id);
    const Wenzy = kullanıcı.displayName;
    await db.set(`afkSebep_${message.author.id}_${message.guild.id}`, sebep);
    await db.set(
      `afkid_${message.author.id}_${message.guild.id}`,
      message.author.id
    );
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, Wenzy);
    const Lrows = await db.fetch(
      `afkSebep_${message.author.id}_${message.guild.id}`
    );

    message.channel.send(`**Başarıyla Afk Oldun!** \n**Sebep: ${Lrows}**`);

    message.member.setNickname(`[AFK] ` + Wenzy);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "afk",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk <sebep>"
};