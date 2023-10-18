import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
}

import type { NextRequest } from 'next/server';

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
}

export interface IUser {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
}

export interface ILink {
	id: string;
	authorId: string;
	title: string;
	url: string;
	description: string;
	createdAt: Date;
}

export interface IData {
	message: string;
	user: IUser;
	links: ILink[];
}
