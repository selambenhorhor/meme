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
║**»** **hor anime** 
║**»** **hor goku**
║**»** **hor levi** 
║**»** **hor izuku** 
║**»** **hor naruto** 
║**»** **hor mary** 
║**»** **hor yuno** 
║**»** **hor usagi** 
║**»** **horlubbock** 
║**»** **hor shouka** 
║**»** **hor rintaro** 
║**»** **hor animal** 
║**»** **hor man** 
║**»** **hor woman** 
║**»** **hor couple** 
║**»** **hor wwe** 
║**»** **hor neko** 
║**»** **hor waifu** 
║**»** **hor coffin** 
╚════════════════════════════════════╝
`) 
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
message.channel.send(mhelp)
.then; const sembed = new Discord.MessageEmbed()

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["gif"], 
    permLevel: 0 
  };
 
  exports.help = {
    name: 'gif', 
    description: 'yardım menüsü',
    usage: 'gif'
  };