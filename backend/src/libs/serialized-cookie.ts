import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import { SECRET, NODE_ENV, DOMAIN } from '../config.js';
import { User } from '../models/index.js';

export const getSerializedCookie = (user: User): string => {
	const token = jwt.sign({
		user: {
			id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email
		},
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
	}, SECRET);

	return serialize('authenticate', token, {
		httpOnly: true,
		secure: NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 30,
		domain: DOMAIN,
		path: '/'
	});
};

export const deleteCookie = () => {
	return serialize('authenticate', '', {
		httpOnly: true,
		secure: NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 0,
		domain: DOMAIN,
		path: '/'
	});
};
