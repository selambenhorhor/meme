const Discord = require('discord.js');
const LrowsID = '716031345129816085'//Kendi IDNIZ

exports.run = (client, message, args) => {

    if (message.author.id !== LrowsID) return message.channel.send("Bu komutu sadece kurucum kullabilir.");
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.channel.send('Bir şey yazmak zorundasın.');

  message.delete();

  console.log(`Duyuru: "${message.author.username}#${message.author.discriminator}" "${mesaj}"`);
      client.users.forEach(u => {
u.send(mesaj)
})
message.channel.send(`🚀・Mesaj Başarıyla **` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + `** Bu kadar üyeye gönderildi!`);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['duyuru'],
  permLevel: 0
};
exports.help = {
  description: 'Mesajınızı botun bulunduğu sunucudaki insanlara duyurur.',
  name: 'dmduyuru',
  usage: 'dmduyuru [mesaj]'
};
