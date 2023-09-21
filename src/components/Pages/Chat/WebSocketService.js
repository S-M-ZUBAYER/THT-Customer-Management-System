

// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
// import toast from 'react-hot-toast';

// // const serverUrl = 'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self';
// ;
// const serverUrl = 'ws://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/websocket';
// let stompClient;

// export const connectWebSocket = () => {
//   const socket = new SockJS(serverUrl);
//   stompClient = Stomp.over(socket);
//   stompClient.connect({}, () => {
//     console.log('WebSocket connected');
//     toast.success('WebSocket connected');
//     // You can add a success toast or dispatch an action here
//   });
// };

// export const disconnectWebSocket = () => {
//   if (stompClient && stompClient.connected) {
//     stompClient.disconnect(() => {
//       console.log('WebSocket disconnected');
//       toast.error('WebSocket disconnected');
//       // You can add a disconnect toast or dispatch an action here
//     });
//   }
// };

// export const subscribeToChat = (userId, callback) => {
//   stompClient.subscribe(`/topic/${userId}`, (message) => {
//     callback(JSON.parse(message.body));
//   });
// };

// export const sendMessage = (message, destination) => {
//   stompClient.send(destination, {}, JSON.stringify(message));
// };

// WebSocketService.js
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
// import toast from 'react-hot-toast';

// const serverUrl = 'ws://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/websocket';
// let stompClient;

// export const connectWebSocket = () => {
//   const socket = new SockJS(serverUrl);
//   stompClient = Stomp.over(socket);
//   stompClient.connect({}, () => {
//     console.log('WebSocket connected');
//     toast.success('WebSocket connected');
//     // You can add a success toast or dispatch an action here
//   });
// };

// export const disconnectWebSocket = () => {
//   if (stompClient && stompClient.connected) {
//     stompClient.disconnect(() => {
//       console.log('WebSocket disconnected');
//       toast.error('WebSocket disconnected');
//       // You can add a disconnect toast or dispatch an action here
//     });
//   }
// };

// export const subscribeToChat = (userId, callback) => {
//   stompClient.subscribe(`/topic/${userId}`, (message) => {
//     callback(JSON.parse(message.body));
//   });
// };

// export const sendMessage = (message, destination) => {
//   stompClient.send(destination, {}, JSON.stringify(message));
// };
