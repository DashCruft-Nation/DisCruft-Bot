/* eslint-disable no-unused-vars */
/* eslint-disable no-delete-var */
const Discord = require('discord.js');
/**
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.run = async (bot, message, args) => {
	if (!message.member.roles.cache.has('652615952709451825')) return message.reply('This command is only allowed to `Contributors` for now, it may soon be available to everyone after being tested', { allowedMentions: { repliedUser: false } });
	if (!args[0]) return message.reply('Please provide something to evaluate!', { allowedMentions: { repliedUser: false } });
	const evaled = await evaluate(args.join(' ')) || 'No response!';
	message.channel.send(evaled);
};
module.exports.config = {
	name: 'sandbox',
	description: 'A eval command to test codes of basic JS for everyone',
	aliases: ['sb', 'sand-box'],
};

async function evaluate(args) {
	if (args.includes('process')) return;
	if (args.includes('while')) return;
	if (args.includes('fs')) return;
	if (args.includes('this')) return;
	if (args.includes('console')) return;
	if (args.includes('eval')) return;
	if (args.split('for')[1]) {
		let result = true;
		args.split('for').forEach(arg => {
			if (arg.startsWith('Each')) result = false;
		});
		if (result == true) return;
	}
	if (args.includes('require')) return;
	try {
		let evaled;

		if (args.includes('await')) {
			evaled = await eval(`(async () => { ${args} })();`);
		}
		else { evaled = eval(args); }
		if (typeof evaled !== 'string') {
			evaled = require('util').inspect(evaled, { depth: 0 });
		}
		return `\`\`\`xl\n${clean(evaled)}\n\`\`\``;
	}
	catch (err) {
		return `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``;
	}
}

function clean(text) {
	if (typeof (text) === 'string') {
		return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
	}
	else { return text; }
}