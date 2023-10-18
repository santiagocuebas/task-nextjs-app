import { DataSource } from 'typeorm';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_PORT, DB_USER } from './config.js';
import { Link, User } from './models/index.js';

export const dbConn = new DataSource({
	type: 'mysql',
	host: DB_HOST,
	port: +DB_PORT,
	password: DB_PASS,
	username: DB_USER,
	database: DB_DATABASE,
	synchronize: false,
	logging: true,
	entities: [Link, User]
});
