const {RichEmbed} = require('discord.js');

exports.run = (client, message) => {
	let user = message.mentions.users.first();
	if (message.mentions.users.size < 1) 
		user = message.author;
	
  const embed = new RichEmbed()
  		.setColor(0x7f26c0)
  		.setDescription(`**${message.author} punchs ${user} :punch: **`);
  		return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'punch',
  description: 'Punch someone',
  usage: 'punch [@User]'
};
