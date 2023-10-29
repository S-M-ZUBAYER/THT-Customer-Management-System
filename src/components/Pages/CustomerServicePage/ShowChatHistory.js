import React, { useContext } from 'react';
import { AuthContext } from '../../../context/UserContext';

const ShowChatHistory = ({ userIdAllChat, customerUserId }) => {
    console.log(userIdAllChat, "from show chat")
    const { user } = useContext(AuthContext);
    return (
        <div>

            {userIdAllChat && userIdAllChat?.length > 0 && userIdAllChat.map((chat, index) => {
                return <div key={index}>

                    <div className="my-2 flex gap-0 w-full">

                        {String(chat?.sentBy).trim() === String(customerUserId).trim() && (
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
                    
                        {String(chat?.sentBy).trim() !== String(customerUserId).trim() && (
                            
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
                                        src={user?.image ? user?.image : "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"}
                                        alt="User Avatar"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            }


            )}
        </div>
    );
};

export default ShowChatHistory;