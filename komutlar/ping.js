const eziojs = require("discord.js");
const moment = require('moment')
require('moment-duration-format');
const db = require("quick.db");
exports.run = (client, message, args) => {
    const uptime = moment.duration(client.uptime).format(" D [Gün], H [Saat], m [Dakika], s [Saniye]")

    const ölçülüyor = new eziojs.MessageEmbed()
    .setDescription("⏱ | **Ping Ölçülüyor...**")
    .setColor("RANDOM");
    let mesajĞecikmesi;
    if(Date.now() - message.createdTimestamp < 200) {
        mesajĞecikmesi = ":green_circle:";
    } else if(Date.now() - message.createdTimestamp > 200 && Date.now() - message.createdTimestamp < 500){
        mesajĞecikmesi = ":orange_circle:";
    } else if(Date.now() - message.createdTimestamp > 550) {
        mesajĞecikmesi = ":red_circle:"
    }
//Alttaki satır ortalama pingi ölçmek içindir isterseniz silebilirsiniz ama işinize yarar
    db.set("ortalamaping", client.ws.ping);

    const ezioembed = new eziojs.MessageEmbed()
    .setTitle("Bot Gecikme Süreleri")
    .addField("🏓 | Bot Ping'i", `${client.ws.ping} ms`)
    .addField(`${mesajĞecikmesi} | Mesaj Gecikme Süresi`, `${Date.now() - message.createdTimestamp} ms`)
    .addField("⏳ | Çalışma Süresi", uptime)
//20. satırı sildiyseniz alttaki satırı da silin
    .addField("📈 | Ortalama Ping", (db.fetch("ortalamaping") + client.ws.ping / 2).toFixed(1) + " ms")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send(ölçülüyor).then(sjsj => {
        setTimeout(() => {
            sjsj.delete()
            sjsj.channel.send(ezioembed)
        }, 4000);
    })
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["gecikme", "ğ", "æ"],
    permLevel: 0
}
exports.help = {
    name: "ping",
    description: "Ping Gösterir"
}