import { useState } from "react";

function AddIcon() {
  const [image, setImage] = useState(null);

  function handleImageChange(event) {
    const file = event.target.files[0];
    setImage(file);
  }

  function handleUpload(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    // TODO: Send formData to server-side script for processing
    console.log(formData);
  }

  return (
    <div className="my-32 flex items-center justify-center">
       <form className="flex flex-col items-center justify-center">
      <label className="mb-4">
        <span className="px-4 py-2 bg-gray-200 rounded-md  hover:bg-gray-300 cursor-pointer">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M150 240C150 250.5 151.95 260.55 155.25 270H30C22.0435 270 14.4129 266.839 8.78679 261.213C3.1607 255.587 0 247.956 0 240V30C0 13.5 13.5 0 30 0H240C247.956 0 255.587 3.1607 261.213 8.78679C266.839 14.4129 270 22.0435 270 30V155.25C260.55 151.95 250.5 150 240 150V30H30V240H150ZM164.4 139.35L123.15 192.45L93.75 157.05L52.5 210H155.25C161.25 193.2 172.05 178.65 186 168.15L164.4 139.35ZM255 225V180H225V225H180V255H225V300H255V255H300V225H255Z" fill="black"/>
</svg>

        </span>
        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
      </label>
      <button
        className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 my-10 px-20 rounded-lg"
        onClick={handleUpload}
        disabled={!image}
      >
        Add
      </button>
    </form> 
    </div>
    
  );
}

export default AddIcon;