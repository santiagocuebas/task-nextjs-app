import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/lib/global';
import styles from '@/styles/Sign.module.css';
import Form from '@/components/Form';
import ErrorBox from '@/components/ErrorBox';
import { useState } from 'react';
import Layout from '@/components/Layout';
import Link from "next/link";
import { GetServerSideProps } from 'next';

const Signup: NextPageWithLayout = () => {
	const [errors, setErrors] = useState(null);

	return (
		<div className={styles.sign}>
			<h2>Signup</h2>
			<Form action='http://localhost:4200/api/auth/signup' method={'POST'} errors={setErrors} >
				{errors ? <ErrorBox hide={setErrors} errors={errors} /> : <></>}
				<input className={styles['sign-input']} type='text' name='firstname' placeholder='Firstname' />
				<input className={styles['sign-input']} type='text' name='lastname' placeholder='Lastname' />
				<input className={styles['sign-input']} type='email' name='email' placeholder='Email' />
				<input className={styles['sign-input']} type='password' name='password' placeholder='Password' />
				<input className={styles['sign-input']} type='password' name='confirmPassword' placeholder='Confirm Password' />
				<button className={styles['sign-button']}>
					Signup
				</button>
			</Form>
			<div className={styles.footer}>
      	<Link href={'/login'}>Already have an account?</Link>
			</div>
		</div>
	)
}

Signup.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	if (req.cookies['authenticate']) {
		return {
			redirect: {
				destination: '/profile',
				permanent: true
			}
		}
	}

	return {
		props: { }
	}
}

export default Signup;
