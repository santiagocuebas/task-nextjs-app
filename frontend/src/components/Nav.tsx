import { useOutClick } from '@/lib/out-click';
import styles from'@/styles/Nav.module.css';
import axios from 'axios';
import Link from 'next/link';
import { MouseEventHandler, useRef, useState } from 'react';
import { FaEllipsisH, FaRegCaretSquareRight, FaTimesCircle } from 'react-icons/fa';

export default function Nav() {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);

	useOutClick(ref, setVisible, null);

	const handleLogout: MouseEventHandler<HTMLAnchorElement> = async e => {
		e.preventDefault();

		setVisible(false);

		const data = await axios({
			method: 'POST',
			url: 'http://localhost:4200/api/auth/logout',
			withCredentials: true
		}).then(res => res.data);

		if (data.message) console.log(data.message);

		if (typeof data.url === 'string') {
			window.location.href = '/login';
		}
	};

	const handleDelete: MouseEventHandler<HTMLAnchorElement> = async e => {
		e.preventDefault();

		setVisible(false);

		const data = await axios({
			method: 'DELETE',
			url: 'http://localhost:4200/api/user/delete',
			withCredentials: true
		}).then(res => res.data);

		if (data.message) console.log(data.message);

		if (typeof data.url === 'string') {
			window.location.href = '/';
		}
	};

	return (
		<nav className={styles.nav}>
			<h2>FAVORITE LINKS</h2>
			<ul className={styles.list}>
				<Link href='/logout' onClick={handleLogout}>
					<li>Logout</li>
				</Link>
				<span>|</span>
				<Link href='/deleteuser' onClick={handleDelete}>
					<li>Delete User</li>
				</Link>
			</ul>
			<button onClick={() => setVisible(!visible)}>
				<FaEllipsisH size={20} />
			</button>
			{
				visible
					? <ul ref={ref} className={styles.occult}>
							<Link href='/logout' className={styles.link} onClick={handleLogout}>
								<FaRegCaretSquareRight size={18} />
								<li>Logout</li>
							</Link>
							<Link href='/deleteuser' className={styles.link} onClick={handleDelete}>
								<FaTimesCircle size={18} />
								<li>Delete User</li>
							</Link>
						</ul>
					: null
			}
		</nav>
	)
}
