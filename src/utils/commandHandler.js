/* This is in works and has no connection to the main code as of now */


class CommandManager {
	/**
     * @description Command manager for the commands!
     * @returns CommandManager
     */
	constructor() {
		this.data = new Map(new Command().name, new Command());
		this.amount = this.data.size;
	}
}

class CommandOptions {
	/**
     * @param {String} name
     * @param {String} description
     * @param {String[]} aliases
     */
	constructor(name, description, aliases) {
		this.name = name;
		this.description = description;
		this.aliases = aliases;
	}

	/**
     * @param {Object} options
     */
	static resolvable(options) {
		if(!options.name) throw new Error('No name option provided');
		if(!options.description) throw new Error('No description option provided');
		if(!options.aliases) throw new Error('No aliases option provided');
		if(typeof options.name !== 'string') throw new Error('Provided Name is not a string!');
		if(typeof options.func !== 'function') throw new Error('Provided function is not a function!');
		if(!Array.isArray(options.aliases)) throw new Error('Provided Aliases is not an array!');
		if(typeof options.description !== 'string') throw new Error('Provided Description is not a string');
		return options;
	}
}

class Command {
	/**
     * @param {String} name Name of the command
     * @param {Function} func Function of the command
     * @param {CommandOptions} options Options of the command
     * @description Makes a new command to be accessed by the bot!
     * @returns Command
     */
	constructor(name, func, options) {
		//		if(typeof CommandOptions.resolvable(options) !== 'object') return;
		this.run = func;
		this.config = new CommandOptions(options.name, options.description, options.aliases);
		this.config.name = name;
	}

	/**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
	run(client, message, args) {
		this.run(client, message, args);
	}

	/**
     * @param {Function} func
     */
	setFunction(func) {
		this.run = func;
	}

	/**
     * @param {String} name Returns the name of the command
     */
	get name() {
		return this.config.name;
	}

	/**
     * @param {String} name The new name of the command
     */
	setName(name) {
		if(name) {
			this.config.name = name;
		}
	}
	setOptions(options) {
		if(typeof CommandOptions.resolvable(options) !== 'object') return;
		this.options = options;
	}
}

module.exports = {
	Command,
	CommandManager,
	CommandOptions,
};