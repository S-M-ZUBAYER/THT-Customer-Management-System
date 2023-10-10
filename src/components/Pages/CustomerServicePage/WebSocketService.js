// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';

// const SOCKET_URL = 'wss://grozziie.zjweiting.com:3091/CustomerService-Chat/websocket';
// const SOCKET_URL = 'ws://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/websocket';
// const MESSAGE_API = '/topic/chat'; // This is where you'll receive messages

// let stompClient = null;

// export const connectWebSocket = (userId, onMessageReceived) => {
//   const socket = new SockJS(SOCKET_URL);
//   stompClient = Stomp.over(socket);

//   stompClient.connect({}, (frame) => {
//     console.log('Connected:', frame);

//     // Subscribe to the user-specific topic
//     stompClient.subscribe(`/topic/${userId}`, (message) => {
//       const receivedMessage = JSON.parse(message.body);
//       onMessageReceived(receivedMessage);
//     });
//   });
// };

// export const disconnectWebSocket = () => {
//   if (stompClient !== null) {
//     stompClient.disconnect();
//     console.log('Disconnected');
//   }
// };

// export const sendMessage = (message) => {
//   if (stompClient && message) {
//     stompClient.send(MESSAGE_API, {}, JSON.stringify(message));
//   }
// };
