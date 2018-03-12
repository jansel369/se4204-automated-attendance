import feathers from 'feathers';
// import socketio from 'feathers-socketio';
// import io from 'socket.io-client';
// import hooks from 'feathers-hooks';
import customService from './services/custom';
const client = feathers();

const { location } = window;
const protocol = location.host.startsWith('local') ? 'http' : 'https';
const url = `${protocol}://${location.host}`;


// client.configure(customService());
// client
//   .configure(socketio(io(url)))
//   .configure(hooks())

// window.client = client;

export default client;
