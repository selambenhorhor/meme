const Discord = require('discord.js')
const joke = require('one-liner-joke').getRandomJoke

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    try {
        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(joke({
                exclude_tags: ['dirty', 'racist', 'marriage', 'sex', 'death']
            }).body)
            .setFooter(` ${message.author.tag}`, message.author.avatarURL())
            .setTimestamp()
        )
    } catch (err) {
              const errors = require('e')

    errors.embedError(err, message)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['randomjoke'],
    guildOnly: false,
    permLevel: 'User'
}

exports.help = {
    name: 'joke',
    category: 'Fun',
    description: 'Returns a random joke.',
    usage: 'joke'
}