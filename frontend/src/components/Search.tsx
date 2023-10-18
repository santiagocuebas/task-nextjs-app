import { ILink } from '@/lib/global';
import styles from'@/styles/Search.module.css';
import { ChangeEventHandler } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Search({ links, setLinks }: any) {
	const handleInput: ChangeEventHandler<HTMLInputElement> = e => {
		const reloadLinks = links.filter((link: ILink) => {
			return link.title.toLowerCase().includes(e.target.value);
		});

		setLinks(reloadLinks);
	};

  return (
    <div className={styles.search}>
			<div>
				<FaSearch size={24} />
				<input type="text" onChange={handleInput} />
				<div></div>
			</div>
		</div>
  )
}
