/* eslint-disable no-unused-vars */
function pepeSize() {
	const random = Math.floor(Math.random() * 13) + 1;
	const randomEqualSigns = '='.repeat(random);
	const pepesize = `8${randomEqualSigns}>`;

	return pepesize;
}

function clean(text) {
	if (typeof (text) === 'string') {
		return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
	}
	else {return text;}
}