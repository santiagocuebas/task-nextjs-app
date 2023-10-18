import type { FormEventHandler } from 'react';
import styles from'@/styles/FormLink.module.css';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useOutClick } from '@/lib/out-click';
import { FormLinkProp } from '@/lib/props';

export default function FormLink({ children, errors, add, edit, delet, link, setVisible, setLink }: FormLinkProp) {
	const ref = useRef(null);
	const [action, setAction] = useState('');
	const [method, setMethod] = useState('');

	useOutClick(ref, setVisible, setLink);

	function handleAdd() {
		setAction('http://localhost:4200/api/link/add');
		setMethod('POST');
	}

	function handleEdit() {
		setAction('http://localhost:4200/api/link/edit/' + link?.id);
		setMethod('PUT');
	}

	async function handleDelete() {
		setAction('http://localhost:4200/api/link/delete/' + link?.id);
		setMethod('DELETE');
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;

		const data = await axios({
			method: form.getAttribute('method') as string,
			url: form.action,
			withCredentials: true,
			data: form
		}).then(res => res.data);

		if (data.message) console.log(data.message); 

		if (data.errors) {
			errors(data.errors as never);
		}

		if (data.delete && link) {
			delet(link.id)
		}
		
		if (data.edit && link) {
			const formData = new FormData(form);

			const title = formData.get('title') as string;
			const url = formData.get('url') as string;
			const description = formData.get('description') as string;

			edit(link.id, title, url, description);
		}
		
		if (data.link) {
			add(data.link);
		}
	};
	return (
		<form ref={ref} className={styles.form} action={action} method={method} onSubmit={handleSubmit}>
			{children}
			<input
				type='text' name='title' placeholder='Title' defaultValue={link ? link.title : ''}
			/>
			<input
				type='url' name='url' placeholder='URL' defaultValue={link ? link.url : ''}
			/>
			<textarea name="description" placeholder="Description" rows={5}  spellCheck="false" defaultValue={link ? link.description : ''}></textarea>
			{
				link 
					? <>
							<button className={styles.delete} onClick={handleDelete}>
								Delete
							</button>
							<button className={styles.edit} onClick={handleEdit}>
								Edit
							</button>
						</>
					: <button className={styles.add} onClick={handleAdd}>
							Add Link
						</button>
			}
		</form>
	)
}
