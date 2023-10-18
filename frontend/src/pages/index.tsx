import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/lib/global";
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout';
import Link from "next/link";
import { GetServerSideProps } from "next";

const Home: NextPageWithLayout = () => {
	return (
		<div className={styles.index}>
			<h1>Favorite Links</h1>
			<h2><i>Store your favorite Website&apos;s Links</i></h2>
			<Link href={'/login'}>Login</Link>
			<Link href={'/signup'}>Signup</Link>
		</div>
	)
}

Home.getLayout = function getLayout(page: ReactElement) {
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

export default Home;
