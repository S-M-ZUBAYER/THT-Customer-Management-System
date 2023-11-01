import React, { useContext, useEffect, useState } from 'react';
import UserContext, { AuthContext } from '../../../context/UserContext';
import { ImFilePdf } from 'react-icons/im';
import { AiFillFileZip } from 'react-icons/ai';
import { FiFileText } from 'react-icons/fi';
import { FaFileCsv } from 'react-icons/fa';
import { BsFiletypeDocx } from 'react-icons/bs';
import { BsFiletypeXlsx } from 'react-icons/bs';
import axios from 'axios';
import { HiChevronDoubleUp } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import BtnSpinner from '../Translator/BtnSpinner';
import Spinner from '../../Shared/Loading/Spinner';
import DisplaySpinner from '../../Shared/Loading/DisplaySpinner';
import ShowChatHistory from './ShowChatHistory';
import ImageModal from './ImageModal';

const Message = ({ allChat, setAllChat, selectedCustomerChat, showHistory, SetShowHistory, Loading }) => {
  const [userIdAllChat, SetUserIdAllChat] = useState([]);
  const { user, chattingUser } = useContext(AuthContext);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [newOne, setNewOne] = useState({});
  const [newAllChat, setNewAllChat] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (imgSrc) => {
    setSelectedImage(imgSrc);
    setModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  }


  useEffect(() => {
    if (!allChat) return;

    const mergedMessages = [];
    let currentMerging = null;

    for (let i = 0; i < allChat.length; i++) {
      const sms = allChat[i];

      if (sms?.initialShow === true) {
        mergedMessages.push(sms);
      } else if (sms.totalPart > 1) {
        if (sms.partNo === 1) {
          currentMerging = { ...sms, message: sms.message };
        } else if (sms.partNo === sms.totalPart && currentMerging && sms.sentId === currentMerging.sentId) {
          currentMerging.message += sms.message;
          currentMerging.totalPart = sms.totalPart;
          if (sms.partNo === sms.totalPart) {
            // If it's the last part, push the merged message
            mergedMessages.push(currentMerging);
            currentMerging = null;
          }
        } else if (sms.partNo > 1 && sms.partNo < sms.totalPart && currentMerging && sms.sentId === currentMerging.sentId) {
          currentMerging.message += sms.message;
          currentMerging.totalPart = sms.totalPart;
        }
      } else {
        mergedMessages.push(sms);
      }
    }

    setNewAllChat(mergedMessages);
  }, [allChat]);




  const handleToShowHistory = () => {
    SetShowHistory(!showHistory);
  };

  useEffect(() => {
    if (showHistory) {
      const fetchUserByUserId = async () => {
        setHistoryLoading(true);
        try {
          const response = await axios.get(`https://grozziie.zjweiting.com:3091/CustomerService-Chat/api/dev/messages/userMessages/${selectedCustomerChat?.userId}`);
          if (response.status === 200) {
            SetUserIdAllChat(response.data?.filter(data => data?.chatId !== selectedCustomerChat?.chatId));
            const allHistory = response.data?.filter(data => data?.chatId !== selectedCustomerChat?.chatId)
            setHistoryLoading(false);
            toast.success("Click to show the chat history");
          } else {
            console.error('Unexpected status code:', response.status);
            setHistoryLoading(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setHistoryLoading(false);
        }
      };

      fetchUserByUserId();
    }
  }, [selectedCustomerChat?.userId, showHistory]);







  return (
    <div className="mb-20">
      {showHistory ? (historyLoading ? <BtnSpinner /> : userIdAllChat && userIdAllChat?.length > 0 ? (
        <ShowChatHistory userIdAllChat={userIdAllChat} customerUserId={selectedCustomerChat?.userId} SetUserIdAllChat={SetUserIdAllChat} />
      ) : (
        <div className="text-lg text-center font-semibold text-orange-400">No SMS available</div>
      )) : (
        ''
      )}
      {selectedCustomerChat && (
        <div onClick={handleToShowHistory} className="flex justify-center cursor-pointer">
          <HiChevronDoubleUp className="text-green-400 font-bold text-3xl" />
        </div>
      )}

      {Loading ? <DisplaySpinner /> : newAllChat && newAllChat.map((chat, index) => (
        <div key={index}>
          <div className="my-2 flex gap-0 w-full">
            {String(chat?.sentBy).trim() === String(selectedCustomerChat?.userId).trim() &&
              String(chat?.sentTo).trim() === String(selectedCustomerChat?.customerServiceId).trim() && (
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
                      <div>
                        <img
                          className="w-48 h-auto"
                          src={`data:image/png;base64,${chat?.message}`}
                          alt={`Image ${index}`}
                        />
                        <div className="flex justify-end pt-3"><small className=" text-right text-xs">{chat?.timestamp}</small> </div>

                      </div>


                    ) : chat?.msgType === "video" ? (
                      <div>
                        <video
                          className="max-w-full h-auto"
                          controls
                          src={`data:video/mp4;base64,${chat?.message}`}
                        />
                        <div className="flex justify-end pt-3"><small className=" text-right text-xs">{chat?.timestamp}</small> </div>
                      </div>

                    ) : chat?.msgType === "file" ?

                      <div className="max-w-10/12 pt-3">
                        {(() => {
                          // Function to determine file type based on the message
                          const getFileType = (message) => {
                            if (message?.endsWith('.pdf')) {
                              return 'pdf';
                            } else if (message?.endsWith('.xlsx')) {
                              return 'xls';
                            } else if (message?.endsWith('.xls')) {
                              return 'xlsx';
                            } else if (message?.endsWith('.txt')) {
                              return 'txt';
                            } else if (message?.endsWith('.doc')) {
                              return 'docx';
                            } else if (message?.endsWith('.docx')) {
                              return 'docx';
                            } else if (message?.endsWith('.csv')) {
                              return 'csv';
                            } else if (message?.endsWith('.zip')) {
                              return 'zip';
                            } else if (message?.endsWith('.rar')) {
                              return 'rar';
                            } else {
                              return 'unknown'; // You can handle other formats as needed
                            }
                          };

                          // Determine the file type
                          const fileType = getFileType(chat?.fileName);

                          // Render the file based on its type
                          const getFileViewer = (fileType, message) => {
                            switch (fileType) {
                              case 'pdf':
                                return (
                                  // Use a PDF viewer library or iframe to display the PDF
                                  <a
                                    href={`data:application/zip;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                    
                                    <ImFilePdf className="text-red-500 font-bold text-7xl"></ImFilePdf>
                                  </a>
                                );
                              case 'xlsx':
                                return (
                                  // Use an Excel viewer library or iframe to display the Excel file
                                  // Be sure to choose a library that can handle XLSX files
                                  <a
                                    href={`data:application/zip;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                  
                                    <BsFiletypeXlsx className="text-green-700 font-bold text-7xl"></BsFiletypeXlsx>
                                  </a>
                                );
                              case 'docx':
                                return (
                                 
                                  <a
                                    href={`data:application/zip;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                   
                                    <BsFiletypeDocx className="text-blue-700 font-bold text-7xl"></BsFiletypeDocx>
                                  </a>
                                );
                              case 'csv':
                                return (
                                  // Render CSV content or use a CSV viewer if available
                                  <a
                                    href={`data:application/zip;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                    <FaFileCsv className="text-green-700 font-bold text-7xl"></FaFileCsv>
                                  </a>
                                );
                              case 'txt':
                                return (
                                  // Render CSV content or use a CSV viewer if available
                                  <a
                                    href={`data:application/txt;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                    <FiFileText className="text-black font-bold text-7xl"></FiFileText>
                                  </a>
                                );
                              case 'zip':
                                return (
                                  // Render a link to download the ZIP file
                                  <a
                                    href={`data:application/zip;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                    <AiFillFileZip className="text-yellow-700 font-bold text-7xl"></AiFillFileZip>
                                  </a>
                                );
                              case 'rar':
                                return (
                                  // Render a link to download the rar file
                                  <a
                                    href={`data:application/rar;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                    <AiFillFileZip className="text-yellow-700 font-bold text-7xl"></AiFillFileZip>
                                  </a>
                                );
                              default:
                                // Handle unknown or unsupported formats
                                return <p>Unsupported File Format</p>;
                            }
                          };

                          // Usage in your component
                          const fileViewer = getFileViewer(fileType, chat?.message);
                          return <div>{fileViewer}</div>;

                        })()}
                        <div className="flex justify-end pt-3"><small className=" text-right text-xs">{chat?.timestamp}</small> </div>
                      </div>
                      : (
                        <div className="bg-fuchsia-200 px-2 py-1  rounded-b-lg rounded-tr-lg text-black">
                          <p className="px-2 py-1 font-normal text-black">{chat?.message}</p>
                          <div className="flex justify-end"><small className=" text-right text-slate-500">{chat?.timestamp}</small> </div>

                        </div>
                      )}
                  </div>

                </>
              )}
          </div>
          <div className="my-2 flex justify-end w-full">
            {String(chat?.sentBy).trim() === String(selectedCustomerChat?.customerServiceId).trim() &&
              String(chat?.sentTo).trim() === String(selectedCustomerChat?.userId).trim() && (
                <>
                  <div className="max-w-10/12 pt-3">
                    {chat?.msgType === "image" ? (
                      <div>
                        <img
                          className=" w-48 h-auto"
                          src={`data:image/png;base64,${chat?.message}`}
                          alt={`Image ${index}`}
                          onClick={() => openImageModal(`data:image/png;base64,${chat?.message}`)}
                        />
                        <div className="flex justify-start mt-2">
                            <small className="text-end  text-slate-500 text-xs mr-4">{chat?.timestamp}</small>
                            {
                              chat?.smsLoading &&
                              <Spinner></Spinner>
                            }
                          </div>

                      </div>

                    ) : chat?.msgType === "video" ? (
                      <div>
                        <video
                          className="max-w-full h-auto"
                          controls
                          src={`data:video/mp4;base64,${chat?.message}`}
                        />
                       <div className="flex justify-start mt-2">
                            <small className="text-end  text-slate-500 text-xs mr-4">{chat?.timestamp}</small>
                            {
                              chat?.smsLoading &&
                              <Spinner></Spinner>
                            }
                          </div>

                      </div>

                    ) : chat?.msgType === "file" ?

                      <div className="max-w-10/12 pt-3">
                        {(() => {
                          // Function to determine file type based on the message
                          const getFileType = (message) => {
                            if (message.endsWith('.pdf')) {
                              return 'pdf';
                            } else if (message.endsWith('.xlsx')) {
                              return 'xls';
                            } else if (message.endsWith('.xls')) {
                              return 'xls';
                            } else if (message.endsWith('.txt')) {
                              return 'txt';
                            } else if (message.endsWith('.doc')) {
                              return 'docx';
                            } else if (message.endsWith('.docx')) {
                              return 'docx';
                            } else if (message.endsWith('.csv')) {
                              return 'csv';
                            } else if (message.endsWith('.zip')) {
                              return 'zip';
                            } else if (message.endsWith('.rar')) {
                              return 'rar';
                            } else {
                              return 'unknown'; // You can handle other formats as needed
                            }
                          };

                          // Determine the file type
                          const fileType = getFileType(chat?.fileName);

                          // Render the file based on its type
                          const getFileViewer = (fileType, message) => {
                            switch (fileType) {
                              case 'pdf':
                                return (
                                  // Use a PDF viewer library or iframe to display the PDF
                                  <a
                                    href={`data:application/zip;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                    
                                    <ImFilePdf className="text-red-500 font-bold text-7xl"></ImFilePdf>
                                  </a>
                                );
                              case 'xls':
                                return (
                                  // Use an Excel viewer library or iframe to display the Excel file
                                  // Be sure to choose a library that can handle XLSX files
                                  <a
                                    href={`data:application/zip;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                    
                                    <BsFiletypeXlsx className="text-green-700 font-bold text-7xl"></BsFiletypeXlsx>
                                  </a>
                                );
                              case 'docx':
                                return (
                                  // Use a document viewer library or iframe to display the document
                                  // You'll need a library that can handle DOCX files
                                  <a
                                    href={`data:application/zip;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                   
                                    <BsFiletypeDocx className="text-blue-700 font-bold text-7xl"></BsFiletypeDocx>
                                  </a>
                                );
                              case 'csv':
                                return (
                                  // Render CSV content or use a CSV viewer if available
                                  <a
                                    href={`data:application/zip;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                    <FaFileCsv className="text-green-700 font-bold text-7xl"></FaFileCsv>
                                  </a>
                                );
                              case 'txt':
                                return (
                                  // Render CSV content or use a CSV viewer if available
                                  <a
                                    href={`data:application/txt;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                    <FiFileText className="text-black font-bold text-7xl"></FiFileText>
                                  </a>
                                );
                              case 'zip':
                                return (
                                  // Render a link to download the ZIP file
                                  <a
                                    href={`data:application/zip;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                    <AiFillFileZip className="text-yellow-700 font-bold text-7xl"></AiFillFileZip>
                                  </a>
                                );
                              case 'rar':
                                return (
                                  // Render a link to download the rar file
                                  <a
                                    href={`data:application/rar;base64,${message}`}
                                    download={`${chat?.fileName}`}
                                  >
                                    <AiFillFileZip className="text-yellow-700 font-bold text-7xl"></AiFillFileZip>
                                  </a>
                                );
                              default:
                                // Handle unknown or unsupported formats
                                return <p>Unsupported File Format</p>;
                            }
                          };

                          // Usage in your component
                          const fileViewer = getFileViewer(fileType, chat?.message);
                          return <div>{fileViewer}</div>;

                        })()}
                        <div className="flex justify-start mt-2">
                            <small className="text-end  text-slate-500 text-xs mr-4">{chat?.timestamp}</small>
                            {
                              chat?.smsLoading &&
                              <Spinner></Spinner>
                            }
                          </div>
                      </div>


                      : (
                       
                        <div className="bg-fuchsia-200 px-2 py-1 rounded-b-lg rounded-tl-lg text-black">
                          <p className="px-2 py-1 font-normal text-black">{chat?.message}</p>
                          <div className="flex justify-start">
                            <small className="text-end  text-slate-500 text-xs mr-4">{chat?.timestamp}</small>
                            {
                              chat?.smsLoading &&
                              <Spinner></Spinner>
                            }
                          </div>



                        </div>
                      )}
                  </div>

                  <div className="w-6">
                    <img
                      className="w-6 h-6 rounded-full"
                      src={user?.image ? user?.image : "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"}
                      alt="User Avatar"
                    />
                  </div>
                  {isModalOpen && (
                    <ImageModal
                      imgSrc={selectedImage}
                      alt="Guitar"
                      onClose={closeImageModal} // Close the modal when the "Close" button is clicked
                    />
                  )}
                </>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
