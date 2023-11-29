import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import Tesseract from 'tesseract.js';
import { FcAddImage } from 'react-icons/fc';
import TryImageDetect from './TryImageDetect';

Modal.setAppElement('#root');

const ImageTextDetector = ({ setText, text, textId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('eng');
  


  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const handleImageChange = (e) => {
    if (e) {
      setImage(URL.createObjectURL(e));
      openModal();
    }
  };
  

  const handleTextDetection = async () => {
    if (image) {
      try {
        const { data: { text } } = await Tesseract.recognize(image, "chi_sim");
        setText(text);
       console.log(text)
        
      } catch (error) {
        console.error('Error detecting text:', error);
      }

      closeModal();
    }
  };

  return (
    <div>
      <div
        onDrop={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Your text content */}
      </div>

      <TryImageDetect handleImageChange={handleImageChange} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="w-8/12 flex justify-end items-center mt-60"
      >

        <div className=" w-6/12">

          <div className="border-4">
            <img src={image} alt="Selected" style={{ maxWidth: '100%' }} />
          </div>
          <div className="mt-3">
            <select
              id="languageSelect"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="eng">English</option>
              <option value="chi_sim">Chinese Simplified</option>
              <option value="ind">Indonesian</option>
              <option value="vie">Vietnamese</option>
              <option value="tgl">Tagalog</option>
              <option value="thai">Thai</option>
              {/* Add more language options as needed */}
            </select>
          </div>

        </div>
        <div className="ml-8">
          <button className="bg-green-300 text-black px-3 py-1 rounded-tl-lg rounded-br-lg" onClick={handleTextDetection}>Detect Text</button>
        </div>
      </Modal>

      {/* <TryImageDetect handleImageChange={handleImageChange}></TryImageDetect> */}
    </div>
  );
};

export default ImageTextDetector;
