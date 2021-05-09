const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client ,message, args) =>{
  if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`❌ Bu Komutu Kullana Bilmek İçin \`Mesajları Yönet\` Yetkisine Sahip Olmalısın!`)
if(args[0] === 'aç') {
    db.set(`${message.guild.id}.kufur`, true)
    message.channel.send(`Küfür Engel Başarılı Bir Şekilde Akif Edildi.`)
  return
}
if (args[0] === 'kapat') {
  db.delete(`${message.guild.id}.kufur`)
message.channel.send(`Küfür Engel Başarılı Bir Şekilde Kapatıldı Edildi`)
return
}
  message.channel.send('Lütfen **aç** veya **kapat** yazın. Örnek Kullanım: **küfür-engel aç/kapat**')
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['2'], 
 permLevel: 0
};

exports.help = {
 name: 'kötülük',
 description: 'küfürleri engeller',
 usage: 'küfürengel'
};