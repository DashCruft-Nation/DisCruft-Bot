/* eslint-disable no-unused-vars */
const { Client, Message } = require('discord.js');
const _os = require('os-utils');
/**
 * JSDOC
 * @param {Client} client
 */
module.exports = client => {
	console.log(`${client.user.tag} is online!`);
  const arrayOfStatus = [
    'BEING FUNNY',
    '?help | MADE BY POG OPEN-SOURCE CONTRIBUTORS'
];

let index = 0;
setInterval(() => {
  if(index === arrayOfStatus.length) index = 0;
  const status = arrayOfStatus[index];
 
  client.user.setActivity(status, { type: 5 }).catch(console.error)
  index++;
}, 10000);
	setInterval(() => {
		try {
			client.cpuusage = '';
			_os.cpuUsage(c => {
				if ((c * 100).toString().split('.')[1]) {
					client.cpuusage = `${(c * 100).toString().split('.')[0] + '.' + (c * 100).toString().split('.')[1].split('')[0] + (c * 100).toString().split('.')[1].split('')[1]}%`;
				}
				else {
					client.cpuusage = `${(c * 100).toString().split('.')[0]}%`;
				}

			});
		}
		catch (er) {
			console.error(er);
		}
	}, 1000 * 5);
};
