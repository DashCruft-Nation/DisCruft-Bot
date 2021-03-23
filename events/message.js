module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (message.author.bot || message.channel.type === 'dm') return;

	const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

    const prefix = `?`;

    if (!message.content.startsWith(prefix)) return;
    const commandfile = client.commands.get(cmd.slice(prefix.length).toString().toLowerCase()) || client.commands.get(client.aliases.get(cmd.slice(prefix.length).toString().toLowerCase()));;
    if (commandfile) {
        commandfile.run(client, message, args);
    }
}