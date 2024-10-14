// import React, { useEffect, useRef, useState } from 'react';
// import { Client } from '@stomp/stompjs';
// import toast, { Toaster } from 'react-hot-toast';
// import RgbImageFromFile from './RgbDataShow';
// import DecodeHexImage from './RgbDataShow';
// import RgbDataShow from './RgbDataShow';
// import ImageToRGB565 from './ImageToRGB565';
// import HexRgb from './HexRgb';

// const WebSocketComponent = () => {
//     const [client, setClient] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');
//     const [imageData, setImageData] = useState('');
//     const [width, setWidth] = useState(0);
//     const [height, setHeight] = useState(0);
//     const [id, setId] = useState('');
//     const [totalPart, setTotalParts] = useState(0);
//     const [partNo, setPartNo] = useState('');
//     const [lengthInBytes, setLengthInBytes] = useState(0);
//     const [formattedData, setFormattedData] = useState('');

//     console.log(width, height, imageData, "dataformate");


//     useEffect(() => {
//         const stompClient = new Client({
//             brokerURL: 'wss://grozziieget.zjweiting.com:3091/CloudSocket-Dev/websocket',
//         });

//         stompClient.onConnect = () => {
//             console.log('Connected');
//             stompClient.subscribe('/topic/cloud', (message) => {
//                 console.log(message.body, "message");

//                 const parsedMessage = JSON.parse(message.body);
//                 const parts = parsedMessage.split(" ");
//                 if (parts.length > 3) {
//                     setImageData('')
//                     console.log(parts, "id")
//                     setLengthInBytes(parts[0])
//                     setWidth(parts[1])
//                     setHeight(parts[2])
//                     setId(parts[4])
//                     setTotalParts(parts[5])
//                 }
//                 else {
//                     if (totalPart === parts[1]) {
//                         setImageData(prevData => `${prevData}${parts[2]}`);
//                         setWidth('');
//                         setHeight('');
//                         setTotalParts('');
//                     }
//                     else {
//                         setImageData(prevData => `${prevData}${parts[2]}`);
//                     }

//                 }
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
//             // body: JSON.stringify({ message: `cmddl ${decimalInput} crc cmdend` }),
//             body: JSON.stringify(message),
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
//             <RgbDataShow></RgbDataShow>
//             <HexRgb></HexRgb>
//         </div>
//     );
// };

// export default WebSocketComponent;




import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Initialize WebSocket connection
        const ws = new WebSocket('wss://grozziieget.zjweiting.com:3091/WebSocket-Binary/ws');

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            setIsConnected(true);
        };

        // // hex decimal 
        // ws.onmessage = async (event) => {
        //     if (event.data instanceof Blob) {
        //         const arrayBuffer = await event.data.arrayBuffer();
        //         const byteArray = new Uint8Array(arrayBuffer);
        //         console.log('Received binary data:', byteArray);

        //         // You can convert it back to hex if needed
        //         const hexString = Array.from(byteArray)
        //             .map(byte => byte.toString(16).padStart(2, '0'))
        //             .join(' ');

        //         console.log('Received hex data:', hexString);
        //         // Here you can also set messages if needed
        //         // setMessages((prevMessages) => [...prevMessages, hexString]);
        //     } else {
        //         console.log('Received message:', event.data);
        //     }
        // };

        // // binary data
        // ws.onmessage = async (event) => {
        //     if (event.data instanceof Blob) {
        //         const arrayBuffer = await event.data.arrayBuffer();
        //         const byteArray = new Uint8Array(arrayBuffer);
        //         console.log('Received raw binary data:', byteArray);

        //         // You can access individual bytes like this:
        //         // console.log(byteArray[0], byteArray[1], ...);
        //     } else {
        //         console.log('Received message:', event.data);
        //     }
        // };

        // main binary
        ws.onmessage = async (event) => {
            if (event.data instanceof Blob) {
                const arrayBuffer = await event.data.arrayBuffer();
                const byteArray = new Uint8Array(arrayBuffer);
                console.log('Received raw binary data:', byteArray);

                // Optionally, process or log the received data here
            } else {
                console.log('Received message:', event.data);
            }
        };


        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setIsConnected(false);
        };

        setSocket(ws);

        // Clean up WebSocket connection on component unmount
        return () => {
            ws.close();
        };
    }, []);


    //main binary
    const sendMessage = () => {
        // Binary data as an array of bits
        const binaryArray = new Uint8Array([
            0b0001, // 255 in decimal
            0b11011000, // 216 in decimal
            0b11111111, // 255 in decimal
            0b11100000, // 224 in decimal
            0b00000000, // 0 in decimal
            0b00010000, // 16 in decimal
            0b01001010, // 74 in decimal
            0b01000110  // 70 in decimal
        ]);

        if (socket && isConnected) {
            console.log('Sending raw binary data:', binaryArray);

            // Send raw binary data via WebSocket
            socket.send(binaryArray);
        } else {
            console.log('WebSocket connection is not open');
        }
    };


    // // Hex decimal data
    // const sendMessage = () => {
    //     // Define your hexadecimal data as an array of hex values
    //     const hexArray = [
    //         0xFF, // 255 in decimal
    //         0xD8, // 216 in decimal
    //         0xFF, // 255 in decimal
    //         0xE0, // 224 in decimal
    //         0x00, // 0 in decimal
    //         0x10, // 16 in decimal
    //         0x4A, // 74 in decimal
    //         0x46  // 70 in decimal
    //     ];

    //     // Create a Uint8Array from the hex array
    //     const byteArray = new Uint8Array(hexArray);

    //     if (socket && isConnected) {
    //         console.log('Sending binary data', byteArray);

    //         // Send the byte array directly via WebSocket
    //         socket.send(byteArray);
    //     } else {
    //         console.log('WebSocket connection is not open');
    //     }
    // };

    // const sendMessage = () => {
    //     // Raw binary data as an array of bytes
    //     const binaryArray = new Uint8Array([
    //         255,   // 0b11111111
    //         216,   // 0b11011000
    //         255,   // 0b11111111
    //         224,   // 0b11100000
    //         0,     // 0b00000000
    //         16,    // 0b00010000
    //         74,    // 0b01001010
    //         70     // 0b01000110
    //     ]);

    //     if (socket && isConnected) {
    //         console.log('Sending raw binary data', binaryArray);

    //         // Send raw binary data via WebSocket
    //         socket.send(binaryArray);
    //     } else {
    //         console.log('WebSocket connection is not open');
    //     }
    // };



    return (
        <div>
            <h1>WebSocket Connection</h1>
            <button onClick={sendMessage} disabled={!isConnected}>
                Send Message
            </button>
            <div>
                <h2>Messages</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WebSocketComponent;
