const fs = require('fs');
const path = require('path');
module.exports = client => {
	fs.readdir(path.join(__dirname, '../', 'events/process'), (_err, files) => {
		files.forEach((file) => {
			if (!file.endsWith('.js')) return;
			const event = require(`../events/process/${file}`);
			const eventName = file.split('.')[0];
			process.on(eventName, event.bind(null, client));
			delete require.cache[require.resolve(`../events/process/${file}`)];
		});
	});
};