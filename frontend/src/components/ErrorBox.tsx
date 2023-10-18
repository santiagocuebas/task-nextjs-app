import type { MouseEventHandler } from 'react';
import type { ErrorProp } from '@/lib/props';
import styles from'@/styles/ErrorBox.module.css';
import { FaTimes } from 'react-icons/fa';

export default function ErrorBox({ hide, errors }: ErrorProp) {
  const errs: string[] = Object.keys(errors);

	const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
		e.preventDefault();
		hide(null);
	}

  return (
    <div className={styles.error}>
      <div>
        <p>The following errors have been found:</p>
        <ul>
          {errs.map(err => <li key={err}>{errors[err]}</li>)}
        </ul>
      </div>
      <button onClick={handleClick}>
        <FaTimes />
      </button>
    </div>
  )
}
