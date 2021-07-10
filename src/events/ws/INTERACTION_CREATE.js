module.exports = (client, interaction) => {
	const cmd = interaction.data.name.toLowerCase();
	const args = interaction.data.options;

	const cmdfile = client.slashcommands.get(cmd);
	if(!cmdfile) {
		return client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: 'Unable to find that command!',
				},
			},
		});
	}
	cmdfile.run(client, interaction, args);
};