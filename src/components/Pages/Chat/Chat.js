import React, { useState } from 'react';
import UserList from './UserList';
import ConversationView from './ConversationView';
import MessageInput from './MessegeInput';
import { AuthContext } from '../../../context/UserContext';
import ImageCompressor from './ImageCompression';

const Chat = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', online: true },
    { id: 2, name: 'User 2', online: false },
    // Add more users
  ]);


  const [messages, setMessages] = useState([
    // { id: 1, sender: 'User 1', text: 'Hello', timestamp: Date.now() },
    // Add more messages
  ]);


  
  const customerMessages=[{id:11, message:[{ id: 1, sender: 'User 1', text: 'Hello From S M ZUBAYER', timestamp: Date.now()},{id: 2,sender: "You",text: "Hlw",timestamp: 1692854573295},{id: 3,sender: "You",text: "How are you?",timestamp: 1692854573294},{id: 4,sender: "User 1",text: "I am fine and what about You?",timestamp: 1692854573296}]},{id:12, message:[{ id: 1, sender: 'User 1', text: 'Hello from Sabit', timestamp: Date.now()},{id: 2,sender: "User 1",text: "Hlw",timestamp: 1692854573295},{id: 3,sender: "You",text: "How are you?",timestamp: 1692854573294},{id: 4,sender: "You",text: "I am fine and what about You?",timestamp: 1692854573296}]},{id:13, message:[{ id: 1, sender: 'User 1', text: 'Hello from sayed', timestamp: Date.now()},{id: 2,sender: "User 1",text: "Hlw",timestamp: 1692854573295},{id: 3,sender: "You",text: "How are you?",timestamp: 1692854573294},{id: 4,sender: "User 1",text: "I am fine and what about You?",timestamp: 1692854573296}]}]

  const [selectedCustomer,setSelectedCustomer]=useState(null);


  const sendMessage = ({ text, files }) => {
    const newMessageObj = {
      id: messages.length + 1,
      sender: 'You',
      text,
      files,
      timestamp: Date.now(),
    };
    setMessages([...messages, newMessageObj]);
  };

  // console.log(users ,setSelectedCustomer,selectedCustomer,setMessages,customerMessages)


  return (
    // <AuthContext.Provider>
    <div className="flex h-screen">
      <UserList users={users} setSelectedCustomer={setSelectedCustomer} messages={messages}  setMessages={setMessages} customerMessages={customerMessages} selectedCustomer={selectedCustomer}/>
      <ConversationView messages={messages} selectedCustomer={selectedCustomer} />
      <MessageInput onSendMessage={sendMessage} selectedCustomer={selectedCustomer} />
    <div>

      <ImageCompressor></ImageCompressor>
    </div>
    </div>
    // </AuthContext.Provider>
  );
};

export default Chat;
