import * as mqtt from 'mqtt';
const CLIENT_CONNECTED = 'client-connected';
const getNotification = (clientId, username) => JSON.stringify({ clientId, username });

export default (clientId, data) => {
    const options = {
        will: {
            topic: clientId,
        }
    };
    let client = mqtt.connect("wss://aa33hnhcx2qp3-ats.iot.us-west-2.amazonaws.com", options);
    client.on('connect', () => {
        client.subscribe(clientId);
        const connectNotification = getNotification(clientId, "123");
        console.log("connected");
    });
    client.on('error', (error) => {

    });
    client.on('close', (event) => {
        client.end();
    });
    client.stream.on('error', (error) => {

    })
    client.on('message', (topic, message) => {
        const JSONmessage = JSON.parse(message.toString('utf8'))
        console.log(topic, JSONmessage);
    })

}