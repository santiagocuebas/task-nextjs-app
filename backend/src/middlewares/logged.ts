import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
import { Direction } from '../global.js';
import { deleteCookie } from '../libs/serialized-cookie.js';

export const isLoggedIn: Direction = (req, res, next) => {
	try {
		const token = req.cookies['authenticate'];
		if (token === undefined) throw 'Error';
		const decoded = jwt.verify(token, SECRET) as jwt.JwtPayload;
		req.user = decoded.user;

		return next();
	} catch {
		const serializedCookie = deleteCookie();
		res.set('Set-Cookie', serializedCookie);
		return res.json({ message: 'Invalid token' });
	}
};

export const isNotLoggedIn: Direction = (req, res, next) => {
	try {
		const token = req.cookies['authenticate'];
		if (token === undefined) throw 'Error';
		jwt.verify(token, SECRET);

		return res.json({ message: 'Logged' });
	} catch {
		return next();
	}
};
