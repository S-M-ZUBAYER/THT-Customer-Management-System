// import React, { useEffect, useState } from 'react';
// import { Client } from '@stomp/stompjs';
// import toast, { Toaster } from 'react-hot-toast';

// const WebSocketComponent = () => {
//     const [client, setClient] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');

//     useEffect(() => {
//         const stompClient = new Client({
//             brokerURL: 'wss://grozziieget.zjweiting.com:3091/CloudSocket-Dev/websocket',
//         });

//         stompClient.onConnect = () => {
//             console.log('Connected');
//             stompClient.subscribe('/topic/cloud', (message) => {
//                 console.log(message, "total sms package");
//                 setMessages((prevMessages) => [...prevMessages, message.body]);
//                 console.log((message.body).charCodeAt(0), "check")
//                 // setMessages((prevMessages) => [...prevMessages, (message.body).charCodeAt(0)]);
//             });
//         };

//         stompClient.onStompError = (frame) => {
//             console.error('Broker reported error: ' + frame.headers['message']);
//             console.error('Additional details: ' + frame.body);
//         };

//         stompClient.activate();
//         setClient(stompClient);

//         return () => {
//             if (stompClient) {
//                 stompClient.deactivate();
//             }
//         };
//     }, []);

//     const sendChatMessage = async (message) => {
//         if (!client || !client.connected) {
//             toast.error('STOMP client is not connected.');
//             return;
//         }
//         const decimalInput = String.fromCharCode(message);
//         console.log(message, "sms");
//         client.publish({
//             destination: '/app/cloud',
//             body: JSON.stringify({ message: `cmddl ${decimalInput} crc cmdend` }),
//         });
//         setInput('');
//     };

//     const handleSendMessage = () => {
//         if (input) {
//             sendChatMessage(input);
//         } else {
//             toast.error('Message cannot be empty');
//         }
//     };

//     return (
//         <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
//             <Toaster />
//             <div className="text-xl font-medium text-black">WebSocket SMS</div>
//             <ul className="space-y-2">
//                 {messages.map((msg, index) => (
//                     <li key={index} className="p-2 bg-gray-100 rounded">
//                         {msg}
//                     </li>
//                 ))}
//             </ul>
//             <div className="flex space-x-2">
//                 <input
//                     type="text"
//                     className="flex-grow p-2 border border-gray-300 rounded"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                 />
//                 <button
//                     onClick={handleSendMessage}
//                     className="p-2 bg-blue-500 text-white rounded"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default WebSocketComponent;


import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { Toaster, toast } from 'react-hot-toast';

const WebSocketComponent = () => {
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'wss://grozziieget.zjweiting.com:3091/CloudSocket-Dev/websocket',
        });

        stompClient.onConnect = () => {
            console.log('Connected');
            stompClient.subscribe('/topic/cloud', (message) => {
                console.log(message, "Incoming sms package");
                const receivedChar = message.body.split(" ")[1];
                const receivedDecimal = charToDecimal(receivedChar);
                setMessages((prevMessages) => [...prevMessages, receivedDecimal]);
            });
        };

        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        stompClient.activate();
        setClient(stompClient);

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, []);

    const sendChatMessage = async (message) => {
        if (!client || !client.connected) {
            toast.error('STOMP client is not connected.');
            return;
        }
        client.publish({
            destination: '/app/cloud',
            body: JSON.stringify({ message: `cmddl ${message} crc cmdend` }),
        });
        setInput('');
    };

    const handleSendMessage = () => {
        if (input) {
            const charInput = decimalToChar(parseInt(input, 10));
            sendChatMessage(charInput);
        } else {
            toast.error('Message cannot be empty');
        }
    };

    const decimalToChar = (decimal) => {
        return String.fromCharCode(decimal);
    };

    const charToDecimal = (char) => {
        return char.charCodeAt(0);
    };

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
            <Toaster />
            <div className="text-xl font-medium text-black">WebSocket SMS</div>
            <ul className="space-y-2">
                {messages.map((msg, index) => (
                    <li key={index} className="p-2 bg-gray-100 rounded">
                        {msg}
                    </li>
                ))}
            </ul>
            <div className="flex space-x-2">
                <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default WebSocketComponent;
