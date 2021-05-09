const Discord = require("discord.js");
const client = new Discord.Client();
//elreann ama nah çekiyo muydu neydi adım
exports.run = (client, message) => {
  message.channel.send("Düşünüyorum Azıcık Bekle...").then(message => {
    var sınavpuanı = [
      "**nah alırsın**",
      "**rakam vermek istemiyorum ama orta alırsın gibi gibi**",
      "**100 alırsın Rahat Alırsın ama yinede çalış**",
      "**hmmm düşünüyorum 31 alırsın**",
      "**30-25 yada 29**",
      "**Bence Hasta Numarası Yap gitme sınava :)))**",
      "**La Ben Nebilem**",
      "**45-50 Gibi gibi**",
      "**söylemicem spoiler olmasın ama o aldığın puan senin dövülemene neden olucak dikkatli ol**",
      "**Hmmmmm 1 alırsın hehehehehe**",
      "**sen 95-100 alırsın ama sınıfından biri bence 30-40 alcak neden söyledim bilmiyem**",
      "**70 alırsın bence**",
      "**Bence Bence 75 alırsın**",
      "**Bence 90 Alırsın Be Kanka Bi 90 Imızı Var gibi?**",
      "**aga aga aga 85 Alırsın Ne yazıkki 85**",
      "**alırsın bişeyler**"
    ];
    var sınavpuanı = sınavpuanı[Math.floor(Math.random() * sınavpuanı.length)];
    message.edit(`${sınavpuanı}`);
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sınavım"],
  permLevel: 0
};

exports.help = {
  name: "sınavpuanıölç",
  description: "Sınav Puanını Tahmin eder ciddiye almayın",
  usage: "sınavpuanıölç"
};