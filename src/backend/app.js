import 'babel-polyfill';
import path from 'path';
import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import { MongoClient } from 'mongodb';
import rest from '@feathersjs/express/rest';
import socketio from '@feathersjs/socketio';
import bodyParser from 'body-parser';
import allServices from './services/';

const app = express(feathers());

app
    .configure(rest())
    .configure(socketio())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended : true}))
    .use(express.static(path.join(process.cwd(), 'public')));


const server = async () => {
    const db = await MongoClient.connect('mongodb://localhost:27017/mechatronics');
    app.configure(allServices(db));
    return app;
}

export default server;
