// import React, { useState } from 'react';
// import { FaFileImage } from "react-icons/fa";
// import { AiOutlineSend } from "react-icons/ai";
// import { MdOndemandVideo } from "react-icons/md";

// const MessageInput = ({ onSendMessage }) => {
//   const [message, setMessage] = useState('');
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [fileType, setFileType] = useState('image'); // Default to 'image'

//   const handleFileChange = e => {
//     const files = e.target.files;
//     const fileArray = Array.from(files);
//     setSelectedFiles(fileArray);
//   };

//   const handleRemoveFile = fileIndex => {
//     const updatedFiles = selectedFiles.filter((_, index) => index !== fileIndex);
//     setSelectedFiles(updatedFiles);
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (message.trim() !== '' || selectedFiles.length > 0) {
//       const filesDataUrls = selectedFiles.map(file => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         return new Promise(resolve => {
//           reader.onload = event => resolve(event.target.result);
//         });
//       });

//       Promise.all(filesDataUrls).then(dataUrls => {
//         onSendMessage({ text: message, files: dataUrls });
//         setMessage('');
//         setSelectedFiles([]);
//       });
//     }
//   };

//   const handleFileIconClick = type => {
//     // Programmatically trigger the input file dialog when the icon is clicked
//     document.getElementById('fileInput').click();
//     setFileType(type);
//   };

//   return (
//     <div className=" absolute rounded-b-lg z-40 bg-white pt-1 w-full bottom-0 ">
//       <div className="flex justify-around text-sm">
//         <button className="bg-[#004368] text-white ml-8 hover:bg-blue-700 px-2 py-1 rounded-md mr-3">
//           Auto Reply
//         </button>
//         <button className="">
//           Select & Reply
//         </button>
//         <button className="mr-10">
//           Typically
//         </button>
//       </div>
//       <form onSubmit={handleSubmit} className="p-4">

//         <div className="flex gap-2  w-full items-center px-3 my-2 bg-white z-40">

//           <button
//             onClick={() => handleFileIconClick('image')}
//             className={` ${fileType === 'image' ? 'selected' : ''}`}
//           >
//             <MdOndemandVideo className="mr-2 text-gray-400 text-xl cursor-pointer"></MdOndemandVideo>
//           </button>

//           <button
//             onClick={() => handleFileIconClick('video')}
//             className={` ${fileType === 'video' ? 'selected' : ''}`}
//           >
//             <FaFileImage className="mr-2 text-gray-400 cursor-pointer"></FaFileImage>
//           </button>


//           <input
//             id="fileInput"
//             type="file"
//             accept={fileType === 'image' ? 'image/*' : 'video/*'}
//             onChange={handleFileChange}
//             multiple
//             className="hidden"
//           />

//           <input
//             value={message}
//             onChange={e => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             className=" relative w-9/12 md:w-8/12 lg:9/12 py-1 px-2 rounded-md  bg-cyan-200">
//           </input>

//           <button className="flex items-center absolute right-[55px] lg:right-[95px] " type="submit">
//             <AiOutlineSend className=" cursor-pointer">
//             </AiOutlineSend>
//           </button>
//         </div>


//         <div className="mt-2">
//           {selectedFiles.map((file, index) => (
//             <div key={index} className="flex items-center bg-gray-300 p-2 w-10/12">
//               <span className="mr-2">{file.name}</span>
//               <button
//                 type="button"
//                 onClick={() => handleRemoveFile(index)}
//                 className="text-red-600 font-bold cursor-pointer"
//               >
//                 X
//               </button>
//             </div>
//           ))}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MessageInput;


import React, { useState } from 'react';
import { FaFileImage } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { MdOndemandVideo } from "react-icons/md";

const MessageInput = ({ onSendMessage, selectedCustomer }) => {
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileType, setFileType] = useState('image'); // Default to 'image'

  const handleFileChange = e => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
  };

  const handleRemoveFile = fileIndex => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== fileIndex);
    setSelectedFiles(updatedFiles);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (message.trim() !== '' || selectedFiles.length > 0) {
      const filesDataUrls = selectedFiles.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise(resolve => {
          reader.onload = event => resolve(event.target.result);
        });
      });

      Promise.all(filesDataUrls).then(dataUrls => {
        onSendMessage(selectedCustomer, { text: message, files: dataUrls });
        setMessage('');
        setSelectedFiles([]);
      });
    }
  };

  const handleFileIconClick = type => {
    // Programmatically trigger the input file dialog when the icon is clicked
    document.getElementById('fileInput').click();
    setFileType(type);
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
            <MdOndemandVideo className="mr-2 text-gray-400 text-xl cursor-pointer"></MdOndemandVideo>
          </button>

          <button
            onClick={() => handleFileIconClick('video')}
            className={` ${fileType === 'video' ? 'selected' : ''}`}
          >
            <FaFileImage className="mr-2 text-gray-400 cursor-pointer"></FaFileImage>
          </button>


          <input
            id="fileInput"
            type="file"
            accept={fileType === 'image' ? 'image/*' : 'video/*'}
            onChange={handleFileChange}
            multiple
            className="hidden"
          />

          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type your message..."
            className=" relative w-9/12 md:w-8/12 lg:9/12 py-1 px-2 rounded-md  bg-cyan-200">
          </input>

          <button className="flex items-center absolute right-[55px] lg:right-[95px] " type="submit">
            <AiOutlineSend className=" cursor-pointer">
            </AiOutlineSend>
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
