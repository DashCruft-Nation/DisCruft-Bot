const fs = require('fs');

module.exports = async (client) => {
	fs.readdir('./src/slashcommands', (err, files) => {
		if(err) throw err;

		files.forEach((file) => {
			const slashcmd = require(`../slashcommands/${file}`);
			client.slashcommands.set(slashcmd.config.name, slashcmd);
		});
	});
};