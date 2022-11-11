import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import { router as usersRoutes } from './routes/users-routes';
import { db } from './config/database';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error DB.AUTHENTICATE: ', err);
})

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Could not find this route' });
});

db.sync().then(() => {
    app.listen(process.env.PORT || 5000);
}).catch(err => console.log("Error DB.SYNC: " + err));