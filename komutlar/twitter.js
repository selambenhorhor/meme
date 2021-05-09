const { MessageAttachment } = require("discord.js");


exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'twitter'
};

exports.run = async (client, message, args) => {
    if(!args.length) return message.channel.send("Baka! What am I supposed to tweet?");

    const text = args.join(" ");

    if(text.length > 165) return message.channel.send("Yazdığın yazı 165 karakterden fazla! ");
 
    const image = await this.client.image.tweet(text);

    return message.send(new MessageAttachment(image, "tweet.png"));
  }

