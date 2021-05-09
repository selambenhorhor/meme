const Discord = require ("discord.js");

exports.run = (client, message) => {
const lembed = new Discord.MessageEmbed()
  if(message.author.id !== message.guild.owner.user.id) return message.reply('Bu komut sunucu sahibine özeldir! Kullanacağınız komut => -,-eğlence')


.then;   
const mhelp = new Discord.MessageEmbed()
.setColor("BLACK")
.setAuthor(`${client.user.username} `, client.user.avatarURL)  
.setTitle("HORHORİK eğlence")
.setThumbnail("https://cdn.discordapp.com/emojis/727894683061321759.gif?v=1")
    .setDescription(`


═════════════════════════════════════
║                       
║**eğlence KOMUTLAR**
║ **-,-taş-kağıt-makas**
║| **-,-aşkölçer**   
║| **-,-espri** 
║**-,-aykutelmas**
║**-,-fal**  
║**-,-espri2** 
║**-,-csgokasa**  
║**-,-wasted**  
║**-,-gun**  
║**-,-cmm**  
║**-,-adamasmaca**
║**-,-balık**  
║**-,banner**    
║**-,-boks**
║**-,-boğazla**    
║**-,-coffin** 
║**-,-anime** 
║**-,-animegif** 
║**-,-düello**         
║**-,-film-rastgele**
║**-,-film-araştır**
║**-,-film-trendler**
║**-,-film**
║**-,-howgay**          
║**-,-iltifat**          
║**-,-kaçcm**     
║**-,-lyrics**  
║**-,-kapaklaflar**         
║**-,-sarıl**    
║**-,-karıştır**  
║**-,-söv**        
║**-,-yazankazanır**   
║**-,-covid <ülke>**   
║**-,-öp**      
║**-,-vine**  
║**-,-soygun-yap**         
╚═════════════════════════════════════╝
`) 
       .addField(`» HORHORİK EĞLENCE`, `**<3**`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
message.channel.send(mhelp)
.then; const sembed = new Discord.MessageEmbed()

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["eğlence"], 
    permLevel: 0 
  };
 
  exports.help = {
    name: 'eğlence', 
    description: '',
    usage: ''
  };