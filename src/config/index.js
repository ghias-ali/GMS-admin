import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';

const apiUrl = 'http://api.mumairriaz.com'

const socket = io(apiUrl, {
    transports: ['websocket'],
    forceNew: true
});
const client = feathers();

client.configure(auth({
    storage: window.localStorage
}));

client.configure(socketio(socket));
export {
    client,
    apiUrl
}