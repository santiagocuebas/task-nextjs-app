import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import cors from 'cors';
import { ORIGIN } from './config.js';
import * as route from './routes/index.js';

// Initializions
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: ORIGIN,
	methods: 'GET, POST, PUT, DELETE, OPTIONS',
	allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
	credentials: true
}));
app.use(multer().none());

// Routes
app.use('/api/auth', route.Auth);
app.use('/api/link', route.Link);
app.use('/api/user', route.User);

export default app;
