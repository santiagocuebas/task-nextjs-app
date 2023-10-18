import { Request, Response, NextFunction } from 'express';
import { User } from './models/index.js';

declare global {
	namespace Express {
		interface Request {
			user: User;
		}
	}
}

export interface IUser {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	createdAt: Date;
}

export interface ILink {
	id: string;
	authorId: string;
	title: string;
	url: string;
	description: string;
	createdAt: Date;
}

export interface Error {
	[index: string]: string;
}

export type Direction = (
	req: Request,
	res: Response,
	next: NextFunction
) => void;
