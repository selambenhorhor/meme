const Discord = require ("discord.js");

exports.run = (client, message) => {
const lembed = new Discord.MessageEmbed()

.then;   
const mhelp = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(`${client.user.username} `, client.user.avatarURL)  
.setTitle(" Horhorik ")
.setThumbnail("https://cdn.discordapp.com/avatars/832234110809407558/a_1daba0772d100f1b713823ff68118892.gif")
    .setDescription(`


╔════════════════════════════════════╗
║**»** **hor memer** 
║**»** **hor meme2** 
║**»** **hor aykutelmas** 
║**»** **hor vine** 
║**»** **hor howgay**  
║**»** **hor discordmeme**  
║**»** **hor dankmemer**  
║**»** **hor xkcd**   
╚════════════════════════════════════╝
`) 
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
message.channel.send(mhelp)
.then; const sembed = new Discord.MessageEmbed()

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["meme"], 
    permLevel: 0 
  };
 
  exports.help = {
    name: 'meme', 
    description: 'yardım menüsü',
    usage: 'meme'
  };