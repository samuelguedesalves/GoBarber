import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';

const server = express();

server.use(express.json());
server.use(routes);

const port = process.env.PORT || 3333;

server.listen(port, () => console.log(`🚀 server runing in port: ${port}`));