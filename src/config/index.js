import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

const apiUrl = 'http://localhost:3030'

const socket = io(apiUrl, {
    transports: ['websocket'],
    forceNew: true
});
const client = feathers();

client.configure(socketio(socket));
export {
    client,
    apiUrl
}