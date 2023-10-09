import { Client } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Chat = () => {
    const [connected, setConnected] = useState(false);

    const stompClient = new Client({
        brokerURL: 'wss://grozziie.zjweiting.com:3091/CustomerService-Chat/websocket',
    });

    useEffect(() => {
        const connect = () => {
            stompClient.onConnect = (frame) => {
                setConnected(true);
                console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/1', (message) => {
                    showGreeting(message.body);
                    console.log(message?.body);
                });
            };

            stompClient.onWebSocketError = (error) => {
                console.error('Error with websocket', error);
                // Handle error here, you can update state or show an error message to the user.
            };

            stompClient.activate();
        };

        // Try to connect
        connect();

        // Retry every 5 seconds if not connected
        const retryInterval = setInterval(() => {
            if (!connected) {
                console.log('Reconnecting to WebSocket...');
                connect();
            } else {
                clearInterval(retryInterval);
            }
        }, 5000);

        // Cleanup on unmount
        return () => {
            clearInterval(retryInterval);
            stompClient.deactivate();
        };
    }, [connected]);

    const showGreeting = (message) => {
        // Handle received messages here
        console.log('Received message:', message);
    };

    
  
  const sendChatMessage = async (ChatId,sendBy,sendTo,sentId,messageId,msgType) => {
    if (stompClient.connected) {
        toast.success("stomp Connected")
    }
    if (!stompClient.connected) {
        toast.error("try to connect again")
        stompClient.onConnect = (frame) => {
            // Connection established
            setConnected(true);
            console.log('Connected: ' + frame);
            toast.success("connected again")
          };
    }
    const message = {
        chatId: 660,
        sentBy: 1,
        sentTo: 203,
        sentId: "66",
        message: 'Got it',
        msgType: 'text',
      };
    if (connected) {
      const response = await new Promise((resolve) => {
        stompClient.publish({
          destination: '/app/messages',
          body: JSON.stringify(message), // Pass the message object directly
        }, {}, (response) => {
          resolve(response); // Resolve the Promise with the response
          console.log(response);
        });
      });
  
      console.log('Message sent. Server response:', response);
      // Handle the response here
    } else {
      console.error('STOMP client is not connected.');
      // You can show an error message to the user here.
    }
  };
  
 
    return (
        <div>
            <h1>Real-time Chat</h1>
            {connected ? (
                <div>
                    <div>Connected to WebSocket</div>
                    <button onClick={sendChatMessage}>Send Message</button>
                </div>
            ) : (
                <div>Connecting to WebSocket...</div>
            )}
        </div>
    );
};

export default Chat ;
