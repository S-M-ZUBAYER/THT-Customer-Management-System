import React, { useContext, useEffect, useState } from 'react';
import UserContext, { AuthContext } from '../../../context/UserContext';
import axios from 'axios';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { HiChevronDoubleUp } from 'react-icons/hi2';
import { connectWebSocket, disconnectWebSocket, subscribeToChat } from '../Chat/WebSocketService';
import toast from 'react-hot-toast';

const Message = ({ allChat,selectedCustomerChat, showHistory,SetShowHistory,setAllChat,}) => {


  const [userIdAllChat,SetUserIdAllChat]=useState([]);
  const { user } = useContext(AuthContext)


  // <-------web socket

//   useEffect(() => {
//     // Establish a WebSocket connection when the component mounts
//     connectWebSocket();
//     // Replace 'user.id' with your actual user ID or identifier
//     subscribeToChat(selectedCustomerChat?.chatId, (newMessage) => {
//         setAllChat((prevMessages) => [...prevMessages, newMessage]);
//     });

//     // Clean up the WebSocket connection when the component unmounts
//     return () => {
//       disconnectWebSocket();
//     };
//   }, [user.id]);


    //<-------web socket


    

    const handleToShowHistory = () => {
      SetShowHistory(!showHistory);
    
    };
    
    useEffect(() => {
      // Fetch user data when showHistory is true and userId changes
      if (showHistory) {
        const fetchUserByUserId = async () => {
          try {
            const response = await axios.get(`https://grozziie.zjweiting.com:3091/CustomerService-Chat/api/dev/messages/${selectedCustomerChat?.userId}`);
            if (response.status === 200) {
              const userData = response.data;
              SetUserIdAllChat(userData);
              toast.success("click show the chat history");
            } else {
              // Handle unexpected status codes
              console.error('Unexpected status code:', response.status);
            }
          } catch (error) {
            // Handle network or other errors
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserByUserId();
      }
    }, [selectedCustomerChat?.userId, showHistory]); // Include userId and showHistory in the dependency array
    
    
    
    

  return (
    <div className="mb-10">
      {selectedCustomerChat && 
      <div onClick={handleToShowHistory} className="flex justify-center cursor-pointer">
      < HiChevronDoubleUp className="text-green-400 font-bold text-3xl" />
    </div>
      }
      {allChat &&
        allChat.map((chat, index) => {
       
          return (
            <div key={index}>
                 
              <div className="my-2 flex gap-0 w-full">
                
                {String(chat?.sentBy).trim() === String(selectedCustomerChat?.userId).trim() && String(chat?.sentTo).trim() === String(selectedCustomerChat?.customerServiceId).trim() && (
                  <>
                    <div className="w-6">
                      <img
                        className="w-6 h-6 rounded-full"
                        src="https://cdn.pixabay.com/photo/2016/06/03/15/35/customer-service-1433639__340.png"
                        alt="User Avatar"
                      />
                    </div>
                    <div className="max-w-10/12 pt-3">
                      {chat?.msgType === "image" ? (
                        <img
                          className="w-12 h-auto"
                          src={`data:image/png;base64,${chat?.message}`}
                          alt={`Image ${index}`}
                        />
                      ) : chat?.msgType === "video" ? (
                        <video
                          className="max-w-full h-auto"
                          controls
                          src={`data:video/mp4;base64,${chat?.message}`}
                        />
                      ) : (
                        <p className="bg-fuchsia-200 px-2 py-1 rounded-b-lg rounded-tr-lg text-black">
                          {chat?.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

              </div>
              <div className="my-2 flex justify-end w-full">

                {String(chat?.sentBy).trim() === String(selectedCustomerChat?.customerServiceId).trim() && String(chat?.sentTo).trim() === String(selectedCustomerChat?.userId).trim() && (
                  <>
                    <div className="max-w-10/12 pt-3">
                      {chat?.msgType === "image" ? (
                        <img
                          className=" w-96 rounded-b-lg rounded-tl-lg h-auto"
                          src={`data:image/png;base64,${chat?.message}`}
                          alt={`Image ${index}`}
                        />
                      ) : chat?.msgType === "video" ? (
                        <video
                          className="w-96 rounded-lg h-auto"
                          controls
                          src={`data:video/mp4;base64,${chat?.message}`}
                        />
                      ) : (
                        <p className="bg-fuchsia-200 px-2 py-1 rounded-b-lg rounded-tl-lg text-black">
                          {chat?.message}
                        </p>
                      )}
                    </div>
                    <div className="w-6">
                      <img
                        className="w-6 h-6 rounded-full"
                        // src="https://media.istockphoto.com/id/1244527145/photo/happy-smiling-woman-working-in-call-center.jpg?s=612x612&w=0&k=20&c=3q7ImqhEDOdYptyaZLYmjqtJgMBoY42lGDkzUi0NGBo="
                        src={user?.image}
                        alt="User Avatar"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};



export default Message;
