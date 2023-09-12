import React from 'react';

const Message = ({ chatSms, selectedCustomerChat }) => {
  console.log(selectedCustomerChat);

  return (
    <div className="mb-10">
      {selectedCustomerChat &&
        selectedCustomerChat.sms.map((chat, index) => {
          return (
            <div key={index}>
              <div className="my-2 flex gap-0 w-full">
                {chat?.user === "you" && (
                  <>
                    <div className="w-6">
                      <img
                        className="w-6 h-6 rounded-full"
                        src="https://cdn.pixabay.com/photo/2016/06/03/15/35/customer-service-1433639__340.png"
                        alt="User Avatar"
                      />
                    </div>
                    <div className="max-w-10/12 pt-3">
                      {chat?.msg.startsWith('data:image') ? (
                        <img
                          className="max-w-full h-auto"
                          src={chat?.msg}
                          alt={`Image ${index}`}
                        />
                      ) : chat?.msg.startsWith('data:video') ? (
                        <video
                          className="max-w-full h-auto"
                          controls
                          src={chat?.msg}
                        />
                      ) : (
                        <p className="bg-fuchsia-200 px-2 py-1 rounded-tl-none rounded-br-none rounded-md text-black">
                          {chat?.msg}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="my-2 flex justify-end w-full">
                {chat?.user === "I" && (
                  <>
                    <div className="max-w-10/12 pt-3">
                      {chat?.msg.startsWith('data:image') ? (
                        <img
                          className=" w-96 rounded-lg h-auto"
                          src={chat?.msg}
                          alt={`Image ${index}`}
                        />
                      ) : chat?.msg.startsWith('data:video') ? (
                        <video
                          className="w-96 rounded-lg h-auto"
                          controls
                          src={chat?.msg}
                        />
                      ) : (
                        <p className="bg-fuchsia-200 px-2 py-1 rounded-tl-none rounded-br-none rounded-md text-black">
                          {chat?.msg}
                        </p>
                      )}
                    </div>
                    <div className="w-6">
                      <img
                        className="w-6 h-6 rounded-full"
                        src="https://media.istockphoto.com/id/1244527145/photo/happy-smiling-woman-working-in-call-center.jpg?s=612x612&w=0&k=20&c=3q7ImqhEDOdYptyaZLYmjqtJgMBoY42lGDkzUi0NGBo="
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
