/* eslint-disable no-unused-vars */

const usedCommand = new Set();

module.exports.run = async (client, message, args) => {
	if (usedCommand.has(message.author.id)) {
		return message.reply(`bro wtf you can't fart more then 1 time each minute.\nshow some respect 🤢🤢`)
	} else {
		message
			.reply({
				embed: {
					description: 'Uh i think **' + message.author.username + '** feels bad man',
					color: 'RANDOM',
					timestamp: new Date()
				},
				allowedMentions: {
					repliedUser: false
				}
			})
			.then((msg) => {
				setTimeout(() => {
					msg.edit({
						embed: {
							description: `${message.author.username} are u ok? ur green at face 🤢`,
							color: 'RANDOM',
							timestamp: new Date()
						}
					});
				}, 3000);
				setTimeout(() => {
					msg.edit({
						embed: {
							description: 'dude? why are u vomiting???? 🤮',
							color: 'RANDOM',
							timestamp: new Date()
						}
					});
				}, 6000);
				setTimeout(() => {
					msg.edit({
						embed: {
							description: 'oh no no NO dont dont do it',
							color: 'RANDOM',
							timestamp: new Date()
						}
					});
				}, 9000);
				setTimeout(() => {
					msg.edit({
						embed: {
							description: '🤮💨',
							color: 'RANDOM',
							timestamp: new Date()
						}
					});
				}, 12000);
				setTimeout(() => {
					msg.edit({
						embed: {
							description: '🤮💨💨',
							color: 'RANDOM',
							timestamp: new Date()
						}
					});
				}, 13000);
				setTimeout(() => {
					msg.edit({
						embed: {
							description: '🤮💨💨💨',
							color: 'RANDOM',
							timestamp: new Date()
						}
					});
				}, 14000);
				setTimeout(() => {
					msg.edit({
						embed: {
							description: '🤮💨💨💨💨',
							color: 'RANDOM',
							timestamp: new Date()
						}
					});
				}, 15000);
				setTimeout(() => {
					msg.edit({
						embed: {
							description: '🤮💨💨💨💨💨',
							color: 'RANDOM',
							timestamp: new Date()
						}
					});
				}, 16000);
				setTimeout(() => {
					msg.edit({
						embed: {
							description: '🤮💨💨💨💨💨💨',
							color: 'RANDOM',
							timestamp: new Date()
						}
					});
				}, 17000);
				setTimeout(() => {
					msg.edit({
						embed: {
							description: 'the world have been exploded since ' + `${message.author.username} has been farted on all. 👼👼`,
							color: 'RANDOM',
							timestamp: new Date()
						}
					});
				}, 20000);
			});
		await usedCommand.add(message.author.id);
		setTimeout(async () => {
			await usedCommand.delete(message.author.id)
		}, 60000);
	}
};
module.exports.config = {
	name: 'fart',
	aliases: [],
	description: 'Use this command to fart 🤮',
};