import React, { useContext, useEffect, useState } from 'react';
import { FaFileImage } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import { MdOndemandVideo } from 'react-icons/md';
import { AiOutlineFileAdd } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/UserContext';
import { Client } from '@stomp/stompjs';
import { sendChatMessage } from './SendMessageFunction';


const MessageInput = ({
  setAllChat,
  selectedCustomerChat,
  allChat,
  newMessagesList,
  setNewMessagesList
}) => {

  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileType, setFileType] = useState(null); // Default to 'image'
  const { chattingUser } = useContext(AuthContext);
  const [response, setResponse] = useState({});
  const [newOne, setNewOne] = useState({});
  const [newAllMessage, setNewAllMessage] = useState([]);
  const [newCome, setNewCome] = useState({});
  const [newSentId,setNewSentId]=useState(getCurrentTimestampInSeconds());


  console.log(newMessagesList,"allNewMessagesList")

  const showList=()=>{
    if (newCome && newMessagesList && newMessagesList.length > 0) {
      const updatedData = newMessagesList.filter((data) => data.sentBy !== selectedCustomerChat?.userId);
      if (newCome.sentBy !== selectedCustomerChat?.userId) {
        setNewMessagesList([...updatedData, newCome]);
      } else {
        setNewMessagesList(updatedData);
      }
    } else if (newCome && newCome.sentBy !== selectedCustomerChat?.userId) {
      setNewMessagesList([newCome]);
    }
  }


  useEffect(() => {
    if(newCome.totalPart===1){
      // if (newCome && newMessagesList && newMessagesList.length > 0) {
      //   const updatedData = newMessagesList.filter((data) => data.sentBy !== selectedCustomerChat?.userId);
      //   if (newCome.sentBy !== selectedCustomerChat?.userId) {
      //     setNewMessagesList([...updatedData, newCome]);
      //   } else {
      //     setNewMessagesList(updatedData);
      //   }
      // } else if (newCome && newCome.sentBy !== selectedCustomerChat?.userId) {
      //   setNewMessagesList([newCome]);
      // }
      showList();
    }
    else if(newCome.totalPart>1 && newCome.partNo===1){
      // if (newCome && newMessagesList && newMessagesList.length > 0) {
      //   const updatedData = newMessagesList.filter((data) => data.sentBy !== selectedCustomerChat?.userId);
      //   if (newCome.sentBy !== selectedCustomerChat?.userId) {
      //     setNewMessagesList([...updatedData, newCome]);
      //   } else {
      //     setNewMessagesList(updatedData);
      //   }
      // } else if (newCome && newCome.sentBy !== selectedCustomerChat?.userId) {
      //   setNewMessagesList([newCome]);
      // }
      showList();
    }
   
  }, [newCome, selectedCustomerChat]);


 
  
  // Move setNewCome({}) outside of the useEffect
  useEffect(() => {
    setNewCome({});
  }, [selectedCustomerChat]);
  
  
  console.log(newMessagesList,"newMessageList")


  function getCurrentTimestampInSeconds() {
    const currentDate = new Date();
    const timestampInSeconds = Math.floor(currentDate.getTime() / 1000);
    return timestampInSeconds;
  }
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
          console.log(message?.body, "coming sms")
          const newSMS = JSON.parse(message.body);
          showGreeting(newSMS)
          toast.success(`Sms send from Name:${chattingUser?.userName} Id:${chattingUser?.userId}`, {
            position: "top-right"
          })
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
  }, [connected,newAllMessage]);
  
  // useEffect(() => {
  //       // if(connected){
  //         stompClient.subscribe(`/topic/${chattingUser?.userId}`, (message) => {
  //         console.log(message?.body, "coming sms")
  //         const newSMS = JSON.parse(message.body);
  //         showGreeting(newSMS)
  //         toast.success(`Sms send from Name:${chattingUser?.userName} Id:${chattingUser?.userId}`, {
  //           position: "top-right"
  //         })
  //       });
  //       // }
  // }, [connected,newAllMessage]);




  const getAnswer = (sms) => {
// if(!sms){
//   console.log(newAllMessage,"testingggggg");
 
// }

    console.log("ddddd", newAllMessage);
    // console.log(newAllMessage[0], Array.isArray(newAllMessage), newAllMessage, "new all message");


    //console.log(((newAllMessage[sms.part]).totalPart), "from  total part")// part ==newallmessage.length
    if (sms && sms.totalPart === 1) {
      //show your message/video/file/image
      //console.log((newAllMessage)[sms.part].totalPart, "totalPart-1")
    }
    else {
      if (sms && sms.partNo === sms.totalPart ) {//get partNo

        // setNewAllMessage([]);
        setSelectedFiles([]);
        //show your message/video/file/image

      }
      else {
        //sent next part

        console.log("ssss")
        console.log(sms.partNo)
        console.log(newAllMessage);
        sendChatMessage((newAllMessage)[sms.partNo]);

      }
    }
  };

  //===========================

  
  const showGreeting = async (sms) => {

    if (sms.msgType === "ans") {
      //setResponse(sms);
      console.log(newAllMessage, "newAllMessage from response");
      getAnswer(sms);
      return;

    }
// console.log(sms.sentBy,selectedCustomerChat?.userId,"same or not")
//     if(sms.sentBy!==selectedCustomerChat?.userId){
//       console.log(sms,"from another user")
//     }

    //Add New response
    const textMessage = {
      chatId: sms?.chatId,
      sentBy: sms?.sentTo,
      sentTo: sms?.sentBy,
      sentId: sms?.sentId,
      message: sms?.msgType,
      msgType: "ans",
      totalPart: sms?.totalPart,
      partNo: sms?.partNo,
      timestamp: getCurrentTime(),
    };

   

    sendChatMessage(textMessage);
    if(sms && sms.msgType !== "ans"){
     setNewCome(sms); 
    }

    console.log(sms.totalPart);
    console.log(sms.message);
    /*
   in here start angeln code 
   

    
   in here end angeln code 
    */




    //==============================================

    setAllChat((prevChat) => [...prevChat, sms]);

  };

  const handleFileChange = async (e) => {
    console.log(e.target.files);
    const files = e.target.files;
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
    //  setNewSentId(getCurrentTimestampInSeconds());

    // new 
    const base64Data = await readAsBase64(fileArray[0]);
    const stringParts = splitBase64String(base64Data, 45000);
   
    
    

    const newMessages = stringParts.map((part, index) => {
     
      if (fileType === 'video' || fileType === 'image') {
        return {
          chatId: selectedCustomerChat?.chatId,
          sentBy: selectedCustomerChat?.customerServiceId,
          sentTo: selectedCustomerChat?.userId,
          sentId: newSentId,
          message: fileType === 'video' ? part : part,
          msgType: fileType === 'video' ? 'video' : 'image',
          totalPart: stringParts.length,
          partNo: index + 1,
          timestamp: getCurrentTime(),
        };
      } else {
        return {
          chatId: selectedCustomerChat?.chatId,
          sentBy: selectedCustomerChat?.customerServiceId,
          sentTo: selectedCustomerChat?.userId,
          sentId: newSentId,
          message: fileType === 'file' ? part : part,
          msgType: fileType === 'file' ? 'file' : 'text',
          fileName:(fileArray[0]?.name),
          totalPart: stringParts.length,
          partNo: index + 1,
          timestamp: getCurrentTime(),
        };
      }
    });

    setNewAllMessage(newMessages);

    // Update newAllMessage with the latest messages

  };

  console.log(newAllMessage, 'outside')

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

  function splitBase64String(base64Data, maxSizeInBytes) {
    const base64Parts = [];
    let currentPart = '';


    for (let i = 0; i < base64Data.length; i++) {
      currentPart += base64Data.charAt(i);

      if (currentPart.length * 0.75 >= maxSizeInBytes) {
        // If the current part exceeds the specified size, push it to the array
        base64Parts.push(currentPart);
        currentPart = '';
      }
    }

    if (currentPart.length > 0) {
      // Push any remaining data as a part
      base64Parts.push(currentPart);
    }

    return base64Parts;
  }


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


  // function to send the sms part by part

  const handleSubmit = async (e) => {
          setNewSentId(getCurrentTimestampInSeconds());
    e.preventDefault();
   

    if (message.trim() !== '' || selectedFiles.length > 0) {
      const allMessages = [];


      if (message.trim() !== '') {
        const textMessage = {
          chatId: selectedCustomerChat?.chatId,
          sentBy: selectedCustomerChat?.customerServiceId,
          sentTo: selectedCustomerChat?.userId,
          sentId:newSentId,
          message: message,
          msgType: "text",
          totalPart: 1,
          partNo: 1,
          timestamp: getCurrentTime(),
        };
        allMessages.push(textMessage);

        setAllChat([...allChat, ...allMessages]);
        setResponse({});
        sendChatMessage(textMessage);

      }


      if (selectedFiles.length > 0) {
        const file = selectedFiles[0]; // Use the first selected file
        const base64Data = await readAsBase64(file);
        const stringParts = splitBase64String(base64Data, 45000);
        // const fileType = /* determine fileType */;
      

        if (fileType === 'video' || fileType === 'image'){
          setAllChat((prevChat) => [...prevChat, {
            chatId: selectedCustomerChat?.chatId,
            sentBy: selectedCustomerChat?.customerServiceId,
            sentTo: selectedCustomerChat?.userId,
            sentId: newSentId,
            initialShow:true,
            message: fileType === 'video' ? base64Data : base64Data,
            msgType: fileType === 'video' ? 'video' : 'image',
            totalPart: stringParts.length,
            partNo: stringParts.length,
            timestamp: getCurrentTime(),
          }]);
        }
        else{
          setAllChat((prevChat) => [...prevChat, {
            chatId: selectedCustomerChat?.chatId,
            sentBy: selectedCustomerChat?.customerServiceId,
            sentTo: selectedCustomerChat?.userId,
            sentId: newSentId,
            initialShow:true,
            message: fileType === 'file' ? base64Data : base64Data,
            msgType: fileType === 'file' ? 'file' : 'text',
            fileName:(file?.name),
            totalPart: stringParts.length,
            partNo: stringParts.length,
            timestamp: getCurrentTime(),
          }]);
        }

        const newMessages = stringParts.map((part, index) => {
          if (fileType === 'video' || fileType === 'image') {
            return {
              chatId: selectedCustomerChat?.chatId,
              sentBy: selectedCustomerChat?.customerServiceId,
              sentTo: selectedCustomerChat?.userId,
              sentId: newSentId,
              message: fileType === 'video' ? part : part,
              msgType: fileType === 'video' ? 'video' : 'image',
              totalPart: stringParts.length,
              partNo: index + 1,
              timestamp: getCurrentTime(),
            };
          } else {
            return {
              chatId: selectedCustomerChat?.chatId,
              sentBy: selectedCustomerChat?.customerServiceId,
              sentTo: selectedCustomerChat?.userId,
              sentId: newSentId,
              message: fileType === 'file' ? part : part,
              msgType: fileType === 'file' ? 'file' : 'text',
              fileName:(file?.name),
              totalPart: stringParts.length,
              partNo: index + 1,
              timestamp: getCurrentTime(),
            };
          }
        });

        
        console.log(newMessages, "newmesseges")

      
        // Send the first message in the newMessages array
        sendChatMessage(newMessages[0]);
      }


      else {
        // Clear the 'text' variable if needed
        setMessage('');

        // Update the chat state with only text messages
        setAllChat([...allChat, ...allMessages]);
      }
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
            className="hidden"
          />

          <div>
            <button
              onClick={() => handleFileIconClick('file')}
              className={` ${fileType === 'file'}`}
            >
              <AiOutlineFileAdd className="mr-2 text-gray-400 text-xl cursor-pointer"></AiOutlineFileAdd>
            </button>

            <input
              id="fileInput"
              type="file"
              accept=".pdf, .doc, .docx, .txt, .xls, .xlsx, .ppt, .pptx, .csv, .zip, .rar"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>



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

