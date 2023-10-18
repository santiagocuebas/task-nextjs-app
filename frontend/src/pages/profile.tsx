import { ReactElement, useState } from 'react';
import type { GetServerSideProps } from 'next';
import type { IData, ILink, IUser, NextPageWithLayout } from '@/lib/global';
import axios from 'axios';
import styles from '@/styles/Profile.module.css'
import Layout from '@/components/Layout';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from '@/components/Link';
import ErrorBox from '@/components/ErrorBox';
import Search from '@/components/Search';
import Form from '@/components/FormLink';
import { FaPlus } from 'react-icons/fa';

const Profile: NextPageWithLayout = (data: any) => {
	const user: IUser = data.user;
	const [links, setLinks] = useState(data.links as ILink[]);
	const [link, setLink] = useState(null);
	const [visible, setVisible] = useState(false);
	const [errors, setErrors] = useState(null);

	function changeVisibility(value: never) {
		setLink(value);
		setVisible(true);
		setErrors(null);
	}

	function handleErrors(errors: never) {
		setErrors(errors);
		setVisible(true);
	}

	function handleAddLink(link: ILink) {
		setLinks([link, ...links]);
		setErrors(null);
		setVisible(false);
	}

	function handleEditLink(id: string, title: string, url: string, description: string) {
		const reloadLinks = links.map(item => {
			if (item.id === id) {
				item.title = title;
				item.url = url;
				item.description = description;
			};

			return item;
		});

		setLinks(reloadLinks);
		setLink(null);
		setVisible(false);
		setErrors(null);
	}

	function handleDeleteLink(id: string) {
		const reloadLinks = links.filter(item => item.id !== id);

		setLinks(reloadLinks);
		setLink(null);
		setVisible(false);
		setErrors(null);
	}

	return (
		<>
			<Nav />

			{
				visible
					? <div className={styles.absolute}>
							<Form
								errors={handleErrors}
								add={handleAddLink}
								edit={handleEditLink}
								delet={handleDeleteLink}
								link={link}
								setVisible={setVisible}
								setLink={setLink}
							>
								{errors ? <ErrorBox hide={setErrors} errors={errors} /> : <></>}
							</Form>
						</div>
					: null
			}

			<div className={styles.user}>
				Welcome {user.firstname} {user.lastname}
			</div>

			<div className={styles.links}>
				<Search links={data.links} setLinks={setLinks} />
			{
				data.links.length > 0
					? <>
							{
								links.map(link => (
									<Link key={link.id} link={link} change={changeVisibility} />
								))
							}
							<button className={styles.button} onClick={() => setVisible(true)}>
								<FaPlus size={32} />
							</button>
						</>
					: <div className={styles.message}>
							Haven&apos;t saved any links yet?
							<button className={styles.save} onClick={() => setVisible(true)}>
								Starts now!
							</button>
						</div>
			}
			</div>

			<Footer />
		</>
	)
}

Profile.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const data: IData = await axios({
	  method: 'GET',
	  url: 'http://localhost:4200/api/user/links',
	  headers: { 'Cookie': `authenticate=${req.cookies['authenticate']}` }
	}).then(res => res.data);

	if (data.message) {
		return {
			redirect: {
				destination: '/login',
				permanent: true
			}
		}
	}

	return {
		props: {
			user: data.user,
			links: data.links
		}
	}
}

export default Profile;
