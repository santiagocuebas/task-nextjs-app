import { Router } from 'express';
import { getId } from '../libs/libs.js';
import { isLoggedIn } from '../middlewares/logged.js';
import { validate } from '../middlewares/validation.js';
import { Link } from '../models/index.js';
import { arrayLink, arrayEditLink } from '../validations/array-validations.js';

const router = Router();

router.use(isLoggedIn);

router.post(
	'/add',
	validate(arrayLink),
	async (req, res) => {
		// Create a new link
		const link: Link = await Link.create({
			id: await getId(),
			authorId: req.user.id,
			title: req.body.title,
			url: req.body.url,
			description: req.body.description
		}).save();

		return res.json({ link });
	}
);

router.put(
	'/edit/:id',
	validate(arrayEditLink),
	async (req, res) => {
		// Update link
		await Link.update({ id: req.params.id }, {
			title: req.body.title,
			url: req.body.url,
			description: req.body.description
		});

		return res.json({ edit: true });
	}
);

router.delete('/delete/:id', async (req, res) => {
	// Delete link
	await Link.delete({ id: req.params.id, authorId: req.user.id });

	return res.json({ delete: true });
});

export default router;
