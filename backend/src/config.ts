import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;

export const SECRET = process.env.SECRET as string;

export const DB_HOST = process.env.DB_HOST;

export const DB_PORT = process.env.DB_PORT as string;

export const DB_USER = process.env.DB_USER;

export const DB_PASS = process.env.DB_PASS;

export const DB_DATABASE = process.env.DB_DATABASE;

export const ORIGIN = process.env.ORIGIN;

export const DOMAIN = process.env.DOMAIN;

export const NODE_ENV = process.env.NODE_ENV;
