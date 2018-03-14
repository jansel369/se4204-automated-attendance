import 'babel-polyfill';
import path from 'path';
import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import { MongoClient } from 'mongodb';
import rest from '@feathersjs/express/rest';
import socketio from '@feathersjs/socketio';
import bodyParser from 'body-parser';
import allServices from './services/';
import channels from './channels';
import morgan from 'morgan';

const app = express(feathers());

app
    .configure(express.rest())
    .configure(socketio())
    // .use(bodyParser.json())
    // .use(bodyParser.urlencoded({ extended : true}))
    // .use(express.static(path.join(process.cwd(), 'public')))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static(path.join(process.cwd(), 'public')))
    .use(morgan('dev'))
    .on('connection', (connection) => app.channel('anonymous').join(connection))
    .publish(() => app.channel('anonymous'));


const server = async () => {
    const db = (await MongoClient.connect('mongodb://localhost:27017/mechatronics')).db('mechatronics');
    app.configure(allServices(db));
    return app;
}

export default server;
