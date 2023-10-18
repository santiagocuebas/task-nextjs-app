import styles from'@/styles/Footer.module.css';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
			<p>imgShare.io | &#169; Copyright 2022</p>
			<a href="https://github.com/santiagocuebas?tab=repositories" target="_blank" rel="noreferrer">
				<FaGithub size={32} />
			</a>
		</footer>
  )
}
