import React, { useState } from 'react';

const ImageModal = ({ imgSrc, alt, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className=" relative max-w-4/5 w-4/5 flex items-center justify-center p-4 bg-white rounded-lg shadow-lg">
        <img src={imgSrc} alt={alt} className="w-10/12 h-auto" />
        
      </div>
  
        <button onClick={onClose} className=" absolute bottom-32 right-10 mt-2 p-2 bg-red-400 text-white rounded-lg">
          Close
        </button>
  
      
    </div>
  );
};

export default ImageModal;
