import 'reflect-metadata';
import app from './app.js';
import { PORT } from './config.js';
import { dbConn } from './database.js';

// Connect Database
try {
	await dbConn.initialize();
	console.log('Database initializate');
} catch(err) {
	console.error(err);
}

// Running Server
app.listen(PORT, () => {
	console.log('Server running in port', PORT);
});
