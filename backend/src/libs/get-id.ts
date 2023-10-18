import { User, Link } from '../models/index.js';

export const getId = async (identifier = '', num = 32): Promise<string> => {
	const validChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let id = '';

	for (let i = 0; i < num; i++) {
		id += validChar.charAt(Math.random() * validChar.length);
	}

	if (identifier === 'User') {
		const user = await User.findOneBy({ id });
		if (user !== null) getId(identifier, num);
	} else {
		const link = await Link.findOneBy({ id });
		if (link !== null) getId();
	}

	return id;
};
