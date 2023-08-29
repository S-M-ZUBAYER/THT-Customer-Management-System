import React, { useState } from 'react';
import ImageCompressor from 'image-compressor.js';

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const compressedImage = await compressImage(file);
            setSelectedImage(compressedImage);
        }
    };

    const compressImage = async (file) => {
        try {
            const options = {
                quality: 0.9, // Set compression quality (0.1 - 1)
            };

            const compressedBlob = await new ImageCompressor(file, options);
            return URL.createObjectURL(compressedBlob);
        } catch (error) {
            console.error('Error compressing image:', error);
            return null;
        }
    };

    const handleDownload = () => {
        if (selectedImage) {
            const link = document.createElement('a');
            link.href = selectedImage;
            link.download = 'compressed_image.jpg';
            link.click();
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && (
                <div>
                    <img src={selectedImage} alt="Compressed" />
                    <button onClick={handleDownload}>Download Compressed Image</button>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
