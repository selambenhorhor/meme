const discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const qdb = require("quick.db");
const moment = require("moment");
const express = require("express");
const ayarlar = require("./ayarlar.json");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);

  client.user.setActivity(`✨ hor yardım || HORHORİK👑`, { type: "WATCHING" });

  console.log("-,-hazır");
});

const log = message => {
  console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
client.login(process.env.TOKEN);

//afk//
client.on("message", async msg => {
  if (!msg.guild) return;
  if (msg.content.startsWith(ayarlar.prefix + "afk")) return;

  let afk = msg.mentions.users.first();

  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`);

  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`);
  if (afk) {
    const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`);
    const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`);
    if (msg.content.includes(kisi3)) {
      msg.reply(`**Etiketlediğiniz Kişi AFK!** \n**Sebep : ${sebep}**`);
    }
  }
  if (msg.author.id === kisi) {
    msg.reply(`**Artık AFK Değil!**`);
    db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`);
    db.delete(`afkid_${msg.author.id}_${msg.guild.id}`);
    db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`);
    msg.member.setNickname(isim);
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("**Aleyküm Selam,Hoşgeldin Kral✨**");
    await msg.react("🇦");
    msg.react("🇸");
  }
});

client.on("message", msg => {
  var dm = client.users.cache.get("716031345129816085");
  if (msg.author.id === client.user.id) return;
  if (msg.channel.type === "dm") {
    const DMEmbed = new Discord.MessageEmbed()
      .setTitle("Bir Mesaj Geldi!")
      .setAuthor(msg.author.tag, msg.author.avatarURL({ size: 1024 }))
      .setDescription(`${msg.content}`)
      .setThumbnail(msg.author.avatarURL({ size: 1024 }));
    dm.send(DMEmbed);
  }
  if (msg.channel.bot) return;
});

client.on("guildMemberAdd", member => {
  const hg = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(
      member.guild.name +
        "Sunucusuna Hoşgeldin! Sunucumuzda sohbet edebilecek, iyi vakit geçirebilecek,toxic kişilerin olmadığı harika bir ortamdır. Hatta kendi botumuzda var (bende bahsediyorlar sjsj neyse) -,-eğlence yazarak eğlence komutlarına ulaşabilirsin. Kuralları uymaya dikkat et!!"
    )
    .setDescription(`Sunucumuza katıldığın için teşekkürler :)`)
    .setFooter("Hoşgeldin")
    .setTimestamp();
  member.send(hg);
});
client.on("guildMemberRemove", async member => {
  //let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
  //const canvaskanal = member.guild.channels.cache.get(resimkanal[member.guild.id].resim);

  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(
    db.fetch(`gçkanal_${member.guild.id}`)
  );
  if (!canvaskanal) return;

  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucudan Ayrıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/Wrn1XW.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({
    format: "png",
    dynamic: true,
    size: 1024
  });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-güle-güle.png"
  );

  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
});

client.on("guildMemberAdd", async member => {
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(
    db.fetch(`gçkanal_${member.guild.id}`)
  );

  if (!canvaskanal || canvaskanal === undefined) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucuya Katıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/UyVZ4f.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({
    format: "png",
    dynamic: true,
    size: 1024
  });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "ro-BOT-hosgeldin.png"
  );

  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
});

client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  if (
    message.content.toLowerCase() === "napim" ||
    message.content.toLowerCase() === "NAPİM" ||
    message.content.toLowerCase() === "Napim"
  ) {
    message.member
      .kick({ reason: "Siktir Pezevenk" })
      .catch(err => console.log(err));
    message.channel.send(`Arkadaş Kaşındı Bende Kaşıdım Kanks :3`);
  }
});
client.on("guildMemberAdd", async member => {
  /////////////////////////
  //Kanal Tanımı
  ////////////////////////////////////////
  let viruskanal = client.channels.cache.get("802492913111924737");
  ////////////////////////////////////////
  //Güvenlik TanımlarıS
  ////////////////////////////////////////
  let virususer = client.users.cache.get(member.id);
  let viruskullanıcı = client.users.cache.get(member.id);
  const virushesapkurulus =
    new Date().getTime() - viruskullanıcı.createdAt.getTime();
  let viruj;
  if (virushesapkurulus < 1296000000) viruj = " Güvenilir Değil!";
  if (virushesapkurulus > 1296000000) viruj = " Güvenilir!";

  /////////////////////// /////////////////
  //Embed
  ////////////////////////////////////////
  const hgembed = new Discord.MessageEmbed()
    .setDescription(
      `
    
     ゃ Aramıza Hoşgeldin **${virususer.username}** !
  
     ゃ Seninle Birlikte **${member.guild.memberCount}** Kişiyiz
  
     ゃ Hesabın Kuruluş Tarihi ${moment(member.user.createdAt).format(
       "**DD MMMM YYYY hh:mm:ss**"
     )}
  
     ゃ Hesabın Güvenlik Durumu: **${viruj}**
  
    
    `
    )
    .setColor("#2f3136")
    //.setImage("https://cdn.discordapp.com/attachments/706505340417736736/794296050121965568/ezgif-6-9ab9144abf46.gif")
    .setTitle("Aramıza Yeni Birisi Katıldı !")
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setAuthor(member.guild.name, member.guild.iconURL({ dynamic: true }))
    .setFooter("ARAMIZA HOŞ GELDİN");
  ////////////////////////////////////////
  //Kanala Gönderme
  ////////////////////////////////////////
  viruskanal.send(`<@&831538625475903550> <@${member.id}>`, hgembed);
});

const küfür = [
  "abaza",
  "abazan",
  "ag",
  "a\u011fz\u0131na s\u0131\u00e7ay\u0131m",
  "ahmak",
  "allah",
  "allahs\u0131z",
  "am",
  "amar\u0131m",
  "ambiti",
  "am biti",
  "amc\u0131\u011f\u0131",
  "amc\u0131\u011f\u0131n",
  "amc\u0131\u011f\u0131n\u0131",
  "amc\u0131\u011f\u0131n\u0131z\u0131",
  "amc\u0131k",
  "amc\u0131k ho\u015faf\u0131",
  "amc\u0131klama",
  "amc\u0131kland\u0131",
  "amcik",
  "amck",
  "amckl",
  "amcklama",
  "amcklaryla",
  "amckta",
  "amcktan",
  "amcuk",
  "am\u0131k",
  "am\u0131na",
  "am\u0131nako",
  "am\u0131na koy",
  "am\u0131na koyar\u0131m",
  "am\u0131na koyay\u0131m",
  "am\u0131nakoyim",
  "am\u0131na koyyim",
  "am\u0131na s",
  "am\u0131na sikem",
  "am\u0131na sokam",
  "am\u0131n feryad\u0131",
  "am\u0131n\u0131",
  "am\u0131n\u0131 s",
  "am\u0131n oglu",
  "am\u0131no\u011flu",
  "am\u0131n o\u011flu",
  "am\u0131s\u0131na",
  "am\u0131s\u0131n\u0131",
  "amina",
  "amina g",
  "amina k",
  "aminako",
  "aminakoyarim",
  "amina koyarim",
  "amina koyay\u0131m",
  "amina koyayim",
  "aminakoyim",
  "aminda",
  "amindan",
  "amindayken",
  "amini",
  "aminiyarraaniskiim",
  "aminoglu",
  "amin oglu",
  "amiyum",
  "amk",
  "amkafa",
  "amk \u00e7ocu\u011fu",
  "amlarnzn",
  "aml\u0131",
  "amm",
  "ammak",
  "ammna",
  "amn",
  "amna",
  "amnda",
  "amndaki",
  "amngtn",
  "amnn",
  "amona",
  "amq",
  "ams\u0131z",
  "amsiz",
  "amsz",
  "amteri",
  "amugaa",
  "amu\u011fa",
  "amuna",
  "ana",
  "anaaann",
  "anal",
  "analarn",
  "anam",
  "anamla",
  "anan",
  "anana",
  "anandan",
  "anan\u0131",
  "anan\u0131",
  "anan\u0131n",
  "anan\u0131n am",
  "anan\u0131n am\u0131",
  "anan\u0131n d\u00f6l\u00fc",
  "anan\u0131nki",
  "anan\u0131sikerim",
  "anan\u0131 sikerim",
  "anan\u0131sikeyim",
  "anan\u0131 sikeyim",
  "anan\u0131z\u0131n",
  "anan\u0131z\u0131n am",
  "anani",
  "ananin",
  "ananisikerim",
  "anani sikerim",
  "ananisikeyim",
  "anani sikeyim",
  "anann",
  "ananz",
  "anas",
  "anas\u0131n\u0131",
  "anas\u0131n\u0131n am",
  "anas\u0131 orospu",
  "anasi",
  "anasinin",
  "anay",
  "anayin",
  "angut",
  "anneni",
  "annenin",
  "annesiz",
  "anuna",
  "aptal",
  "aq",
  "a.q",
  "a.q.",
  "aq.",
  "ass",
  "atkafas\u0131",
  "atm\u0131k",
  "att\u0131rd\u0131\u011f\u0131m",
  "attrrm",
  "auzlu",
  "avrat",
  "ayklarmalrmsikerim",
  "azd\u0131m",
  "azd\u0131r",
  "azd\u0131r\u0131c\u0131",
  "babaannesi ka\u015far",
  "baban\u0131",
  "baban\u0131n",
  "babani",
  "babas\u0131 pezevenk",
  "baca\u011f\u0131na s\u0131\u00e7ay\u0131m",
  "bac\u0131na",
  "bac\u0131n\u0131",
  "bac\u0131n\u0131n",
  "bacini",
  "bacn",
  "bacndan",
  "bacy",
  "bastard",
  "basur",
  "beyinsiz",
  "b\u0131z\u0131r",
  "bitch",
  "biting",
  "bok",
  "boka",
  "bokbok",
  "bok\u00e7a",
  "bokhu",
  "bokkkumu",
  "boklar",
  "boktan",
  "boku",
  "bokubokuna",
  "bokum",
  "bombok",
  "boner",
  "bosalmak",
  "bo\u015falmak",
  "cenabet",
  "cibiliyetsiz",
  "cibilliyetini",
  "cibilliyetsiz",
  "cif",
  "cikar",
  "cim",
  "\u00e7\u00fck",
  "dalaks\u0131z",
  "dallama",
  "daltassak",
  "dalyarak",
  "dalyarrak",
  "dangalak",
  "dassagi",
  "diktim",
  "dildo",
  "dingil",
  "dingilini",
  "dinsiz",
  "dkerim",
  "domal",
  "domalan",
  "domald\u0131",
  "domald\u0131n",
  "domal\u0131k",
  "domal\u0131yor",
  "domalmak",
  "domalm\u0131\u015f",
  "domals\u0131n",
  "domalt",
  "domaltarak",
  "domalt\u0131p",
  "domalt\u0131r",
  "domalt\u0131r\u0131m",
  "domaltip",
  "domaltmak",
  "d\u00f6l\u00fc",
  "d\u00f6nek",
  "d\u00fcd\u00fck",
  "eben",
  "ebeni",
  "ebenin",
  "ebeninki",
  "ebleh",
  "ecdad\u0131n\u0131",
  "ecdadini",
  "embesil",
  "emi",
  "fahise",
  "fahi\u015fe",
  "feri\u015ftah",
  "ferre",
  "fuck",
  "fucker",
  "fuckin",
  "fucking",
  "gavad",
  "gavat",
  "geber",
  "geberik",
  "gebermek",
  "gebermi\u015f",
  "gebertir",
  "ger\u0131zekal\u0131",
  "gerizekal\u0131",
  "gerizekali",
  "gerzek",
  "giberim",
  "giberler",
  "gibis",
  "gibi\u015f",
  "gibmek",
  "gibtiler",
  "goddamn",
  "godo\u015f",
  "godumun",
  "gotelek",
  "gotlalesi",
  "gotlu",
  "gotten",
  "gotundeki",
  "gotunden",
  "gotune",
  "gotunu",
  "gotveren",
  "goyiim",
  "goyum",
  "goyuyim",
  "goyyim",
  "g\u00f6t",
  "g\u00f6t deli\u011fi",
  "g\u00f6telek",
  "g\u00f6t herif",
  "g\u00f6tlalesi",
  "g\u00f6tlek",
  "g\u00f6to\u011flan\u0131",
  "g\u00f6t o\u011flan\u0131",
  "g\u00f6to\u015f",
  "g\u00f6tten",
  "g\u00f6t\u00fc",
  "g\u00f6t\u00fcn",
  "g\u00f6t\u00fcne",
  "g\u00f6t\u00fcnekoyim",
  "g\u00f6t\u00fcne koyim",
  "g\u00f6t\u00fcn\u00fc",
  "g\u00f6tveren",
  "g\u00f6t veren",
  "g\u00f6t verir",
  "gtelek",
  "gtn",
  "gtnde",
  "gtnden",
  "gtne",
  "gtten",
  "gtveren",
  "hasiktir",
  "hassikome",
  "hassiktir",
  "has siktir",
  "hassittir",
  "haysiyetsiz",
  "hayvan herif",
  "ho\u015faf\u0131",
  "h\u00f6d\u00fck",
  "hsktr",
  "huur",
  "\u0131bnel\u0131k",
  "ibina",
  "ibine",
  "ibinenin",
  "ibne",
  "ibnedir",
  "ibneleri",
  "ibnelik",
  "ibnelri",
  "ibneni",
  "ibnenin",
  "ibnerator",
  "ibnesi",
  "idiot",
  "idiyot",
  "imansz",
  "ipne",
  "iserim",
  "i\u015ferim",
  "ito\u011flu it",
  "kafam girsin",
  "kafas\u0131z",
  "kafasiz",
  "kahpe",
  "kahpenin",
  "kahpenin feryad\u0131",
  "kaka",
  "kaltak",
  "kanc\u0131k",
  "kancik",
  "kappe",
  "karhane",
  "ka\u015far",
  "kavat",
  "kavatn",
  "kaypak",
  "kayyum",
  "kerane",
  "kerhane",
  "kerhanelerde",
  "kevase",
  "keva\u015fe",
  "kevvase",
  "koca g\u00f6t",
  "kodu\u011fmun",
  "kodu\u011fmunun",
  "kodumun",
  "kodumunun",
  "koduumun",
  "koyarm",
  "koyay\u0131m",
  "koyiim",
  "koyiiym",
  "koyim",
  "koyum",
  "koyyim",
  "krar",
  "kukudaym",
  "laciye boyad\u0131m",
  "lavuk",
  "libo\u015f",
  "madafaka",
  "mal",
  "malafat",
  "malak",
  "manyak",
  "mcik",
  "meme",
  "memelerini",
  "mezveleli",
  "minaamc\u0131k",
  "mincikliyim",
  "mna",
  "monakkoluyum",
  "motherfucker",
  "mudik",
  "oc",
  "ocuu",
  "ocuun",
  "O\u00c7",
  "o\u00e7",
  "o. \u00e7ocu\u011fu",
  "o\u011flan",
  "o\u011flanc\u0131",
  "o\u011flu it",
  "orosbucocuu",
  "orospu",
  "orospucocugu",
  "orospu cocugu",
  "orospu \u00e7oc",
  "orospu\u00e7ocu\u011fu",
  "orospu \u00e7ocu\u011fu",
  "orospu \u00e7ocu\u011fudur",
  "orospu \u00e7ocuklar\u0131",
  "orospudur",
  "orospular",
  "orospunun",
  "orospunun evlad\u0131",
  "orospuydu",
  "orospuyuz",
  "orostoban",
  "orostopol",
  "orrospu",
  "oruspu",
  "oruspu\u00e7ocu\u011fu",
  "oruspu \u00e7ocu\u011fu",
  "osbir",
  "ossurduum",
  "ossurmak",
  "ossuruk",
  "osur",
  "osurduu",
  "osuruk",
  "osururum",
  "otuzbir",
  "\u00f6k\u00fcz",
  "\u00f6\u015fex",
  "patlak zar",
  "penis",
  "pezevek",
  "pezeven",
  "pezeveng",
  "pezevengi",
  "pezevengin evlad\u0131",
  "pezevenk",
  "pezo",
  "pic",
  "pici",
  "picler",
  "pi\u00e7",
  "pi\u00e7in o\u011flu",
  "pi\u00e7 kurusu",
  "pi\u00e7ler",
  "pipi",
  "pipi\u015f",
  "pisliktir",
  "porno",
  "pussy",
  "pu\u015ft",
  "pu\u015fttur",
  "rahminde",
  "revizyonist",
  "s1kerim",
  "s1kerm",
  "s1krm",
  "sakso",
  "saksofon",
  "salaak",
  "salak",
  "saxo",
  "sekis",
  "serefsiz",
  "sevgi koyar\u0131m",
  "sevi\u015felim",
  "sexs",
  "s\u0131\u00e7ar\u0131m",
  "s\u0131\u00e7t\u0131\u011f\u0131m",
  "s\u0131ecem",
  "sicarsin",
  "sie",
  "sik",
  "sikdi",
  "sikdi\u011fim",
  "sike",
  "sikecem",
  "sikem",
  "siken",
  "sikenin",
  "siker",
  "sikerim",
  "sikerler",
  "sikersin",
  "sikertir",
  "sikertmek",
  "sikesen",
  "sikesicenin",
  "sikey",
  "sikeydim",
  "sikeyim",
  "sikeym",
  "siki",
  "sikicem",
  "sikici",
  "sikien",
  "sikienler",
  "sikiiim",
  "sikiiimmm",
  "sikiim",
  "sikiir",
  "sikiirken",
  "sikik",
  "sikil",
  "sikildiini",
  "sikilesice",
  "sikilmi",
  "sikilmie",
  "sikilmis",
  "sikilmi\u015f",
  "sikilsin",
  "sikim",
  "sikimde",
  "sikimden",
  "sikime",
  "sikimi",
  "sikimiin",
  "sikimin",
  "sikimle",
  "sikimsonik",
  "sikimtrak",
  "sikin",
  "sikinde",
  "sikinden",
  "sikine",
  "sikini",
  "sikip",
  "sikis",
  "sikisek",
  "sikisen",
  "sikish",
  "sikismis",
  "siki\u015f",
  "siki\u015fen",
  "siki\u015fme",
  "sikitiin",
  "sikiyim",
  "sikiym",
  "sikiyorum",
  "sikkim",
  "sikko",
  "sikleri",
  "sikleriii",
  "sikli",
  "sikm",
  "sikmek",
  "sikmem",
  "sikmiler",
  "sikmisligim",
  "siksem",
  "sikseydin",
  "sikseyidin",
  "siksin",
  "siksinbaya",
  "siksinler",
  "siksiz",
  "siksok",
  "siksz",
  "sikt",
  "sikti",
  "siktigimin",
  "siktigiminin",
  "sikti\u011fim",
  "sikti\u011fimin",
  "sikti\u011fiminin",
  "siktii",
  "siktiim",
  "siktiimin",
  "siktiiminin",
  "siktiler",
  "siktim",
  "siktim",
  "siktimin",
  "siktiminin",
  "siktir",
  "siktir et",
  "siktirgit",
  "siktir git",
  "siktirir",
  "siktiririm",
  "siktiriyor",
  "siktir lan",
  "siktirolgit",
  "siktir ol git",
  "sittimin",
  "sittir",
  "skcem",
  "skecem",
  "skem",
  "sker",
  "skerim",
  "skerm",
  "skeyim",
  "skiim",
  "skik",
  "skim",
  "skime",
  "skmek",
  "sksin",
  "sksn",
  "sksz",
  "sktiimin",
  "sktrr",
  "skyim",
  "slaleni",
  "sokam",
  "sokar\u0131m",
  "sokarim",
  "sokarm",
  "sokarmkoduumun",
  "sokay\u0131m",
  "sokaym",
  "sokiim",
  "soktu\u011fumunun",
  "sokuk",
  "sokum",
  "soku\u015f",
  "sokuyum",
  "soxum",
  "sulaleni",
  "s\u00fclaleni",
  "s\u00fclalenizi",
  "s\u00fcrt\u00fck",
  "\u015ferefsiz",
  "\u015f\u0131ll\u0131k",
  "taaklarn",
  "taaklarna",
  "tarrakimin",
  "tasak",
  "tassak",
  "ta\u015fak",
  "ta\u015f\u015fak",
  "tipini s.k",
  "tipinizi s.keyim",
  "tiyniyat",
  "toplarm",
  "topsun",
  "toto\u015f",
  "vajina",
  "vajinan\u0131",
  "veled",
  "veledizina",
  "veled i zina",
  "verdiimin",
  "weled",
  "weledizina",
  "whore",
  "xikeyim",
  "yaaraaa",
  "yalama",
  "yalar\u0131m",
  "yalarun",
  "yaraaam",
  "yarak",
  "yaraks\u0131z",
  "yaraktr",
  "yaram",
  "yaraminbasi",
  "yaramn",
  "yararmorospunun",
  "yarra",
  "yarraaaa",
  "yarraak",
  "yarraam",
  "yarraam\u0131",
  "yarragi",
  "yarragimi",
  "yarragina",
  "yarragindan",
  "yarragm",
  "yarra\u011f",
  "yarra\u011f\u0131m",
  "yarra\u011f\u0131m\u0131",
  "yarraimin",
  "yarrak",
  "yarram",
  "yarramin",
  "yarraminba\u015f\u0131",
  "yarramn",
  "yarran",
  "yarrana",
  "yarrrak",
  "yavak",
  "yav\u015f",
  "yav\u015fak",
  "yav\u015fakt\u0131r",
  "yavu\u015fak",
  "y\u0131l\u0131\u015f\u0131k",
  "yilisik",
  "yogurtlayam",
  "yo\u011furtlayam",
  "yrrak",
  "z\u0131kk\u0131m\u0131m",
  "zibidi",
  "zigsin",
  "zikeyim",
  "zikiiim",
  "zikiim",
  "zikik",
  "zikim",
  "ziksiiin",
  "ziksiin",
  "zulliyetini",
  "zviyetini"
];

client.on("messageUpdate", async (old, nev) => {
  if (old.content != nev.content) {
    let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
    if (i) {
      if (küfür.some(word => nev.content.includes(word))) {
        if (nev.member.hasPermission("BAN_MEMBERS")) return;
        //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
        const embed = new Discord.MessageEmbed()
          .setColor("#ff7e00")
          .setDescription(
            `${nev.author} , **Ben varken küfürmü emteye çalıştın?**`
          )
          .addField("Küfür:", nev);

        nev.delete();
        const embeds = new Discord.MessageEmbed()
          .setColor("#ff7e00")
          .setDescription(`${nev.author} , **Mesajı editle küfür etmekmi?**`);
        client.channels.cache.get(y).send(embed);
        nev.channel.send(embeds).then(msg =>
          msg.delete({
            timeout: 5000
          })
        );
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
  let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);

  let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
  if (i) {
    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
          msg.delete({
            timeout: 750
          });
          const embeds = new Discord.MessageEmbed()
            .setColor("#ff7e00")
            .setDescription(
              `<@${msg.author.id}> , **Küfür etmeye çalıştı ama ben varken asla!**`
            );
          msg.channel.send(embeds).then(msg =>
            msg.delete({
              timeout: 5000
            })
          );
          const embed = new Discord.MessageEmbed()
            .setColor("#ff7e00")
            .setDescription(
              `${msg.author} , **Küfür etmeye çalıştı ama ben varken asla!**`
            )
            .addField("Mesajı:", msg);
          client.channels.cache.get(y).send(embed);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//-----------------------KOMUTLAR-----------------------\\

//ANTİ RAİD

client.on("guildMemberAdd", async member => {
  let kanal =
    (await db.fetch(`antiraidK_${member.guild.id}`)) == "anti-raid-aç";
  if (!kanal) return;
  var noples = member.guild.owner;
  if (member.user.bot === true) {
    if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
      let abi = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL())
        .setDescription(
          `**${member.user.tag}** (${member.id}) adlı bota bir yetkili verdi eğer kaldırmak istiyorsanız **hor bot-izni kaldır botun_id**.`
        );
      noples.send(abi);
    } else {
      let izinverilmemişbot = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL())
        .setDescription(
          "**" +
            member.user.tag +
            "**" +
            " (" +
            member.id +
            ") " +
            "adlı bot sunucuya eklendi ve banladım eğer izin vermek istiyorsanız ** hor bot-izni ver botun_id**"
        );
      member.members.kick();
      noples.send(izinverilmemişbot);
    }
  }
});

//ANTİ RAİD SON

//CAPS ENGEL

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 1) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`${msg.member}, Capslock Kapat Lütfen!`)
              .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
          }
        }
      }
    }
  }
});

//CAPS ENGEL SON

//KANAL & ROL KORUMA

client.on("roleDelete", async role => {
  let synx2 = await db.fetch(`synx_${role.guild.id}`);
  if (synx2) {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    role.guild.roles.create({
      data: {
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        permissions: role.permissions,
        mentionable: role.mentionable,
        position: role.position
      },
      reason: "Silinen Roller Tekrar Açıldı."
    });
  }
});

//

client.on("roleCreate", async role => {
  let synx = await db.fetch(`synx_${role.guild.id}`);
  if (synx) {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    role.delete();
  }
});

//

client.on("channelDelete", async function(channel) {
  let rol = await db.fetch(`kanalk_${channel.guild.id}`);

  if (rol) {
    const guild = channel.guild.cache;
    let channelp = channel.parentID;

    channel.clone().then(z => {
      let kanal = z.guild.channels.find(c => c.name === z.name);
      kanal.setParent(
        kanal.guild.channels.find(channel => channel.id === channelp)
      );
    });
  }
});

//

client.on("emojiDelete", async (emoji, message, channels) => {
  let emojik = await db.fetch(`emojik_${emoji.guild.id}`);
  if (emojik) {
    const entry = await emoji.guild
      .fetchAuditLogs({ type: "EMOJI_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == emoji.guild.owner.id) return;
    if (
      !emoji.guild.members.cache
        .get(entry.executor.id)
        .hasPermission("ADMINISTRATOR")
    ) {
      emoji.guild.emojis
        .create(`${emoji.url}`, `${emoji.name}`)
        .catch(console.error);
    }
  }
});

//KANAL & ROL & EMOJİ KORUMA SON

//KÜFÜR ENGEL

client.on("message", async msg => {
  const i = await db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Heey! Küfür Yasak.")
            .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("messageUpdate", async msg => {
  const i = db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Yakaladım Seni! Küfür Yasak.")
            .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//KÜFÜR ENGEL SON


//REKLAM ENGEL SON

//EVERYONE-HERE ENGEL

client.on("message", async msg => {
  let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`);
  if (hereengelle == "acik") {
    const here = ["@here", "@everyone"];
    if (here.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.permissions.has("ADMINISTRATOR")) {
        msg.delete();
        return msg
          .reply("Yakaladım Seni! Everyone ve Here Etiketlemek Yasak.")
          .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
      }
    }
  } else if (hereengelle == "kapali") {
  }
});

//EVERYONE-HERE ENGEL SON

//FAKE HESAP CEZA

client.on("guildMemberAdd", member => {
  var moment = require("moment");
  require("moment-duration-format");
  moment.locale("tr");
  var { Permissions } = require("discord.js");
  var x = moment(member.user.createdAt)
    .add(3, "days")
    .fromNow();
  var user = member.user;
  x = x.replace("birkaç saniye önce", " ");
  if (!x.includes("önce") || x.includes("sonra") || x == " ") {
    var rol = member.guild.roles.cache.get("CEZALI ROL İD"); //Cezalı Rol İD
    var kayıtsız = member.guild.roles.cache.get("ALINACAK ROL İD"); //Alınacak Rol İD
    member.roles.add(rol);
    member.user.send(
      "Hesabın 3 günden önce açıldığı için cezalıya atıldın! Açtırmak İçin Yetkililere Bildir."
    );
    setTimeout(() => {
      member.roles.remove(kayıtsız.id);
    }, 1000);
  } else {
  }
});

//FAKE HESAP CEZA SON

//-------------------- Mod Log Sistemi --------------------//

client.on("channelCreate", async channel => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`salvomodlog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.MessageEmbed()
    .addField(
      `Kanal oluşturuldu`,
      ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("channelDelete", async channel => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`salvomodlog_${channel.guild.id}`)
  );
  if (!c) return;
  let embed = new Discord.MessageEmbed()
    .addField(
      `Kanal silindi`,
      ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );

  c.send(embed);
});

client.on("channelNameUpdate", async channel => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`salvomodlog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.MessageEmbed()
    .addField(
      `Kanal İsmi değiştirildi`,
      ` Yeni İsmi: \`${channel.name}\`\nID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("emojiCreate", emoji => {
  const c = emoji.guild.channels.cache.get(
    db.fetch(`salvomodlog_${emoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji oluşturuldu`,
      ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\nID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiDelete", emoji => {
  const c = emoji.guild.channels.cache.get(
    db.fetch(`salvomodlog_${emoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji silindi`,
      ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\nID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiUpdate", (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(
    db.fetch(`salvomodlog_${newEmoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.MessageEmbed()
    .addField(
      `Emoji güncellendi`,
      ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\nID: ${oldEmoji.id}`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`,
      newEmoji.client.user.avatarURL
    );

  c.send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  const channel = guild.channels.cache.get(db.fetch(`salvomodlog_${guild.id}`));
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `Kullanıcı banlandı`,
      ` İsmi: \`${user.username}\`\n ID: **${
        user.id
      }**\n Sebep: **${entry.reason || "Belirtmedi"}**\n Banlayan: **${
        entry.executor.username
      }#${entry.executor.discriminator}**`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${entry.executor.username}#${entry.executor.discriminator} tarafından`,
      entry.executor.avatarURL
    );

  channel.send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  const channel = guild.channels.cache.get(db.fetch(`salvomodlog_${guild.id}`));
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `Kullanıcının banı açıldı`,
      ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`
    )
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${entry.executor.username}#${entry.executor.discriminator} tarafından`,
      entry.executor.avatarURL
    );

  channel.send(embed);
});
client.on("messageDelete", async message => {
  if (message.author.bot) return;

  const channel = message.guild.channels.cache.get(
    db.fetch(`salvomodlog_${message.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .setAuthor(
      `${message.author.username}#${message.author.discriminator}`,
      message.author.avatarURL
    )
    .setTitle("Mesaj silindi")
    .addField(
      `Silinen mesaj : ${message.content}`,
      `Kanal: ${message.channel.name}`
    )
    .addField(`Kanal:`, `${message.channel.name}`)
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${message.client.user.username}#${message.client.user.discriminator}`,
      message.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (oldMessage.content == newMessage.content) return;

  const channel = oldMessage.guild.channels.cache.get(
    db.fetch(`salvomodlog_${oldMessage.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ", `${oldMessage.content}`)
    .addField("Yeni mesaj : ", `${newMessage.content}`)
    .addField("Kanal : ", `${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("Black")
    .setFooter(
      `${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,
      `${oldMessage.client.user.avatarURL}`
    );

  channel.send(embed);
});

client.on("roleCreate", async role => {
  const channel = role.guild.channels.cache.get(
    db.fetch(`salvomodlog_${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)
    .setTimestamp()
    .setColor("Black")
    .addField("Rol renk kodu : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("roleDelete", async role => {
  const channel = role.guild.channels.cache.get(
    db.fetch(`salvomodlog_${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.MessageEmbed()
    .addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)
    .setTimestamp()
    .setColor("Black")
    .addField("Rol renk kodu : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});
client.on("voiceStateUpdate", (oldMember, newMember) => {
  if (db.has(`salvomodlog_${oldMember.guild.id}`) === false) return;

  var kanal = oldMember.guild.channels.cache.get(
    db
      .fetch(`salvomodlog_${oldMember.guild.id}`)
      .replace("<#", "")
      .replace(">", "")
  );
  if (!kanal) return;

  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    const embed = new Discord.MessageEmbed()
      .setColor("Black")
      .setDescription(
        `${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`
      );
    kanal.send(embed);
  } else if (newUserChannel === undefined) {
    const embed = new Discord.MessageEmbed()
      .setColor("Black")
      .setDescription(
        `${newMember.user.tag} adlı kullanıcı sesli kanaldan çıkış yaptı!`
      );
    kanal.send(embed);
  }
});

client.on("ready", () => {
  setInterval(function() {
    let ChannelsAmca = client.channels.cache.get("");
    if (ChannelsAmca) ChannelsAmca.send("");
  }, 600000); //1000 = 1 sn //10000 = 10 sn //60000 = 1dk
});
const knaveqwe = [
  "Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.",
  "Mavi gözlerin, gökyüzü oldu dünyamın.",
  "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
  "Huzur kokuyor geçtiğin her yer.",
  "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
  "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
  "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
  "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
  "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
  "Etkili gülüş kavramını ben senden öğrendim.",
  "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
  "Gözlerinle baharı getirdin garip gönlüme.",
  "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
  "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
  "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
  "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
  "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
  "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
  "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
  "Biraz Çevrendeki İnsanları Takarmısın ?",
  "İğrenç İnsansın!",
  "Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.",
  "Onu Bunu Boşver de bize gel 2 bira içelim.",
  "Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.",
  "Knave seni çok sevdi...",
  "Mucizelerden bahsediyordum."
];

client.on("message", async message => {
  if (message.channel.id !== "839846989511393310") return;
  let Knavedev = db.get("chatiltifat");
  await db.add("chatiltifat", 1);
  if (Knavedev >= 20) {
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * (knaveqwe.length - 1) + 1);
    message.reply(`${knaveqwe[random]}`);
  }
});
client.on("ready", async () => {
  var sunucuID = "834493134976188416";
  var kanalID = "839414609517608961";
  var yazilacaklar = [`Ay adam`, `Mendil`, `Sırık`, `Horhor`];
  // BU ŞEKİLDE YAZILACAKLARI ÇOĞALTABİLİRSİNİZ
  setInterval(async () => {
    let random = Math.floor(Math.random() * yazilacaklar.length);
    client.guilds.cache
      .get(sunucuID)
      .channels.cache.get(kanalID)
      .setTopic(`${yazilacaklar[random]}`);
  }, 1000 * 5); // 20 yazan yer 20 saniyede bir olduğunu belirtir. Değiştirebilirsiniz.
});

const Jimp = require("jimp");

client.on("guildMemberAdd", async member => {
  const channelID = "831538625475903550";
  const channel = member.guild.channels.cache.get(channelID);
  if (!channel) return;
  let username = member.user.username;

  const bg = await Jimp.read(
    "https://cdn.discordapp.com/attachments/512709151084904478/513729632604913666/guildAdd.png"
  );
  const userimg = await Jimp.read(
    member.user.avatarURL() ? member.user.avatarURL() : client.user.avatarURL()
  );

  var font;
  if (member.user.tag.length < 15)
    font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
  else if (member.user.tag.length > 15)
    font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

  await bg.print(font, 430, 170, member.user.tag);
  await userimg.resize(362, 362);
  await bg
    .composite(userimg, 43, 26)
    .write("./giris-cikis/" + member.id + "giris.png");

  setTimeout(() => {
    channel.send(
      new Discord.MessageAttachment("./giris-cikis/" + member.id + "giris.png")
    );
  }, 1000);

  setTimeout(() => {
    fs.unlink("./giris-cikis/" + member.id + "giris.png");
  }, 10000);
});

client.on("guildMemberAdd", member => {
  const kanal = member.guild.channels.cache.find(
    r => r.id === "839414609517608961"
  ); //HOŞGELDİN MESAJI ATILACAĞI KANAL IDSINI GİRİN ÖRNEĞİN UNREGİSTER CHATİ

  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gecen = moment
    .duration(kurulus)
    .format(
      `YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`
    );

  var kontrol;
  if (kurulus < 1296000000) kontrol = "840595081065005077";
  if (kurulus > 1296000000) kontrol = "840595211460542464";
  moment.locale("tr");
  kanal.send(
    " Sunucumuza Hoş Geldin ! <@" +
      member +
      "> \n\n Hesabın " +
      gecen +
      " Önce Oluşturulmuş " +
      kontrol +
      " \n\n Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek. \n\n Seninle beraber **" +
      member.guild.memberCount +
      "** kişi olduk:)) İyi eğlenceler !"
  );
});
