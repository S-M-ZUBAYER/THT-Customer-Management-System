// sendChatMessage.js
import { Client } from '@stomp/stompjs';
import toast from 'react-hot-toast';

const stompClient = new Client({
    brokerURL: 'wss://grozziie.zjweiting.com:3091/CustomerService-Chat/websocket',
    // brokerURL: 'ws://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/websocket',
});

stompClient.activate();

const sendChatMessage = async (message) => {
    if (stompClient.connected) {
    toast.success("stomp connected");
    console.log(message,"function ");
    }
    if (!stompClient.connected) {
    toast.error("stomp not connected")
    }
    if (stompClient.connected) {
        const response = await new Promise((resolve) => {
            console.log(message,"into function")
            stompClient.publish({
                destination: '/app/messages',
                body: JSON.stringify(message),
            }, {}, (response) => {
                resolve(response);
                console.log(response);
            });
        });

        console.log('Message sent. Server response:', response);
        // Handle the response here
        return response;
    } else {
        console.error('STOMP client is not connected.');
        // You can show an error message to the user here.
        return null;
    }
};

export { sendChatMessage };
