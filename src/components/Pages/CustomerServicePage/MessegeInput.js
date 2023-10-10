


import React, { useContext, useEffect, useState } from 'react';
import { FaFileImage } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import { MdOndemandVideo } from 'react-icons/md';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';
// import {  sendMessage } from '../Chat/WebSocketService';
import { Client } from '@stomp/stompjs';
import { sendChatMessage } from './SendMessageFunction';

const MessageInput = ({
  setAllChat,
  selectedCustomerChat,
  allChat,
  
}) => {
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileType, setFileType] = useState(null); // Default to 'image'

  const {chattingUser}=useContext(AuthContext);




   // <---------------------------Final Web Socket------------------------------------>

   const [connected, setConnected] = useState(false);

   const stompClient = new Client({
       brokerURL: 'wss://grozziie.zjweiting.com:3091/CustomerService-Chat/websocket',
      //  brokerURL: 'ws://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/websocket',
   });

   useEffect(() => {
       
       const connect = () => {
           stompClient.onConnect = (frame) => {
               setConnected(true);
               console.log('Connected: ' + frame);
               stompClient.subscribe(`/topic/${chattingUser?.userId}`, (message) => {
                   const newSMS=JSON.parse(message.body);
                   showGreeting(message.body,newSMS);
           
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

   const showGreeting = (message,sms) => {
       // Handle received messages here
       console.log('Received message:', message);
       console.log(allChat,"1",sms,"2")
       setAllChat((prevChat) => [...prevChat, sms]);

   };

   // const sendMessage = async (message) => {
   //     console.log(message,"from sms")
   //     if (connected) {
   //         const response = await new Promise((resolve) => {
   //             stompClient.publish({
   //                 destination: '/app/messages',
   //                 body: JSON.stringify(message),
   //             }, {}, (response) => {
   //                 resolve(response); // Resolve the Promise with the response
   //                 console.log(response)
   //             });
   //         });

   //         console.log('Message sent. Server response:', response);
   //         // Handle the response here
   //     } else {
   //         console.error('STOMP client is not connected.');
   //         // You can show an error message to the user here.
   //     }
   // };

//for try..........
   
  //  if (stompClient.connected) {
  //      toast.success("stomp Connected")
  //  }
  //  if (!stompClient.connected) {
  //      toast.error("try to connect again")
  //      stompClient.onConnect = (frame) => {
  //          // Connection established
  //          setConnected(true);
  //          console.log('Connected: ' + frame);
  //          toast.success("connected again")
  //        };
  //  }

//...............


  //  const sendMessage = async (message) => {
  //      if (stompClient.connected) {
  //        const response = await new Promise((resolve) => {
  //          stompClient.publish({
  //            destination: '/app/messages',
  //            body: JSON.stringify(message),
  //          }, {}, (response) => {
  //            resolve(response); // Resolve the Promise with the response
  //            console.log(response);
  //          });
  //        });
     
  //        console.log('Message sent. Server response:', response);
  //        // Handle the response here
  //      } else {
  //        console.error('STOMP client is not connected.');
  //        // You can show an error message to the user here.
  //      }
  //    };
     
 

   // <---------------------------Final Web Socket------------------------------------>
    

 
   
//webSocket----------------->





  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
  };

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Add leading zeros to minutes if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  const handleRemoveFile = (fileIndex) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== fileIndex);
    setSelectedFiles(updatedFiles);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (message.trim() !== '' || selectedFiles.length > 0) {
      // Create an array to hold all messages (text, images, and videos)
      const allMessages = [];

      // If there's a text message, add it to the array
      if (message.trim() !== '') {
        const textMessage = {
          chatId: selectedCustomerChat?.chatId,
          sentBy: selectedCustomerChat?.customerServiceId,
          sentTo: selectedCustomerChat?.userId,
          sentId: 66,
          message: message,
          msgType: "text",
          timestmp: getCurrentTime(),
        };
        allMessages.push(textMessage);
        sendChatMessage(textMessage)
        // try {
        //   const response = await axios.post(
        //     'https://grozziie.zjweiting.com:3091/CustomerService-Chat/api/dev/messages',
        //     allMessages[0]
        //   );

        //   if (response?.status === 201) {
        //     sendMessage(textMessage)
        //     toast.success("Message(s) sent successfully");
        //   }

        //   // Update the chat state with all messages
        //   setAllChat([...allChat, ...allMessages]);
        // } catch (error) {
        //   // Handle errors from the API request
        //   toast.error('Error sending message(s):', error)
        //   console.error('Error sending message(s):', error);
        // }
        console.log(allMessages,"text trial")
      }

      // If there are selected files (images or videos), add them as messages
      if (selectedFiles.length > 0) {
        // Use Promise.all to read and convert selected files to base64
        Promise.all(
          selectedFiles.map(async (file) => {
            const base64Data = await readAsBase64(file);
            return {
              chatId: selectedCustomerChat?.chatId,
              sentBy: selectedCustomerChat?.customerServiceId,
              sentTo: selectedCustomerChat?.userId,
              message: fileType === 'video' ? `${base64Data}` : `${base64Data}`,
              msgType: fileType === "video" ? "video" : "image",
              timestmp: getCurrentTime(),
            };
          })
        ).then(async (filesMessages) => {
          allMessages.push(...filesMessages);


          console.log(allMessages[0], "Image trail")
          

          try {
            console.log(allMessages, "messages all post")
            const response = await axios.post(
              'https://grozziie.zjweiting.com:3091/CustomerService-Chat/api/dev/messages',
              allMessages[0]
            );

            // Handle the response as needed
            if (response?.status === 201) {

              toast.success("Message(s) sent successfully");
            }

            // Update the chat state with all messages
            setAllChat([...allChat, ...allMessages]);
          } catch (error) {
            // Handle errors from the API request
            toast.error('Error sending message(s):', error)
            console.error('Error sending message(s):', error);
          }

          // Clear the 'text' and 'selectedFiles' variables if needed
          setMessage('');
          setSelectedFiles([]);

          // Update the chat state with all messages
          // setAllChat([...allChat, ...allMessages]);
        });
      } else {
        // Clear the 'text' variable if needed
        setMessage('');

        // Update the chat state with only text messages
        setAllChat([...allChat, ...allMessages]);
      }
    }
  };

  // Function to read a file as base64
  const readAsBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result.split(',')[1]); // Remove the "data:image/jpeg;base64," part
      };
    });
  };

  const handleFileIconClick = (type) => {
    // Programmatically trigger the input file dialog when the icon is clicked
    document.getElementById('fileInput').click();
    setFileType(type);
  };

  const handleKeyDown = (e) => {
    // Check if the Enter key is pressed (key code 13)
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className=" absolute rounded-b-lg z-40 bg-white pt-1 w-full bottom-0 ">
      <div className="flex justify-around text-sm">
        <button className="bg-[#004368] text-white ml-8 hover:bg-blue-700 px-2 py-1 rounded-md mr-3">
          Auto Reply
        </button>
        <button className="">
          Select & Reply
        </button>
        <button className="mr-10">
          Typically
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex gap-2  w-full items-center px-3 my-2 bg-white z-40">
          <button
            onClick={() => handleFileIconClick('image')}
            className={` ${fileType === 'image' ? 'selected' : ''}`}
          >
            <FaFileImage className="mr-2 text-gray-400 cursor-pointer"></FaFileImage>
          </button>
          <button
            onClick={() => handleFileIconClick('video')}
            className={` ${fileType === 'video' ? 'selected' : 'image'}`}
          >
            <MdOndemandVideo className="mr-2 text-gray-400 text-xl cursor-pointer"></MdOndemandVideo>
          </button>

          <input
            id="fileInput"
            type="file"
            accept={fileType === 'image' ? 'image/*' : 'video/*'}
            onChange={handleFileChange}
            multiple
            className="hidden"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className=" relative w-9/12 md:w-8/12 lg:9/12 py-1 px-2 rounded-md bg-cyan-200"
          />
          <button className="flex items-center absolute right-[55px] lg:right-[95px] " type="submit">
            <AiOutlineSend className=" cursor-pointer"></AiOutlineSend>
          </button>
        </div>

        <div className="mt-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center bg-gray-300 p-2 w-10/12">
              <span className="mr-2">{file.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="text-red-600 font-bold cursor-pointer"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default MessageInput;

