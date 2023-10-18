import { Router } from 'express';
import {
	encryptPassword,
	getId,
	getSerializedCookie,
	deleteCookie
} from '../libs/libs.js';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/logged.js';
import { validate } from '../middlewares/validation.js';
import { User } from '../models/index.js';
import { arraySignup, arrayLogin } from '../validations/array-validations.js';

const router = Router();

router.post(
	'/login',
	isNotLoggedIn,
	validate(arrayLogin),
	async (req, res) => {
		// Search a user
		const user = await User.findOneBy({ email: req.body.email }) as User;

		// Create user cookie
		const serializedCookie = getSerializedCookie(user);

		res.set('Set-Cookie', serializedCookie);

		return res.json({ id: user.id });
	}
);

router.post(
	'/signup',
	isNotLoggedIn,
	validate(arraySignup),
	async (req, res) => {
		// Create a new user
		const user = await User.create({
			id: await getId('User', 16),
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: await encryptPassword(req.body.password)
		}).save();

		// Create user cookie
		const serializedCookie = getSerializedCookie(user);

		res.set('Set-Cookie', serializedCookie);
		
		return res.json({ id: user.id });
		
	}
);

router.post(
	'/logout',
	isLoggedIn,
	(_req, res) => {
		// Delete user cookie
		const serializedCookie = deleteCookie();

		res.set('Set-Cookie', serializedCookie);

		return res.json({ url: '/' });
	}
);

export default router;
