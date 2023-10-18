import { Router } from 'express';
import { isLoggedIn } from '../middlewares/logged.js';
import { Link, User } from '../models/index.js';
import { deleteCookie } from '../libs/libs.js';

const router = Router();

router.use(isLoggedIn);

router.get('/links', async (req, res) => {
	// Get all user links
	const links = await Link.find({
		where: { authorId: req.user.id },
		order: { createdAt: 'DESC' }
	});

	return res.json({ user: req.user, links });
});

router.delete('/delete', async (req, res) => {
	// Delete user an your links
	await Link.delete({ authorId: req.user.id });
	await User.delete({ id: req.user.id });

	// Delete user cookie
	const serializedCookie = deleteCookie();

	res.set('Set-Cookie', serializedCookie);

	return res.json({ url: '/' });
});

export default router;
