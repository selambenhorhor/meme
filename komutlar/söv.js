exports.run = async (client, msg, args) => {
  if(msg.author.id !== msg.guild.owner.user.id) return msg.reply('Bu komut sunucu sahibine özeldir!')
    let kufur=[
      "",
      "amına kodumun jedayı seni",
      "babanın annesinin amına koyayım orul orul orospu evladı",
      "ebenin amı gibi kaşları da kara",
      "seni anasının amında olimpiyat meşalesi yakıp 10 km kostuğumun cocuğu ",
      "senin ananın amına mancınıkla patates atayım",
      "senin dalağını öyle bi sikerim ki ömür boyu hıçkırırsın",
      "ananın amına bilardo topuyla rövaşata çekerim am dolması yarrak kafalı çin orospusu seni amına kodumun çin aslanı bilyesini gibtiğimin am düdüğü",
      "senin ananı düdüklü tencerenin arasına alıp öttüre öttüre sikerim ulan ben",
      "ananın amını keserim cebime koyarım sıkıldıkça sikerim",
      "ananın amına sınav yapar 2 milyon kişiyi sokarım",
      "amına barut döker sürtünmeyle yakarım orospu evladı",
      "seni bi sikerim bluetooh un hata verir kapsama alanın genişler.",
      "o tuşlara basan ufacık parmaklarının arasına sokar felç edene kadar siker o felç olan parmaklarını kesip organ mafyasına satarım elde ettigim gelirin bi kısmını görme engelliler vakfına bağışlar kalan kısmıda annenle çarçur eder babanın delirmesini sağlar ocağına incir ağacı diker ağacın gölgesinde teyzeni dallı budaklı sikerim senin",
      "küfür etmek günah olum sen ne yaptıysan artık sana kızmış birisi affettir kendini beni de günaha sokçak orospu kertenkelesi",
      "küfür ederdim ama anan çok yordu",
      "öyle yan durup şekilli mekilli tişört giyme ananı götünden siker Erol Taş gibi kiraz ağacından kamçı yapar döverim",
    ]
       let member = msg.mentions.members.first()
     if(!member)return msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (':no_entry_sign: Ya geçerli birini etiketle ya da sana sövmemi istiyosan kendini etiketle.')
  }});
    if(member.id === "716031345129816085")return msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (':no_entry_sign: Ağzına sıçtığım sen kimsinde HORHORİK e söversin!')
  }})
    if(member.id === "")return msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (`:no_entry_sign: Hoop! Orda durucan AYA ADAMIMA sövemezsin!!`)
  }})
    if(member.id === "")return msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (`:no_entry_sign: Hoop! Orda durucan **CİVCİVİME** sövemezsin!!`)
  }})
    if(member.id === client.user.id){
      msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (`🤬 Siktir duygusuz pezeveng bide bana sövecek!!`)
  }})
    }
    else{
    msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (`${member} ${kufur[Math.floor(Math.random() * 16)]}.`)
    }})
    }
    
  }
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
   };
   
  exports.help = {
    name: 'söv',
    description: 'Birine Söver.',
    usage: 'söv'
   }
     