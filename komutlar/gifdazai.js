const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {

let izexreplies = ["https://media.giphy.com/media/R1G43jXwLWsxO/giphy.gif",
                   "https://media.giphy.com/media/l3q2KhEVdAQYa6nny/giphy.gif",
                   "https://media.tenor.com/images/0e1d1060c005c26a55b82b684e0c51f4/tenor.gif",
                   "https://media.tenor.com/images/f2208d8d8093dbc4681a7e79a478321d/tenor.gif",
                   "https://media.tenor.com/images/386335c0c8f893331ca2066abe21005a/tenor.gif",
                   "https://media.tenor.com/images/36d87b4175cc7cacdc8553c3bb9d6424/tenor.gif",
                   "https://media.tenor.com/images/9a12daa62d7adf758e1030d06b82e6c7/tenor.gif",
                   "https://media.tenor.com/images/9cd7fa05db9bf490757e576d0757032e/tenor.gif",
                   "https://media.tenor.com/images/a632d16ceaddc60e7112c272c39f3d15/tenor.gif",
                   "https://media.tenor.com/images/eda57a43a42b4c169f4f9a69a2d5e45c/tenor.gif",
                   "https://media.tenor.com/images/e7954d8f94520e5af676972057f9b716/tenor.gif",
                   "https://media.tenor.com/images/bff6912a98172ed55126ada0cc80e5c1/tenor.gif",
                   "https://media.tenor.com/images/caaf0c143a954434c65dc58d3303b80a/tenor.gif",
                   "https://media.tenor.com/images/55180a2619c3a42e596a30afb2785669/tenor.gif",
                   "https://media.tenor.com/images/65ae9c8407f7034af05abf6944efeda3/tenor.gif",
                   "https://media.tenor.com/images/137c478db7e9af141c1e107a4cbafc51/tenor.gif",
                   "https://media.tenor.com/images/064aa63adefe6db4d547115c6bba4460/tenor.gif",
                   "https://media.tenor.com/images/00b043d29fd7c34c67278dc88a905c38/tenor.gif",
                   "https://media.tenor.com/images/d8f39bc2432d8b8a6a54ee795b17f217/tenor.gif",
                   "https://media.tenor.com/images/3bbc0598ca37d786b642e6e75383242c/tenor.gif",
                   "https://media.tenor.com/images/ee2a633237a1f7d1c9b4732d8971aaa8/tenor.gif",
                   "https://media.tenor.com/images/50d96209b243bb08135abcc1aa2bdec1/tenor.gif",
                   "https://media.tenor.com/images/c91d8c6efa6be1efd4d3f712ea34e426/tenor.gif",
                   "https://media.tenor.com/images/226e0abe3c109a7e290d4c0f44fe8496/tenor.gif",
                   "https://media.tenor.com/images/f19245528c0ed20b14d2fc7ac05d6a71/tenor.gif",
                   "https://media.tenor.com/images/fc43926693bfecbc772e384c2ea0b930/tenor.gif",
                   "https://media.tenor.com/images/0e1c42cb66c46bc195c2c25ca2e9d757/tenor.gif",
                   "https://media.tenor.com/images/b191f98e01efc7e38b6dce11ab9f38b9/tenor.gif",
                   "https://media.tenor.com/images/1a003869a0bdc999efc4f8a7f3efe889/tenor.gif",
                  ];
let izexresult = Math.floor((Math.random() * izexreplies.length));
let izexlesh = new Discord.MessageEmbed()

.setTitle("| DAZAİ Gif |")
.setColor("#ff0000")
.setFooter(`${message.author.tag} `, message.author.avatarURL)
.setImage(izexreplies[izexresult]);
message.channel.send(izexlesh);

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["dazai"],
  permLevel: 0
};

exports.help = {
  name: "dazai",
  description: "Rasgele Levi Gif Atar!",
  usage: ""
};