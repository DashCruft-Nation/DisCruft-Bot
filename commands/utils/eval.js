module.exports.run = async (client, message, args) => {
    const allowedDevs = ['361645744001908736', '515204641450098704', '633730629560958976'];
    if (!allowedDevs.includes(message.author.id)) {
        return message.channel.send('This is a dev only command.');
    }
    args = args.join(' ');
    try {
        let evaled;
        
        if (args.includes('await')) {
            evaled = await eval(`(async () => { ${args} })();`);
        }
        else evaled = eval(args);
        if (typeof evaled !== 'string') {
            evaled = require('util').inspect(evaled);
        }
        message.channel.send(`\`\`\`xl\n${clean(evaled)}\n\`\`\``);
    }
    catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
};
module.exports.config = {
    name: 'eval',   
    aliases: [],
};

function clean(text) {
    if (typeof (text) === 'string') {
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    }
    else return text;
}
