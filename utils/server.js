import { DataAccessLayer } from './data_access_layer/data_access_layer.js';
import dotenv from 'dotenv';
import app from './index';
import path from "path";
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

dotenv.config({ path: path.resolve(_dirname, '../config.env') });

const DATABASE_HOST = 'localhost';
const DATABASE_PORT = 3306;
const DATABASE_USER = 'root';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = 'library';

const dataAccessLayer = new DataAccessLayer();

async function initializeServer() {
    try {
        await dataAccessLayer.initConnection(DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT);
        console.log('Database connection established');

        app.use((req, res, next) => {
            req.dataAccessLayer = dataAccessLayer;
            next();
        })

        const port = 8000;
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
    catch (error) {
        console.log('Error when initializing database: ' + error);
    }

    initializeServer();

    process.on('SIGINT', async () => {
        await dataAccessLayer.endConnection();
        console.log('Database connection closed');
        process.exit();
    })
}

export {dataAccessLayer};