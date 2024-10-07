import React, { useState } from 'react';

function HexRgb() {
  const [imageData, setImageData] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lengthInBytes, setLengthInBytes] = useState(0);
  const [formattedData, setFormattedData] = useState('');

  console.log(imageData);


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      parseTextFile(text);
    };

    reader.readAsText(file);
  };

  const parseTextFile = (text) => {
    // Split the text by whitespace to get the values
    const parts = text.trim().split(/\s+/);

    // Extract the metadata
    const lengthInBytes = parseInt(parts[0], 10);
    const width = parseInt(parts[1], 10);
    const height = parseInt(parts[2], 10);
    const name = parts[3]; // name is extracted but not used
    const id = parseInt(parts[4], 10);

    // Combine the remaining parts into a single hex string
    const hexData = parts.slice(5).join('');

    // Convert hex string to RGB565 format (two hex digits per byte)
    const rgb565Data = [];
    for (let i = 0; i < hexData.length; i += 4) {
      const hexPair = hexData.slice(i, i + 4);
      const highByte = parseInt(hexPair.slice(0, 2), 16);
      const lowByte = parseInt(hexPair.slice(2, 4), 16);
      rgb565Data.push(`0x${highByte.toString(16).padStart(2, '0').toUpperCase()}`);
      rgb565Data.push(`0x${lowByte.toString(16).padStart(2, '0').toUpperCase()}`);
    }

    // Prepare formatted output for the JavaScript code
    const formattedData = `const width = ${width};
const height = ${height};
const lengthInBytes = ${lengthInBytes};
const rgb565Data = [${rgb565Data.join(', ')}];`;

    setLengthInBytes(lengthInBytes);
    setWidth(width);
    setHeight(height);
    setImageData(rgb565Data);
    setFormattedData(formattedData);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {formattedData && (
        <div>
          <h3>Formatted Data:</h3>
          <pre>{formattedData}</pre>
          <RGB565ImageDisplay width={width} height={height} imageData={imageData} />
        </div>
      )}
    </div>
  );
}

function RGB565ImageDisplay({ width, height, imageData }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageDataCtx = ctx.createImageData(width, height);

    for (let i = 0, j = 0; i < imageData.length; i += 2) {
      const color = (parseInt(imageData[i], 16) << 8) | parseInt(imageData[i + 1], 16);
      const r = (color & 0xf800) >> 8;
      const g = (color & 0x07e0) >> 3;
      const b = (color & 0x001f) << 3;

      imageDataCtx.data[j++] = r;
      imageDataCtx.data[j++] = g;
      imageDataCtx.data[j++] = b;
      imageDataCtx.data[j++] = 255; // alpha
    }

    ctx.putImageData(imageDataCtx, 0, 0);
  }, [width, height, imageData]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
}

export default HexRgb;
