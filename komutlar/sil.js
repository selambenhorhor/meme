const Discord = require('discord.js');

exports.run = async(yashinu, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için "MESAJLARI YÖNET" iznine sahip olmalısın!`);
  if (!args[0] || isNaN(args[0])) return message.reply(`Silinecek mesaj miktarını belirtmelisin! (İstediğin kadar)`);
  message.delete();
  let Lrowsayi = Number(args[0]);
  let Lrowsilinen = 0;
  for (var i = 0; i < (Math.floor(Lrowsayi/100)); i++) {
   message.channel.bulkDelete(100).then(r => Lrowsilinen+=r.size);
    Lrowsayi = Lrowsayi-100;
  };
  if (Lrowsayi > 0)  message.channel.bulkDelete(Lrowsayi).then(r => Lrowsilinen+=r.size);
  message.channel.send(` **\`\`${args[0]}\`\` Adet Mesaj Silindi.**`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil"],
  permLevel: 0
};

exports.help = { 
  name: 'sil', 
  description: 'Belirtilen miktarda mesajı siler.',
  usage: 'sil',
};