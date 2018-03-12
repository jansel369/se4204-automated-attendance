import feathers from '@feathersjs/feathers';
import feathersSocketio from '@feathersjs/socketio-client';
import nativeSocketio from 'socket.io-client';
import authClient from '@feathersjs/authentication-client';
import customService from './services/custom';

const { location } = window;
const protocol = location.host.startsWith('local') ? 'http' : 'https';
const url = `${protocol}://${location.host}`;

const socketConnection = nativeSocketio(url);
const app = feathers();
app.configure(feathersSocketio(socketConnection));


// client.configure(customService());
// client
//   .configure(socketio(io(url)))
//   .configure(hooks())

window.client = app;

export default app;
