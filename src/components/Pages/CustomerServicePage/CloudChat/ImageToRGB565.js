
import React, { useRef, useState } from 'react';

const ImageToRGB565 = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const canvasRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const convertToRGB565 = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const { data } = imageData;
            const rgb565Array = [];

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i] >> 3;
                const g = data[i + 1] >> 2;
                const b = data[i + 2] >> 3;
                const rgb565 = (r << 11) | (g << 5) | b;

                // Convert to two-byte format
                const highByte = (rgb565 >> 8) & 0xff;
                const lowByte = rgb565 & 0xff;

                // Format as hexadecimal
                rgb565Array.push(`0x${highByte.toString(16).toUpperCase().padStart(2, '0')}`);
                rgb565Array.push(`0x${lowByte.toString(16).toUpperCase().padStart(2, '0')}`);
            }

            // Calculate dimensions and data length in bytes
            const width = img.width;
            const height = img.height;
            const lengthInBytes = rgb565Array.length;

            // Create a JavaScript file containing the RGB565 data and image dimensions
            const fileContent = `
        const width = ${width};
        const height = ${height};
        const lengthInBytes = ${lengthInBytes};
        const rgb565Data = [${rgb565Array.join(', ')}];
        export { width, height, lengthInBytes, rgb565Data };
      `;
            const blob = new Blob([fileContent], { type: 'text/javascript' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'image.rgb565.js';
            link.click();
            URL.revokeObjectURL(url);
        };

        img.src = imageSrc;
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={convertToRGB565}>Convert to RGB565</button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default ImageToRGB565;

