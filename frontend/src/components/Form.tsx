import { FormEventHandler } from 'react';
import type { FormProp } from '@/lib/props';
import axios from 'axios';
import styles from '@/styles/Form.module.css';

export default function Form({ children, action, method, errors }: FormProp) {
	const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;

		const data = await axios({
			method: form.method,
			url: form.action,
			withCredentials: true,
			data: form
		}).then(res => res.data);
	
		if (typeof data.id === 'string') {
			window.location.href = '/profile';
		}

		if (data.message) console.log(data.message);

		if (data.errors) errors(data.errors);
	};

	return (
		<form action={action} method={method} className={styles.form} onSubmit={handleSubmit}>
			{children}
		</form>
	)
}
