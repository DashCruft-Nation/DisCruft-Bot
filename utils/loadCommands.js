/* eslint-disable max-nested-callbacks */
const fs = require('fs');

function loadCommands(client) {
	fs.readdir('commands/', (err, cmdfolders) => {

		if (err) console.log(err);

		if(!cmdfolders[0]) return console.log('Client couldn\'t find any commands in the commands folder!');
		cmdfolders.forEach((cmdfolder) => {
			fs.readdir(`commands/${cmdfolder}`, (err, cmds) => {
				if (!cmds) return console.error(`Client couldn't find any commands in the ${cmdfolder} folder!`);
				cmds = cmds.filter(z => z.split('.')[1] === 'js');
				cmds.forEach((cmd) => {
					const pull = require(`../commands/${cmdfolder}/${cmd}`);
					client.commands.set(pull.config.name, pull);
					pull.config.aliases.forEach((alias) => {
						client.aliases.set(alias, pull.config.name);
					});
				});
			});
		});
	});
}

module.exports = loadCommands;
