// // import React, { useState } from 'react';
// // import UserList from './UserList';
// // import ConversationView from './ConversationView';
// // import MessageInput from './MessegeInput';
// // import { AuthContext } from '../../../context/UserContext';
// // import axios from 'axios';
// // import toast from 'react-hot-toast';

// // const Chat = () => {
// //   const [users, setUsers] = useState([
// //     { id: 1, name: 'User 1', online: true },
// //     { id: 2, name: 'User 2', online: false },
// //     // Add more users
// //   ]);


// //   const [messages, setMessages] = useState([
// //     // { id: 1, sender: 'User 1', text: 'Hello', timestamp: Date.now() },
// //     // Add more messages
// //   ]);

// //   const handleToPost = async () => {
// //     try {
// //       const text = {
// //         chatId: 5,
// //         sentBy: 6,
// //         sentTo: 2,
// //         message: "Try for post?..",
// //         msgType: "text",
// //         timestamp: "2023-08-31T08:11:05.814+00:00"
// //       };
  
// //       // Make the POST request to the API
// //       const response = await axios.post(
// //         'https://grozziie.zjweiting.com:3091/CustomerService-Chat/api/dev/messages',
// //         text // Wrap the text object in an array to match your API's expected format
// //       );
  
// //       // Handle the response as needed
// //       console.log('Message sent successfully:', response.data);
// //       toast.success('Message sent successfully:', response.data);
  
// //       // You can also update your chat state here if needed
  
// //     } catch (error) {
// //       // Handle errors from the API request
// //       console.error('Error sending message:', error);
// //       toast.error('Error sending message:', error);
// //     }
// //   };
  
  
  

  
// //   const customerMessages=[{id:11, message:[{ id: 1, sender: 'User 1', text: 'Hello From S M ZUBAYER', timestamp: Date.now()},{id: 2,sender: "You",text: "Hlw",timestamp: 1692854573295},{id: 3,sender: "You",text: "How are you?",timestamp: 1692854573294},{id: 4,sender: "User 1",text: "I am fine and what about You?",timestamp: 1692854573296}]},{id:12, message:[{ id: 1, sender: 'User 1', text: 'Hello from Sabit', timestamp: Date.now()},{id: 2,sender: "User 1",text: "Hlw",timestamp: 1692854573295},{id: 3,sender: "You",text: "How are you?",timestamp: 1692854573294},{id: 4,sender: "You",text: "I am fine and what about You?",timestamp: 1692854573296}]},{id:13, message:[{ id: 1, sender: 'User 1', text: 'Hello from sayed', timestamp: Date.now()},{id: 2,sender: "User 1",text: "Hlw",timestamp: 1692854573295},{id: 3,sender: "You",text: "How are you?",timestamp: 1692854573294},{id: 4,sender: "User 1",text: "I am fine and what about You?",timestamp: 1692854573296}]}]

// //   const [selectedCustomer,setSelectedCustomer]=useState(null);


// //   const sendMessage = ({ text, files }) => {
// //     const newMessageObj = {
// //       id: messages.length + 1,
// //       sender: 'You',
// //       text,
// //       files,
// //       timestamp: Date.now(),
// //     };
// //     setMessages([...messages, newMessageObj]);
// //   };

// //   // console.log(users ,setSelectedCustomer,selectedCustomer,setMessages,customerMessages)


// //   return (
// //     // <AuthContext.Provider>
// //     <div className="flex h-screen">
// //       <UserList users={users} setSelectedCustomer={setSelectedCustomer} messages={messages}  setMessages={setMessages} customerMessages={customerMessages} selectedCustomer={selectedCustomer}/>
// //       <ConversationView messages={messages} selectedCustomer={selectedCustomer} />
// //       <MessageInput onSendMessage={sendMessage} selectedCustomer={selectedCustomer} />
// //     <button onClick={handleToPost}>Post sms </button>
// //     </div>
// //     // </AuthContext.Provider>
// //   );
// // };

// // export default Chat;


// import React, { useEffect, useState } from 'react';
// import { connectWebSocket, disconnectWebSocket, sendMessage, subscribeToChat } from './WebSocketService';

// const Chat = ({ user }) => {
//   const [message, setMessage] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);

//   useEffect(() => {
//     // Establish a WebSocket connection when the component mounts
//     connectWebSocket();

//     // Replace 'user.id' with your actual user ID or identifier
//     subscribeToChat(user.id, (newMessage) => {
//       setChatMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     // Clean up the WebSocket connection when the component unmounts
//     return () => {
//       disconnectWebSocket();
//     };
//   }, [user.id]);
// // 
//   const handleSendMessage = () => {
//     const newMessage = {
//       text: message,
//       sender: user.id,
//     };

//     // Replace '/app/messages' with your desired message destination
//     sendMessage(newMessage, '/app/messages');

//     setMessage('');
//   };

//   return (
//     <div>
//       <h1>Chat</h1>
//       <div>
//         {chatMessages.map((msg, index) => (
//           <div key={index}>
//             <p>{msg.text}</p>
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message..."
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;


// Chat.js
// import React, { useContext, useEffect, useState } from 'react';
// import { connectWebSocket, disconnectWebSocket, subscribeToChat, sendMessage } from './WebSocketService';
// import MessageInput from './MessegeInput';
// import { AuthContext } from '../../../context/UserContext';


// const Chat = () => {
//   const [allChat, setAllChat] = useState([]);
//   const [selectedCustomerChat, setSelectedCustomerChat] = useState(null);
//   const {chattingUser}=useContext(AuthContext)

//   useEffect(() => {
//     // Establish a WebSocket connection when the component mounts
//     connectWebSocket();

//     // Subscribe to a chat channel (replace userId with the actual user ID)
//     subscribeToChat(chattingUser?.userId, (newMessage) => {
//       // Handle new messages here
//       setAllChat((prevMessages) => [...prevMessages, newMessage]);
//     });

//     // Clean up the WebSocket connection when the component unmounts
//     return () => {
//       disconnectWebSocket();
//     };
//   }, [chattingUser?.userId]);

//   const handleSendMessage = (message) => {
//     // Replace 'selectedCustomerChat.chatId' and 'selectedCustomerChat.agentId' with actual values
//     const messageObject = {
//       chatId: selectedCustomerChat.chatId,
//       sentBy: selectedCustomerChat.agentId,
//       sentTo: selectedCustomerChat.userId,
//       message: message,
//       msgType: "text", // You can customize this based on your message type handling
//       timestmp: new Date().toLocaleTimeString(), // You can format the timestamp as needed
//     };

//     // Send the message using the WebSocket service
//     sendMessage(messageObject, 'http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/websocket/app/messages');

//     // Update the chat with the sent message
//     setAllChat((prevMessages) => [...prevMessages, messageObject]);
//   };

//   return (
//     <div>
//       {/* Render the chat messages */}
//       <div className="chat-messages">
//         {allChat.map((chat, index) => (
//           <div key={index}>
//             {/* Render each message here */}
//             {/* You can customize the message display based on msgType (text, image, video, etc.) */}
//             <div className="message">{chat.message}</div>
//           </div>
//         ))}
//       </div>
      
//       {/* Render the message input component */}
//       <MessageInput onSendMessage={handleSendMessage} />
//     </div>
//   );
// };

// export default Chat;

import React, { useEffect, useState } from 'react';
import { connectWebSocket, disconnectWebSocket, sendMessage } from './WebSocketService';

const Chat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Connect to WebSocket when the component mounts
    connectWebSocket(userId, onMessageReceived);

    // Disconnect from WebSocket when the component unmounts
    return () => {
      disconnectWebSocket();
    };
  }, [userId]);

  const onMessageReceived = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        chatId: '',
        message: newMessage,
        msgType: 'text',
        sentBy: userId,
        sentTo: '', // Add recipient ID if needed
        timestamp: new Date().toISOString(),
      };
      sendMessage(message);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <div style={{ height: '300px', border: '1px solid #ccc', overflowY: 'scroll' }}>
          {messages.map((message, index) => (
            <div key={index}>
              <strong>{message.sentBy}:</strong> {message.message}
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
