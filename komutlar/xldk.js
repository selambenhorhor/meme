const { get } = require("snekfetch");

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['xkcd'],
  permLevel: 0
};

exports.help = {
  name: "xkcd",
  description: "5 dakika sonra efekti",
  usage: "afewlater"
};

    
  
exports.run = async (client, message, args) => {   
    const inf = await get("https://xkcd.com/info.0.json");
    const ob = await inf.body;
    if (message.flags[0] === "f") {
      if (!args[0]) return message.reply(`Please make a selection between 1 - ${ob.num}`);
      if (args[0].isNumber() !== true) return message.reply("Please make a numerical selection.");
      if (args[0] > ob.num || args[0] <= 0) return message.reply(`Please make a selection between 1 - ${ob.num}`);
      const ef = await get(`https://xkcd.com/${args[0]}/info.0.json`);
      const ab = await ef.body;
      return message.channel.send({"embed": {"author":{"name":"Misaki | XKCD Comics"}, "description":`${ab.title} | #${ab.num}\n${ab.alt}`, "image":{"url":ab.img}}});
    }
    if (message.flags[0] === "r") {
      const rn = this.randomNum(1, ob.num);
      const ef = await get(`https://xkcd.com/${rn}/info.0.json`);
      const ab = await ef.body;
      return message.channel.send({"embed": {"author":{"name":"Misaki | XKCD Comics"}, "description":`${ab.title} | #${ab.num}\n${ab.alt}`, "image":{"url":ab.img}}});
    }
    message.channel.send({"embed": {"author":{"name":"Misaki | Daily XKCD Comics"}, "description":`${ob.title} | #${ob.num}\n${ob.alt}`, "image":{"url":ob.img}}});
  }
