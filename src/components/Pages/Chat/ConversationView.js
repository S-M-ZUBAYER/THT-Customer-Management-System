import React from 'react';

const ConversationView = ({ messages, selectedCustomer }) => {

  return (
    <div className="flex-1 p-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">Conversation</h2>
      <div className="border rounded p-2">
        {messages.map(userMessage => (
          <div key={userMessage.id} className="mb-2">
            <span className="font-bold">{userMessage?.message[0]?.sender}</span>: {userMessage?.message[0]?.text}
            {userMessage?.message[0]?.links && userMessage?.message[0]?.links.map((link, index) => (
              <div key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Link {index + 1}
                </a>
              </div>
            ))}
            {userMessage?.message[0]?.files && userMessage?.message[0]?.files.map((file, index) => (
              <div key={index}>
                {file.startsWith('data:image') ? (
                  <img src={file} alt={`Image ${index}`} className="mt-2 w-54 h-44" />
                ) : (
                  <video src={file} controls className="mt-2 w-54 h-44" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationView;