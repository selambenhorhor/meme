const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "memer",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk <sebep>"
};

exports.run = async (client, message, args) => {

    const data = await fetch(`https://meme-api.herokuapp.com/gimme`)
    .then(res => res.json())
    .catch(()=>null);

    if (!data){
      return message.channel.send(`Server Error 5xx: Meme API is currently down!`);
    };


    return message.channel.send(
      new MessageEmbed()
      .setColor('GREY')
      .setImage(data.url)
      .setAuthor(data.title, null, data.postLink)
      .setFooter(`${data.subreddit}:Meme | \©️${new Date().getFullYear()} HORHORİK`)
    );
  };
