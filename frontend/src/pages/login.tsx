import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/lib/global';
import styles from '@/styles/Sign.module.css';
import Form from '@/components/Form';
import ErrorBox from '@/components/ErrorBox';
import { useState } from 'react';
import Layout from '@/components/Layout';
import Link from "next/link";
import { GetServerSideProps } from 'next';

const Login: NextPageWithLayout = () => {
	const [errors, setErrors] = useState(null);

	return (
		<div className={styles.sign}>
			<h2>Login</h2>
			<Form action='http://localhost:4200/api/auth/login' method={'POST'} errors={setErrors} >
				{errors ? <ErrorBox hide={setErrors} errors={errors} /> : <></>}
				<input className={styles['log-input']} type='email' name='email' placeholder='Email' />
				<input className={styles['log-input']} type='password' name='password' placeholder='Password' />
				<button className={styles['log-button']}>
					Login
				</button>
			</Form>
			<div className={styles.footer}>
				Don&apos;t have an account?
				<Link href={'/signup'}>Subscribe!</Link>
			</div>
		</div>
	)
}

Login.getLayout = function getLayout(page: ReactElement) {
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

export default Login;
